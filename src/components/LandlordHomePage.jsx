import { useState } from 'react'
import LandlordSideMenu from './LandlordSideMenu'
import './LandlordHomePage.css'

import icBurger       from '../assets/ic_basic_burger.png'
import icAdd          from '../assets/ic_basic_add.png'
import icRentDoc      from '../assets/ic_rent_doc.png'
import icRentHouse    from '../assets/ic_rent_house.png'
import icHomeContract from '../assets/ic_home_contract.png'
import icHomeRent     from '../assets/ic_home_rent.png'
import icHomeDeposit  from '../assets/ic_home_deposit.png'
import icHomeFix      from '../assets/ic_home_fix.png'
import imgCardBg      from '../assets/img_btn_landlord_rent_b.png'
import icTabHome         from '../assets/ic_tab_home.png'
import icTabHomeUnfocus  from '../assets/ic_tab_home_unfocus.png'
import icTabMessage      from '../assets/ic_tab_message_unfocus.png'
import icTabNotification from '../assets/ic_tab_notification_unfocus.png'
import icTabSetting      from '../assets/ic_tab_setting_unfocus.png'

/**
 * LandlordHomePage — 房東首頁（含漢堡選單）
 *
 * Props:
 *   onMenuSelect  {function}  選單項目點擊回呼 (item: string) => void
 *                             e.g. item === '電表清單' 時開啟電表列表
 *   menuItems     {string[]}  覆蓋預設選單項目（可選）
 *   username      {string}    側選單顯示的使用者名稱，預設「王大大」
 *
 * Usage:
 *   import LandlordHomePage from '../components/LandlordHomePage'
 *
 *   <LandlordHomePage
 *     onMenuSelect={item => {
 *       if (item === '電表清單') setShowMeterList(true)
 *     }}
 *   />
 *
 * 父層容器需要 position: relative（或 absolute/fixed）。
 */

const SHORTCUTS = [
  { key: 'contract', icon: icHomeContract, label: '待辦租約', count: 14256 },
  { key: 'rent',     icon: icHomeRent,     label: '待收帳單', count: 33102 },
  { key: 'deposit',  icon: icHomeDeposit,  label: '訂金',     count: 2     },
  { key: 'fix',      icon: icHomeFix,      label: '修繕單',   count: 38    },
]

const PROP_STATS = [
  { value: 12000, label: '出租中' },
  { value: 200,   label: '空置' },
  { value: 2,     label: '即將搬入' },
  { value: 1,     label: '租約屆期' },
]

const TABS = [
  { label: '首頁',   on: icTabHome,         off: icTabHomeUnfocus  },
  { label: '訊息',   on: icTabMessage,      off: icTabMessage      },
  { label: '佈告欄', on: icTabNotification, off: icTabNotification },
  { label: '我的',   on: icTabSetting,      off: icTabSetting      },
]

function StatusBar() {
  return (
    <div className="lh-status">
      <span className="lh-status-time">9:41</span>
      <div className="lh-status-icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="3" width="3" height="9" rx="1" fill="#333" />
          <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#333" />
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#333" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#333" opacity="0.35" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.7 10.7 0.5 8 0.5C5.3 0.5 2.8 1.7 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="#333"/>
          <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.3 10 3.5 8 3.5C6 3.5 4.1 4.3 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" fill="#333"/>
          <circle cx="8" cy="10" r="1.5" fill="#333"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/>
          <rect x="22" y="4" width="2" height="4" rx="1" fill="#333" fillOpacity="0.4"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill="#333"/>
        </svg>
      </div>
    </div>
  )
}

export default function LandlordHomePage({ onMenuSelect, menuItems, username }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="lh-page">
      <StatusBar />
      <div className="lh-topbar">
        <button className="lh-icon-btn" onClick={() => setShowMenu(true)}>
          <img src={icBurger} alt="選單" width={24} height={24} />
        </button>
        <span style={{ flex: 1 }} />
        <button className="lh-icon-btn">
          <img src={icAdd} alt="新增" width={24} height={24} />
        </button>
      </div>

      <div className="lh-scroll">
        {/* 本月收入 */}
        <div className="lh-info-card">
          <img src={imgCardBg} alt="" className="lh-card-bg" />
          <div className="lh-card-title-row">
            <img src={icRentDoc} alt="" width={30} height={30} />
            <span className="lh-card-label">本月收入</span>
          </div>
          <div className="lh-card-amount">
            <span className="lh-card-currency">TWD</span>
            <span className="lh-card-value">$880,000,000,000</span>
          </div>
        </div>

        {/* 房源狀態 */}
        <div className="lh-info-card">
          <img src={imgCardBg} alt="" className="lh-card-bg" />
          <div className="lh-card-title-row">
            <img src={icRentHouse} alt="" width={30} height={30} />
            <span className="lh-card-label">房源狀態</span>
          </div>
          <div className="lh-prop-stats">
            {PROP_STATS.map(s => (
              <div key={s.label} className="lh-prop-col">
                <span className="lh-prop-val">{s.value}</span>
                <span className="lh-prop-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 捷徑 */}
        <div className="lh-shortcut-grid">
          {SHORTCUTS.map(s => (
            <button key={s.key} className="lh-shortcut-card">
              <img src={s.icon} alt={s.label} className="lh-shortcut-icon" />
              <div className="lh-shortcut-text">
                <span className="lh-shortcut-name">{s.label}</span>
                <span className="lh-shortcut-count">({s.count})</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="lh-tabbar">
        {TABS.map(({ label, on, off }, i) => (
          <div key={label} className="lh-tab">
            <img src={i === 0 ? on : off} alt={label} width={24} height={24} />
            <span className="lh-tab-label" style={{ color: i === 0 ? 'var(--color-primary-blue-main, #3a6ea5)' : 'var(--color-text-unfocus, #999)' }}>{label}</span>
          </div>
        ))}
        <div className="lh-home-indicator" />
      </div>

      <LandlordSideMenu
        open={showMenu}
        onClose={() => setShowMenu(false)}
        onMenuSelect={item => { onMenuSelect?.(item); setShowMenu(false) }}
        items={menuItems}
        username={username}
      />
    </div>
  )
}
