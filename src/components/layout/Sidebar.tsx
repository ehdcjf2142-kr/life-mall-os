import { NavLink } from 'react-router-dom'
import { FLOOR_SECTIONS } from '../../data/mallData'
import { useRecords } from '../../context/RecordsContext'

type SidebarProps = {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { inboxCount } = useRecords()

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__top">
        <NavLink to="/" className="sidebar__brand" title="Life Mall OS">
          <span className="sidebar__brand-mark">LM</span>
          {!collapsed && (
            <span className="sidebar__brand-text">
              Life Mall
              <small>OS</small>
            </span>
          )}
        </NavLink>
        <button
          type="button"
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="sidebar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar__link${isActive ? ' active' : ''}`
          }
        >
          <span className="sidebar__icon">🏢</span>
          {!collapsed && <span>조감도</span>}
        </NavLink>
        <NavLink
          to="/inbox"
          className={({ isActive }) =>
            `sidebar__link sidebar__link--inbox${isActive ? ' active' : ''}`
          }
        >
          <span className="sidebar__icon">📦</span>
          {!collapsed && <span>물류 Inbox</span>}
          {inboxCount > 0 && (
            <span className="sidebar__badge">{inboxCount}</span>
          )}
        </NavLink>
      </nav>

      {!collapsed && (
        <div className="sidebar__floors">
          <p className="sidebar__label">층 바로가기</p>
          {FLOOR_SECTIONS.map((floor) => (
            <NavLink
              key={floor.id}
              to={`/floor/${floor.id}`}
              className={({ isActive }) =>
                `sidebar__floor-link${isActive ? ' active' : ''}`
              }
            >
              <span>{floor.id}</span>
              <span>{floor.title}</span>
            </NavLink>
          ))}
        </div>
      )}
    </aside>
  )
}
