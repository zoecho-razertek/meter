import './LandlordSideMenu.css'

/**
 * LandlordSideMenu — 房東側拉選單
 *
 * Props:
 *   open          {boolean}   是否展開
 *   onClose       {function}  關閉回呼
 *   onMenuSelect  {function}  選單點擊回呼 (item: string) => void
 *   items         {string[]}  選單項目，預設為 DEFAULT_ITEMS
 *   username      {string}    顯示的使用者名稱，預設「王大大」
 *
 * Usage:
 *   import LandlordSideMenu from '../components/LandlordSideMenu'
 *
 *   const [showMenu, setShowMenu] = useState(false)
 *
 *   <LandlordSideMenu
 *     open={showMenu}
 *     onClose={() => setShowMenu(false)}
 *     onMenuSelect={item => { if (item === '電表清單') ... }}
 *   />
 *
 * 父層容器需要 position: relative（或 absolute/fixed）。
 */

const DEFAULT_ITEMS = [
  '房源管理', '租賃合約', '帳單列表', '訂金',
  '押金', '退租單', '修繕單', '電子鎖清單', '電表清單', '租客列表',
]

export default function LandlordSideMenu({
  open,
  onClose,
  onMenuSelect,
  items = DEFAULT_ITEMS,
  username = '王大大',
}) {
  return (
    <>
      <div className={`ll-overlay${open ? ' ll-overlay--on' : ''}`} onClick={onClose} />
      <div className={`ll-drawer${open ? ' ll-drawer--open' : ''}`}>
        <div className="ll-side-user">
          <div className="ll-side-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#b1cbdb"/>
              <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" fill="#b1cbdb"/>
            </svg>
          </div>
          <span className="ll-side-username">{username}</span>
        </div>
        <div className="ll-side-divider" />
        <div className="ll-side-list">
          {items.map(item => (
            <button
              key={item}
              className="ll-side-item"
              onClick={() => { onMenuSelect?.(item); onClose() }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
