import { useState, useRef } from 'react'
import './TenantDepositHomePage.css'

import icTabHome         from '../assets/ic_tab_home.png'
import icTabHomeUnfocus  from '../assets/ic_tab_home_unfocus.png'
import icTabMessage      from '../assets/ic_tab_message_unfocus.png'
import icTabNotification from '../assets/ic_tab_notification_unfocus.png'
import icTabSetting      from '../assets/ic_tab_setting_unfocus.png'
import icRentLease       from '../assets/ic_rent_lease.png'
import icRentBill        from '../assets/ic_rent_bill.png'
import icRentRepair      from '../assets/ic_rent_repair.png'
import icRentElectric    from '../assets/ic_rent_electric.png'
import icRentDeposit     from '../assets/ic_rent_deposit.png'
import icBattery         from '../assets/ic_battery.png'
import icLightGreen      from '../assets/ic_light_green.png'

/**
 * TenantDepositHomePage — 租客端首頁（儲值電表情境）
 *
 * Props:
 *   username     {string}    顯示名稱，預設「Betty」
 *   onElecInfo   {function}  點擊「用電資訊」時的回呼 () => void
 *
 * Usage:
 *   import TenantDepositHomePage from '../components/TenantDepositHomePage'
 *
 *   <TenantDepositHomePage
 *     username="Betty"
 *     onElecInfo={() => setShowMeterPage(true)}
 *   />
 *
 * 父層容器需要 position: relative（或 absolute/fixed）。
 */

const AVATAR_URL    = 'https://www.figma.com/api/mcp/asset/ae2ed0b3-1b14-42c5-80d6-6066188605c9'
const PHOTO_GATE_URL = 'https://www.figma.com/api/mcp/asset/c93c7523-d035-429c-b758-743c1b70bfbc'
const PHOTO_201_URL  = 'https://www.figma.com/api/mcp/asset/0290d242-89b5-481a-9c36-80f1d44ce4f2'

const TABS = [
  { label: '首頁',   icon: icTabHome,         unfocusIcon: icTabHomeUnfocus,  active: true  },
  { label: '訊息',   icon: icTabMessage,      unfocusIcon: icTabMessage,      active: false },
  { label: '佈告欄', icon: icTabNotification, unfocusIcon: icTabNotification, active: false },
  { label: '我的',   icon: icTabSetting,      unfocusIcon: icTabSetting,      active: false },
]

const BILLS = [
  { title: '租金 2 期', due: '2025/03/29', amount: '$12,600', overdue: false },
  { title: '電表儲值',  due: '2025/03/28', amount: '$900',    overdue: false },
  { title: '租金 1 期', due: '2025/02/18', amount: '$12,600', overdue: true  },
]

const DEPOSIT_AMOUNTS = [500, 1000, 2000, 3000]
const DEPOSIT_BALANCE = 1025
const DEPOSIT_RATE    = 5

// ── 內部元件 ──────────────────────────────────────────────────────────────────

