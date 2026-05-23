import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALL_CATEGORIES } from '../../data/mallData'
import { useRecords } from '../../context/RecordsContext'

export function InboxTerminal() {
  const navigate = useNavigate()
  const { records, addInboxRecord, routeFromInbox } = useRecords()
  const [draftTitle, setDraftTitle] = useState('')
  const [draftContent, setDraftContent] = useState('')
  const [routeSelection, setRouteSelection] = useState<Record<string, string>>({})

  const inboxRecords = records.filter((record) => record.isInbox)
  const hasDraft = draftTitle.trim().length > 0 || draftContent.trim().length > 0

  const submitInbox = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = draftTitle.trim()
    const content = draftContent.trim()
    if (!title || !content) return

    addInboxRecord(title, content)
    setDraftTitle('')
    setDraftContent('')
  }

  return (
    <div className="view view--inbox">
      <header className="view-header">
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          ← 조감도
        </button>
        <p className="eyebrow">B1 물류 연결</p>
        <h1>물류 터미널 · Inbox</h1>
        <p className="lede">
          신상품 언박싱 존 — 분류 전 화물을 박스 단위로 적재합니다.
        </p>
      </header>

      <div className="terminal-layout">
        <form className="unbox-station" onSubmit={submitInbox}>
          <div className="unbox-station__tape" aria-hidden="true" />
          <h2 className="unbox-station__title">NEW ARRIVAL</h2>
          <label className="box-field">
            <span>박스 라벨 (제목)</span>
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="예: 다음주 운동 루틴"
              maxLength={80}
            />
          </label>
          <label className="box-field box-field--large">
            <span>내용물 메모</span>
            <textarea
              value={draftContent}
              onChange={(event) => setDraftContent(event.target.value)}
              placeholder="내용을 적고 저장하세요"
              rows={4}
            />
          </label>

          <div
            className={`ai-slot ${hasDraft ? 'ai-slot--active' : ''}`}
            aria-live="polite"
          >
            <span className="ai-slot__label">[상점 추천]</span>
            <p className="ai-slot__text">
              {hasDraft
                ? '메모 내용을 분석 중입니다...'
                : '메모를 입력하면 추천 매장이 이 영역에 표시됩니다 (API 연동 예정)'}
            </p>
            <div className="ai-slot__shimmer" aria-hidden="true" />
          </div>

          <button type="submit" className="unbox-station__submit">
            컨베이어에 적재
          </button>
        </form>

        <section className="cargo-bay">
          <div className="cargo-bay__header">
            <h2>대기 화물</h2>
            <span>{inboxRecords.length} boxes</span>
          </div>

          {inboxRecords.length === 0 ? (
            <div className="cargo-empty">
              <div className="cargo-empty__crate" aria-hidden="true" />
              <p>컨베이어가 비어 있습니다.</p>
            </div>
          ) : (
            <ul className="cargo-list">
              {inboxRecords.map((record) => (
                <li key={record.id} className="cargo-box">
                  <div className="cargo-box__flap" aria-hidden="true" />
                  <div className="cargo-box__label">BOX · {record.id.slice(-4)}</div>
                  <strong>{record.title}</strong>
                  <p>{record.content}</p>
                  <time>{record.createdAt}</time>
                  <div className="cargo-box__route">
                    <select
                      value={routeSelection[record.id] ?? ''}
                      onChange={(event) =>
                        setRouteSelection((previous) => ({
                          ...previous,
                          [record.id]: event.target.value,
                        }))
                      }
                    >
                      <option value="">배송할 매장 선택</option>
                      {ALL_CATEGORIES.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.floor} · {category.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const target = routeSelection[record.id]
                        if (target) routeFromInbox(record.id, target)
                      }}
                    >
                      출고
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
