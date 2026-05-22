import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type FloorId = '4F' | '3F' | '2F' | '1F' | 'B1'

type Category = {
  name: string
  description: string
}

type FloorSection = {
  id: FloorId
  title: string
  subtitle: string
  categories: Category[]
}

type LifeRecord = {
  id: string
  title: string
  content: string
  floor: FloorId
  tagCategory: string
  createdAt: string
  isInbox: boolean
}

const FLOOR_SECTIONS: FloorSection[] = [
  {
    id: '4F',
    title: '총괄 경영관',
    subtitle: '미래/전략',
    categories: [
      { name: '시스템 통합 정기 회고록', description: '큰 흐름 점검과 회고' },
      { name: '나의 계획', description: '장단기 실행 계획' },
      { name: '성장 스킬 트리', description: '역량 성장 로드맵' },
      { name: '나의 버킷리스트', description: '꼭 해보고 싶은 일' },
    ],
  },
  {
    id: '3F',
    title: '감성 문화관',
    subtitle: '지식/영감',
    categories: [
      { name: '나의 일기', description: '감정과 하루 기록' },
      { name: '나의 아이디어', description: '번뜩이는 생각 보관' },
      { name: '나의 취미 창고', description: '취미 활동 아카이브' },
      { name: '미디어 소비 대기열', description: '보고 듣고 읽을 목록' },
      { name: '황금 문장 수집함', description: '인상적인 문장 모음' },
      { name: '멘탈 앵커', description: '마음 중심을 잡는 메모' },
    ],
  },
  {
    id: '2F',
    title: '금융 & 편집숍',
    subtitle: '자산/장비',
    categories: [
      { name: '자산/시스템 투자', description: '재무와 투자 운영' },
      { name: '구독/고정지출', description: '매월 반복 지출 관리' },
      { name: '인맥 관리', description: '관계와 네트워크 기록' },
      { name: '소유 장비', description: '보유 장비 목록과 상태' },
      { name: '경조사 렛저', description: '경조사 내역 정리' },
      { name: '중요 문서 금고', description: '핵심 문서 메모' },
      { name: '패션 드레스룸', description: '착장 및 아이템 정리' },
    ],
  },
  {
    id: '1F',
    title: '라이프 마켓',
    subtitle: '실시간 실행',
    categories: [
      { name: '나의 프로젝트', description: '진행 중 프로젝트 현황' },
      { name: '나의 일정', description: '일정과 할 일 관리' },
      { name: '건강/루틴', description: '건강 습관 체크' },
      { name: '식단/영양 로그', description: '먹은 것과 컨디션 추적' },
      { name: '출장/여행 패킹', description: '이동 준비 체크리스트' },
    ],
  },
  {
    id: 'B1',
    title: '기계실 & 창고',
    subtitle: '인프라/유지보수',
    categories: [
      { name: '실패 창고(오답노트)', description: '실패에서 얻은 교훈' },
      { name: 'AI 프롬프트', description: '자주 쓰는 프롬프트 저장' },
      { name: '루틴 SOP', description: '반복 작업 표준화' },
      { name: '장비 정기 점검', description: '정기 유지보수 내역' },
      { name: '네이밍 가이드', description: '명명 규칙 모음' },
      { name: '개발 아카이브', description: '개발 기록과 레퍼런스' },
      { name: '리빙 인벤토리', description: '생활 비품 관리' },
    ],
  },
]

const ALL_CATEGORIES = FLOOR_SECTIONS.flatMap((floor) =>
  floor.categories.map((category) => ({
    floor: floor.id,
    floorTitle: floor.title,
    ...category,
  })),
)

const SEED_RECORDS: LifeRecord[] = [
  {
    id: crypto.randomUUID(),
    title: '읽고 싶은 책 메모',
    content: '도서관 가기 전에 읽을 목록부터 정리하기.',
    floor: '3F',
    tagCategory: '',
    createdAt: '2026-05-22 08:30',
    isInbox: true,
  },
  {
    id: crypto.randomUUID(),
    title: '다음주 운동 루틴 실험',
    content: '월/수/금 근력, 화/목 가벼운 러닝으로 조정.',
    floor: '1F',
    tagCategory: '',
    createdAt: '2026-05-22 09:10',
    isInbox: true,
  },
  {
    id: crypto.randomUUID(),
    title: '분기별 회고 초안',
    content: '이번 분기 핵심 성과와 병목 요인을 정리했다.',
    floor: '4F',
    tagCategory: '시스템 통합 정기 회고록',
    createdAt: '2026-05-18 21:30',
    isInbox: false,
  },
  {
    id: crypto.randomUUID(),
    title: '신규 사이드 프로젝트 아이디어',
    content: '개인 지식 그래프 기반 추천 서비스 가능성 검토.',
    floor: '1F',
    tagCategory: '나의 프로젝트',
    createdAt: '2026-05-19 14:10',
    isInbox: false,
  },
  {
    id: crypto.randomUUID(),
    title: '정기 구독 점검',
    content: '사용하지 않는 SaaS 2개는 다음달 해지 예정.',
    floor: '2F',
    tagCategory: '구독/고정지출',
    createdAt: '2026-05-20 10:00',
    isInbox: false,
  },
]