function TDStatusBar() {
  return (
    <div className="tdh-status">
      <span className="tdh-status-time">9:41</span>
      <div className="tdh-status-icons">
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

function TDBatteryBar({ outerPct, innerPct }) {
  const outerW = Math.round(82 * outerPct / 100)
  const innerW = Math.round(82 * innerPct / 100)
  const innerColor = innerPct >= 60 ? '#71db5d' : '#f8da54'
  return (
    <div className="tdh-battery-section">
      <div className="tdh-battery-divider" />
      <div className="tdh-battery-content">
        <img src={icBattery} alt="" className="tdh-battery-icon" />
        <div className="tdh-battery-set">
          <span className="tdh-battery-label">門外 {outerPct}%</span>
          <div className="tdh-battery-track">
            <div className="tdh-battery-fill" style={{ width: outerW, background: '#71db5d' }} />
          </div>
        </div>
        <div className="tdh-battery-set">
          <span className="tdh-battery-label">門內 {innerPct}%</span>
          <div className="tdh-battery-track">
            <div className="tdh-battery-fill" style={{ width: innerW, background: innerColor }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function TDLockCard({ photo, name, connected, doorLocked, outerPct, innerPct }) {
  return (
    <div className="tdh-card tdh-lock-card">
      <div className="tdh-lock-room">
        <img src={photo} alt={name} className="tdh-lock-photo" />
        <div className="tdh-lock-info">
          <span className="tdh-lock-name">{name}</span>
          <div className="tdh-lock-status">
            <div className="tdh-status-row">
              <span className={`tdh-dot tdh-dot--${connected ? 'green' : 'red'}`} />
              <span className={`tdh-status-text tdh-status-text--${connected ? 'green' : 'red'}`}>
                {connected ? '連線正常' : '連線異常'}
              </span>
            </div>
            <div className="tdh-status-row">
              <span className={`tdh-dot tdh-dot--${doorLocked ? 'green' : 'red'}`} />
              <span className={`tdh-status-text tdh-status-text--${doorLocked ? 'green' : 'red'}`}>
                {doorLocked ? '已自動上鎖' : '未關門！'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <TDBatteryBar outerPct={outerPct} innerPct={innerPct} />
    </div>
  )
}

function TDActionCard({ actions }) {
  return (
    <div className="tdh-card tdh-action-card">
      {actions.map(({ icon, label, onClick }) => (
        <button key={label} className="tdh-action-btn" onClick={onClick}>
          <img src={icon} alt={label} className="tdh-action-img" />
          <span className="tdh-action-label">{label}</span>
        </button>
      ))}
    </div>
  )
}

function TDBillCard({ title, due, amount, overdue }) {
  return (
    <div className="tdh-card tdh-bill-card">
      <div className="tdh-bill-inner">
        <div className="tdh-bill-title-row">
          <span className={`tdh-bill-title${overdue ? ' tdh-bill-title--overdue' : ''}`}>{title}</span>
          {overdue && <span className="tdh-bill-tag">已逾期</span>}
        </div>
        <div className="tdh-bill-detail-row">
          <span className={`tdh-bill-due${overdue ? ' tdh-bill-due--overdue' : ''}`}>繳費期限：{due}</span>
          <span className={`tdh-bill-amount${overdue ? ' tdh-bill-amount--overdue' : ''}`}>{amount}</span>
        </div>
      </div>
    </div>
  )
}

function TDToast({ message }) {
  return <div className="tdh-toast">{message}</div>
}

// ── 電表儲值 Modal ────────────────────────────────────────────────────────────

function TDDepositModal({ onClose, onPay }) {
  const [selected, setSelected] = useState(500)
  const afterBalance = DEPOSIT_BALANCE + selected
  const usableUnits  = Math.floor(afterBalance / DEPOSIT_RATE)

  return (
    <div className="tdh-overlay" onClick={onClose}>
      <div className="tdh-sheet tdh-deposit-sheet" onClick={e => e.stopPropagation()}>
        <div className="tdh-drag-indicator" />
        <p className="tdh-sheet-title">電表儲值</p>

        <div className="tdh-deposit-info-block">
          <span className="tdh-deposit-info-label">目前餘額</span>
          <span className="tdh-deposit-info-value">${DEPOSIT_BALANCE.toLocaleString()}</span>
        </div>

        <div className="tdh-deposit-section">
          <p className="tdh-deposit-section-label">儲值金額</p>
          <div className="tdh-deposit-amounts">
            {DEPOSIT_AMOUNTS.map(amt => (
              <button
                key={amt}
                className={`tdh-deposit-amount-btn${selected === amt ? ' tdh-deposit-amount-btn--active' : ''}`}
                onClick={() => setSelected(amt)}
              >${amt.toLocaleString()}</button>
            ))}
          </div>
          <p className="tdh-deposit-note">儲值後，可在「帳單」中找到本次儲值的費用明細。</p>
        </div>

        <div className="tdh-deposit-info-block">
          <span className="tdh-deposit-info-label">儲值後金額</span>
          <span className="tdh-deposit-info-value tdh-deposit-info-value--sm">${afterBalance.toLocaleString()}</span>
        </div>
        <div className="tdh-deposit-info-block">
          <span className="tdh-deposit-info-label">費率</span>
          <span className="tdh-deposit-info-value tdh-deposit-info-value--sm">${DEPOSIT_RATE} / 每度</span>
        </div>
        <div className="tdh-deposit-info-block">
          <span className="tdh-deposit-info-label">儲值後預計可用電度</span>
          <span className="tdh-deposit-info-value tdh-deposit-info-value--sm">{usableUnits} 度</span>
        </div>

        <button className="tdh-deposit-submit-btn" onClick={() => onPay(selected)}>儲值</button>
      </div>
    </div>
  )
}

// ── 繳費 Modal ────────────────────────────────────────────────────────────────

function TDPaymentModal({ amount, onClose }) {
  const dateRef = useRef(null)
  const today   = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const [date, setDate]         = useState(todayStr)
  const [lastFive, setLastFive] = useState('')
  const [toast, setToast]       = useState('')

  const canSubmit = date && lastFive.length === 5
  const fmtDate   = d => d ? d.replace(/-/g, '/') : ''

  const handleCopy = () => {
    navigator.clipboard?.writeText('112233445566').catch(() => {})
    setToast('已複製！')
    setTimeout(() => setToast(''), 1500)
  }
  const handleSubmit = () => {
    setToast('已通知匯款！')
    setTimeout(() => { setToast(''); onClose() }, 2000)
  }
  const openPicker = () => {
    try { dateRef.current?.showPicker() } catch { dateRef.current?.click() }
  }

  return (
    <div className="tdh-overlay" onClick={onClose}>
      <div className="tdh-sheet tdh-pay-sheet" onClick={e => e.stopPropagation()}>
        <div className="tdh-drag-indicator" />
        <p className="tdh-sheet-title">繳費細節</p>

        <div className="tdh-pay-info-field">
          <span className="tdh-pay-info-label">銀行</span>
          <span className="tdh-pay-info-value--h2">中國信託 812</span>
        </div>

        <div className="tdh-pay-info-field">
          <span className="tdh-pay-info-label">帳戶號碼</span>
          <div className="tdh-pay-account-row">
            <span className="tdh-pay-info-value--h2">112233445566</span>
            <button className="tdh-pay-copy-icon" onClick={handleCopy}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="10" height="10" rx="2" stroke="#5d697f" strokeWidth="1.5"/>
                <path d="M15 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h2" stroke="#5d697f" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="tdh-pay-info-field">
          <span className="tdh-pay-info-label">金額</span>
          <span className="tdh-pay-info-value--h1">$ {amount?.toLocaleString()}</span>
          <div className="tdh-pay-detail-box">
            <p className="tdh-pay-detail-title">電表儲值</p>
            <p className="tdh-pay-detail-fee">費用：${amount?.toLocaleString()}</p>
          </div>
        </div>

        <div className="tdh-pay-field">
          <span className="tdh-pay-field-label">匯款日期*</span>
          <div className="tdh-pay-input-wrap tdh-pay-input-wrap--select" onClick={openPicker}>
            <input ref={dateRef} type="date" className="tdh-pay-date-hidden" value={date} onChange={e => setDate(e.target.value)} />
            <span className="tdh-pay-input-text">{date ? fmtDate(date) : ''}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="tdh-pay-field">
          <span className="tdh-pay-field-label">帳號後五碼*</span>
          <div className="tdh-pay-input-wrap">
            <input
              className="tdh-pay-input"
              inputMode="numeric"
              maxLength={5}
              value={lastFive}
              onChange={e => setLastFive(e.target.value.replace(/\D/g, '').slice(0, 5))}
            />
          </div>
        </div>

        <button
          className="tdh-pay-confirm-btn"
          style={{ opacity: canSubmit ? 1 : 0.45 }}
          onClick={canSubmit ? handleSubmit : undefined}
        >通知已匯款</button>
      </div>
      {toast && <div className="tdh-toast">{toast}</div>}
    </div>
  )
}

// ── 主元件 ────────────────────────────────────────────────────────────────────

export default function TenantDepositHomePage({ username = 'Betty', onElecInfo }) {
  const [showDepositModal,  setShowDepositModal]  = useState(false)
  const [showPaymentModal,  setShowPaymentModal]  = useState(false)
  const [paymentAmount,     setPaymentAmount]     = useState(null)
  const [showToast,         setShowToast]         = useState(false)

  const handleDeposit = () => setShowDepositModal(true)
  const handlePay = (amt) => {
    setPaymentAmount(amt)
    setShowDepositModal(false)
    setShowPaymentModal(true)
  }
  const handlePayClose = () => setShowPaymentModal(false)

  return (
    <div className="tdh-page">
      <TDStatusBar />

      {/* Header */}
      <div className="tdh-header">
        <div className="tdh-user">
          <img src={AVATAR_URL} alt={username} className="tdh-avatar" />
          <span className="tdh-greeting">Hi {username}!</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="tdh-body">

        {/* ── 台北套房 ── */}
        <div className="tdh-module">
          <div className="tdh-module-title">
            <h2>台北套房</h2>
            <button className="tdh-link">切換租屋處</button>
          </div>

          <TDLockCard
            photo={PHOTO_GATE_URL}
            name="公用大門"
            connected={true}
            doorLocked={true}
            outerPct={90}
            innerPct={50}
          />

          <TDLockCard
            photo={PHOTO_201_URL}
            name="201"
            connected={true}
            doorLocked={false}
            outerPct={90}
            innerPct={50}
          />

          <TDActionCard actions={[
            { icon: icRentLease,  label: '租約'  },
            { icon: icRentBill,   label: '帳單'  },
            { icon: icRentRepair, label: '報修'  },
          ]} />
        </div>

        {/* ── 電表 ── */}
        <div className="tdh-module">
          <div className="tdh-module-title">
            <h2>電表</h2>
          </div>

          <div className="tdh-card tdh-elec-card">
            <div className="tdh-elec-deposit">
              <div className="tdh-elec-amount-row">
                <span className="tdh-elec-amount">$145</span>
                <span className="tdh-elec-units">(約 29 度電)</span>
              </div>
              <div className="tdh-elec-status-row">
                <img src={icLightGreen} alt="" width={8} height={8} />
                <span className="tdh-elec-status-text">連線正常</span>
              </div>
            </div>
          </div>

          <TDActionCard actions={[
            { icon: icRentElectric, label: '用電資訊', onClick: onElecInfo },
            { icon: icRentDeposit,  label: '電表儲值', onClick: handleDeposit },
          ]} />
        </div>

        {/* ── 待繳帳單 ── */}
        <div className="tdh-module">
          <div className="tdh-module-title">
            <h2>待繳帳單</h2>
            <button className="tdh-link">合併繳費</button>
          </div>
          {BILLS.map(b => (
            <TDBillCard key={b.title} {...b} />
          ))}
        </div>

      </div>

      {/* Tab bar */}
      <div className="tdh-tabbar">
        {TABS.map(({ label, icon, unfocusIcon, active }) => (
          <div key={label} className="tdh-tab">
            <img src={active ? icon : unfocusIcon} alt={label} className="tdh-tab-img" />
            <span className={`tdh-tab-label${active ? ' tdh-tab-label--active' : ''}`}>{label}</span>
          </div>
        ))}
        <div className="tdh-home-indicator" />
      </div>

      {/* Modals */}
      {showDepositModal && (
        <TDDepositModal
          onClose={() => setShowDepositModal(false)}
          onPay={handlePay}
        />
      )}
      {showPaymentModal && (
        <TDPaymentModal
          amount={paymentAmount}
          onClose={handlePayClose}
        />
      )}
      {showToast && <TDToast message="已通知匯款！" />}
    </div>
  )
}
