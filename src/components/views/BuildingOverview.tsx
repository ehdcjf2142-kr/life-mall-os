import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FLOOR_SECTIONS, type FloorId } from '../../data/mallData'

const FLOOR_ORDER: FloorId[] = ['4F', '3F', '2F', '1F', 'B1']

const FLOOR_VISUAL: Record<
  FloorId,
  { y: number; height: number; label: string; accent: string }
> = {
  '4F': { y: 48, height: 72, label: 'VIP 비전 라운지', accent: '#e8e8e8' },
  '3F': { y: 132, height: 72, label: '북카페 & 감성 문화관', accent: '#d4d4d4' },
  '2F': { y: 216, height: 72, label: '프리미엄 금융관', accent: '#c0c0c0' },
  '1F': { y: 300, height: 80, label: '메인 아트리움', accent: '#f5f5f5' },
  B1: { y: 392, height: 64, label: '기계실 & 창고', accent: '#9a9a9a' },
}

export function BuildingOverview() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<FloorId | null>(null)

  return (
    <div className="view view--building">
      <header className="view-header view-header--center">
        <p className="eyebrow">Life Mall OS</p>
        <h1>인생 쇼핑몰 조감도</h1>
        <p className="lede">
          층을 선택해 내부 도면으로 들어가세요. 모든 기록은 하나의 데이터에서
          태그로만 나뉩니다.
        </p>
      </header>

      <div className="building-stage">
        <svg
          className="building-svg"
          viewBox="0 0 520 520"
          role="img"
          aria-label="Life Mall 백화점 조감도"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f1f1f" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="520" height="520" fill="url(#sky)" />
          <ellipse cx="260" cy="470" rx="200" ry="28" fill="#000" opacity="0.45" />

          {/* Plaza */}
          <rect x="80" y="468" width="360" height="8" fill="#2a2a2a" rx="2" />
          <text x="260" y="458" textAnchor="middle" fill="#666" fontSize="11">
            GRAND PLAZA
          </text>

          {/* Tower body */}
          <rect x="130" y="40" width="260" height="430" fill="#141414" rx="6" />
          <rect x="138" y="48" width="244" height="414" fill="#0d0d0d" rx="4" />

          {FLOOR_ORDER.map((floorId) => {
            const floor = FLOOR_SECTIONS.find((item) => item.id === floorId)!
            const visual = FLOOR_VISUAL[floorId]
            const active = hovered === floorId

            return (
              <g
                key={floorId}
                className={`floor-slice ${active ? 'floor-slice--active' : ''}`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(floorId)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/floor/${floorId}`)}
                filter={active ? 'url(#glow)' : undefined}
              >
                <rect
                  x="148"
                  y={visual.y}
                  width="224"
                  height={visual.height}
                  fill={active ? visual.accent : '#1a1a1a'}
                  stroke={active ? '#ffffff' : '#333'}
                  strokeWidth={active ? 2 : 1}
                  rx="3"
                  opacity={active ? 1 : 0.92}
                />
                <text
                  x="158"
                  y={visual.y + 22}
                  fill={active ? '#111' : '#e0e0e0'}
                  fontSize="13"
                  fontWeight="700"
                >
                  {floorId}
                </text>
                <text
                  x="158"
                  y={visual.y + 40}
                  fill={active ? '#333' : '#888'}
                  fontSize="10"
                >
                  {visual.label}
                </text>
                <text
                  x="360"
                  y={visual.y + visual.height / 2 + 4}
                  textAnchor="end"
                  fill={active ? '#222' : '#555'}
                  fontSize="9"
                >
                  {floor.categories.length} shops →
                </text>
              </g>
            )
          })}

          {/* Roof line */}
          <path
            d="M130 40 L260 18 L390 40"
            fill="none"
            stroke="#555"
            strokeWidth="1.5"
          />
          <text x="260" y="14" textAnchor="middle" fill="#777" fontSize="10">
            LIFE MALL
          </text>
        </svg>

        <aside className="building-legend">
          {FLOOR_ORDER.map((floorId) => {
            const floor = FLOOR_SECTIONS.find((item) => item.id === floorId)!
            return (
              <button
                key={floorId}
                type="button"
                className={`legend-item ${hovered === floorId ? 'legend-item--active' : ''}`}
                onMouseEnter={() => setHovered(floorId)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/floor/${floorId}`)}
              >
                <span className="legend-item__id">{floorId}</span>
                <span className="legend-item__meta">
                  <strong>{floor.title}</strong>
                  <small>{floor.subtitle}</small>
                </span>
              </button>
            )
          })}
        </aside>
      </div>
    </div>
  )
}
