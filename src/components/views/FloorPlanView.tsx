import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFloor } from '../../data/mallData'

export function FloorPlanView() {
  const { floorId = '' } = useParams()
  const navigate = useNavigate()
  const floor = getFloor(floorId)

  if (!floor) {
    return (
      <div className="view view--empty">
        <p>층을 찾을 수 없습니다.</p>
        <button type="button" onClick={() => navigate('/')}>
          조감도로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="view view--floor">
      <header className="view-header">
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          ← 조감도
        </button>
        <p className="eyebrow">{floor.id} · {floor.subtitle}</p>
        <h1>{floor.title}</h1>
        <p className="lede">{floor.tagline}</p>
      </header>

      <div className="floor-plan">
        <div className="floor-plan__grid" aria-hidden="true">
          {Array.from({ length: 48 }).map((_, index) => (
            <span key={index} className="floor-plan__cell" />
          ))}
        </div>

        <div className="floor-plan__shops">
          {floor.categories.map((category) => (
            <Link
              key={category.slug}
              to={`/shop/${floor.id}/${category.slug}`}
              className={`shopfront shopfront--${category.theme}`}
            >
              <span className="shopfront__awning" />
              <span className="shopfront__name">{category.name}</span>
              <span className="shopfront__desc">{category.description}</span>
              <span className="shopfront__enter">입장 →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