function App() {
  const [records, setRecords] = useState<LifeRecord[]>(SEED_RECORDS)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftContent, setDraftContent] = useState('')
  const [selectedView, setSelectedView] = useState<string>('INBOX')
  const [openedFloor, setOpenedFloor] = useState<FloorId | null>('4F')
  const [routeSelection, setRouteSelection] = useState<Record<string, string>>({})

  const currentViewMeta = useMemo(() => {
    if (selectedView === 'INBOX') {
      return {
        title: '📥 무지성 Inbox',
        description: '분류 고민 없이 먼저 기록하고, 나중에 태그로 이동합니다.',
      }
    }

    const found = ALL_CATEGORIES.find((category) => category.name === selectedView)
    if (!found) {
      return {
        title: selectedView,
        description: '선택한 카테고리 데이터 뷰',
      }
    }

    return {
      title: `${found.floor} · ${found.name}`,
      description: `${found.floorTitle} / ${found.description}`,
    }
  }, [selectedView])

  const visibleRecords = useMemo(() => {
    if (selectedView === 'INBOX') {
      return records.filter((record) => record.isInbox)
    }
    return records.filter(
      (record) => !record.isInbox && record.tagCategory === selectedView,
    )
  }, [records, selectedView])

  const submitInbox = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = draftTitle.trim()
    const content = draftContent.trim()
    if (!title || !content) {
      return
    }

    const now = new Date()
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes(),
    ).padStart(2, '0')}`

    setRecords((previous) => [
      {
        id: crypto.randomUUID(),
        title,
        content,
        floor: '1F',
        tagCategory: '',
        createdAt,
        isInbox: true,
      },
      ...previous,
    ])
    setDraftTitle('')
    setDraftContent('')
    setSelectedView('INBOX')
  }

  const routeFromInbox = (recordId: string) => {
    const selectedCategory = routeSelection[recordId]
    if (!selectedCategory) {
      return
    }

    const categoryMeta = ALL_CATEGORIES.find(
      (category) => category.name === selectedCategory,
    )
    if (!categoryMeta) {
      return
    }

    setRecords((previous) =>
      previous.map((record) =>
        record.id === recordId
          ? {
              ...record,
              isInbox: false,
              floor: categoryMeta.floor,
              tagCategory: categoryMeta.name,
            }
          : record,
      ),
    )
    setRouteSelection((previous) => {
      const next = { ...previous }
      delete next[recordId]
      return next
    })
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Life Mall OS</h1>
        <p className="caption">Single Data, Multi Views</p>

        <button
          className={`inbox-button ${selectedView === 'INBOX' ? 'selected' : ''}`}
          type="button"
          onClick={() => setSelectedView('INBOX')}
        >
          📥 무지성 Inbox
        </button>

        <div className="floor-list">
          {FLOOR_SECTIONS.map((floor) => (
            <div className="floor-item" key={floor.id}>
              <button
                className="floor-toggle"
                type="button"
                onClick={() =>
                  setOpenedFloor((current) => (current === floor.id ? null : floor.id))
                }
              >
                <span>
                  {floor.id} · {floor.title}
                </span>
                <span>{openedFloor === floor.id ? '−' : '+'}</span>
              </button>
              {openedFloor === floor.id && (
                <ul className="category-list">
                  {floor.categories.map((category) => (
                    <li key={category.name}>
                      <button
                        className={`category-button ${
                          selectedView === category.name ? 'selected' : ''
                        }`}
                        type="button"
                        onClick={() => setSelectedView(category.name)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="main-panel">
        <header className="main-header">
          <h2>{currentViewMeta.title}</h2>
          <p>{currentViewMeta.description}</p>
        </header>

        {selectedView === 'INBOX' && (
          <form className="inbox-form" onSubmit={submitInbox}>
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="제목"
              maxLength={80}
            />
            <textarea
              value={draftContent}
              onChange={(event) => setDraftContent(event.target.value)}
              placeholder="내용 입력 후 Enter 또는 [Inbox에 저장]"
              rows={3}
            />
            <button type="submit">Inbox에 저장</button>
          </form>
        )}

        <section className="record-grid">
          {visibleRecords.length === 0 && (
            <div className="empty-card">
              아직 데이터가 없습니다. Inbox에서 기록을 추가하거나 다른 매장을 선택해 보세요.
            </div>
          )}

          {visibleRecords.map((record) => (
            <article className="record-card" key={record.id}>
              <div className="record-top">
                <strong>{record.title}</strong>
                <span>{record.createdAt}</span>
              </div>
              <p>{record.content}</p>

              {record.isInbox ? (
                <div className="routing-row">
                  <select
                    value={routeSelection[record.id] ?? ''}
                    onChange={(event) =>
                      setRouteSelection((previous) => ({
                        ...previous,
                        [record.id]: event.target.value,
                      }))
                    }
                  >
                    <option value="">태그(매장)를 선택하세요</option>
                    {ALL_CATEGORIES.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.floor} · {category.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => routeFromInbox(record.id)}>
                    태그 이동
                  </button>
                </div>
              ) : (
                <div className="tag-chip">
                  {record.floor} · #{record.tagCategory}
                </div>
              )}
            </article>
          ))}
        </section>

        <button
          className="fab"
          type="button"
          onClick={() => setSelectedView('INBOX')}
          aria-label="quick memo"
          title="빠른 메모 작성"
        >
          +
        </button>
      </main>
    </div>
  )
}

export default App
