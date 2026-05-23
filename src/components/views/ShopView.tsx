import { useNavigate, useParams } from 'react-router-dom'
import {
  getCategory,
  getFloor,
  THEME_LABELS,
} from '../../data/mallData'
import { useRecords } from '../../context/RecordsContext'

export function ShopView() {
  const { floorId = '', slug = '' } = useParams()
  const navigate = useNavigate()
  const { getRecordsByCategory } = useRecords()

  const floor = getFloor(floorId)
  const category = getCategory(floorId, slug)

  if (!floor || !category) {
    return (
      <div className="view view--empty">
        <p>매장을 찾을 수 없습니다.</p>
        <button type="button" onClick={() => navigate('/')}>
          조감도로 돌아가기
        </button>
      </div>
    )
  }

  const records = getRecordsByCategory(category.name)

  return (
    <div className={`view view--shop shop-theme--${category.theme}`}>
      <div className="shop-scene">
        <header className="view-header">
          <button
            type="button"
            className="back-link"
            onClick={() => navigate(`/floor/${floorId}`)}
          >
            ← {floor.id} 도면
          </button>
          <p className="eyebrow">{THEME_LABELS[category.theme]}</p>
          <h1>{category.name}</h1>
          <p className="lede">{category.description}</p>
        </header>

        <section className="shop-inventory">
          {records.length === 0 ? (
            <div className="inventory-empty">
              <p>진열대가 비어 있습니다.</p>
              <p className="muted">
                물류 Inbox에서 기록을 추가한 뒤 이 매장으로 태그를 이동해 보세요.
              </p>
            </div>
          ) : (
            <ul className="inventory-list">
              {records.map((record) => (
                <li key={record.id} className="inventory-item">
                  <div className="inventory-item__head">
                    <strong>{record.title}</strong>
                    <time>{record.createdAt}</time>
                  </div>
                  <p>{record.content}</p>
                  <span className="inventory-item__tag">
                    {record.floor} · #{record.tagCategory}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
