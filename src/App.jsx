import { useState, useRef, useEffect } from 'react'
import './App.css'
import icTabHome from './assets/ic_tab_home.png'
import icTabHomeUnfocus from './assets/ic_tab_home_unfocus.png'
import icTabMessage from './assets/ic_tab_message_unfocus.png'
import icTabNotification from './assets/ic_tab_notification_unfocus.png'
import icTabSetting from './assets/ic_tab_setting_unfocus.png'
import icRentLease from './assets/ic_rent_lease.png'
import icRentBill from './assets/ic_rent_bill.png'
import icRentRepair from './assets/ic_rent_repair.png'
import icRentElectric from './assets/ic_rent_electric.png'
import icRentMeterCopy from './assets/ic_rent_meter_copy.png'
import icBattery from './assets/ic_battery.png'
import imgPopupPhoto from './assets/img_popup_photo.png'
import icBurger from './assets/ic_basic_burger.png'
import icEyeOpen from './assets/ic_input_eye_open.png'
import icEyeClose from './assets/ic_input_eye_close.png'
import icAdd from './assets/ic_basic_add.png'
import icRentDoc from './assets/ic_rent_doc.png'
import icRentDeposit from './assets/ic_rent_deposit.png'
import icRentHouse from './assets/ic_rent_house.png'
import icHomeContract from './assets/ic_home_contract.png'
import icHomeRent from './assets/ic_home_rent.png'
import icHomeDeposit from './assets/ic_home_deposit.png'
import icHomeFix from './assets/ic_home_fix.png'
import imgCardBg from './assets/img_btn_landlord_rent_b.png'
import imgPropertyDefault from './assets/img_lock_default_maindoor.png'
import icRentFire from './assets/ic_basic_rent_fire.png'
import icRentIce from './assets/ic_basic_rent_ice.png'
import icTutorial02 from './assets/ic_tutorial_02.png'

const AVATAR_URL = 'https://www.figma.com/api/mcp/asset/ae2ed0b3-1b14-42c5-80d6-6066188605c9'
const PHOTO_GATE_URL = 'https://www.figma.com/api/mcp/asset/c93c7523-d035-429c-b758-743c1b70bfbc'
const PHOTO_201_URL = 'https://www.figma.com/api/mcp/asset/0290d242-89b5-481a-9c36-80f1d44ce4f2'
const BATTERY_ICON_URL = 'https://www.figma.com/api/mcp/asset/78d88936-aa6d-4f3d-a063-6192e3dc05bb'

const SCENARIOS = ['儲值電表', '系統自動抄表', '房東手動抄表', '租客手動抄表', '智慧電表無租約', '傳統電表無租約']

function StatusBar() {
  return (
    <div className="th-status">
      <span className="th-status-time">9:41</span>
      <div className="th-status-icons">
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

function BatteryBar({ outerPct, innerPct, outerColor, innerColor }) {
  const outerWidth = Math.round(82 * outerPct / 100)
  const innerWidth = Math.round(82 * innerPct / 100)
  return (
    <div className="th-battery-section">
      <div className="th-battery-divider" />
      <div className="th-battery-content">
        <img src={icBattery} alt="" className="th-battery-icon" />
        <div className="th-battery-set">
          <span className="th-battery-label">門外 {outerPct}%</span>
          <div className="th-battery-track">
            <div className="th-battery-fill" style={{ width: outerWidth, background: outerColor }} />
          </div>
        </div>
        <div className="th-battery-set">
          <span className="th-battery-label">門內 {innerPct}%</span>
          <div className="th-battery-track">
            <div className="th-battery-fill" style={{ width: innerWidth, background: innerColor }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function LockCard({ photo, name, connected, doorLocked, outerPct, innerPct }) {
  return (
    <div className="th-card th-lock-card">
      <div className="th-lock-room">
        <img src={photo} alt={name} className="th-lock-photo" />
        <div className="th-lock-info">
          <span className="th-lock-name">{name}</span>
          <div className="th-lock-status">
            <div className="th-status-row">
              <span className={`th-dot th-dot--${connected ? 'green' : 'red'}`} />
              <span className={`th-status-text th-status-text--${connected ? 'green' : 'red'}`}>
                {connected ? '連線正常' : '連線異常'}
              </span>
            </div>
            <div className="th-status-row">
              <span className={`th-dot th-dot--${doorLocked ? 'green' : 'red'}`} />
              <span className={`th-status-text th-status-text--${doorLocked ? 'green' : 'red'}`}>
                {doorLocked ? '已自動上鎖' : '未關門！'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <BatteryBar
        outerPct={outerPct}
        innerPct={innerPct}
        outerColor="#71db5d"
        innerColor={innerPct >= 60 ? '#71db5d' : '#f8da54'}
      />
    </div>
  )
}

function ActionCard({ actions }) {
  return (
    <div className="th-card th-action-card">
      {actions.map(({ icon, label, onClick }) => (
        <button key={label} className="th-action-btn" onClick={onClick}>
          <span className="th-action-icon">{icon}</span>
          <span className="th-action-label">{label}</span>
        </button>
      ))}
    </div>
  )
}

function BillCard({ title, due, amount, overdue }) {
  return (
    <div className="th-card th-bill-card">
      <div className="th-bill-inner">
        <div className="th-bill-title-row">
          <span className={`th-bill-title${overdue ? ' th-bill-title--overdue' : ''}`}>{title}</span>
          {overdue && <span className="th-bill-tag">已逾期</span>}
        </div>
        <div className="th-bill-detail-row">
          <span className={`th-bill-due${overdue ? ' th-bill-due--overdue' : ''}`}>繳費期限：{due}</span>
          <span className={`th-bill-amount${overdue ? ' th-bill-amount--overdue' : ''}`}>{amount}</span>
        </div>
      </div>
    </div>
  )
}

const PRICE_PER_UNIT = 5
const LAST_READING = 87652
const LAST_DATE = '2025/05/13'
const PROPERTY_NAME = '台北套房'
const ROOM_NAME = '201'

function Toast({ message }) {
  return <div className="toast">{message}</div>
}

const ELEC_RECORDS = [
  { date: '2024/05/05', reading: 12999 },
  { date: '2024/04/04', reading: 12821 },
  { date: '2024/03/02', reading: 12784 },
  { date: '2024/12/01', reading: 12573 },
  { date: '2024/01/01', reading: 12290 },
]

const ELEC_METER_PHOTO = 'https://www.figma.com/api/mcp/asset/7b0dad19-700f-4e78-9d04-7c4605800fff'

function ElecDetailPage({ record, onBack }) {
  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">抄表細節</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="elec-body">
        <div className="elec-list">
          <div className="elec-row elec-row--divider">
            <span className="elec-row-date">抄表日</span>
            <span className="elec-row-reading">{record.date}</span>
          </div>
          <div className="elec-row elec-row--divider">
            <span className="elec-row-date">抄表度數</span>
            <span className="elec-row-reading">{record.reading} 度</span>
          </div>
          <div className="elec-detail-photo-row">
            <span className="elec-row-date">電表照片</span>
            <img src={ELEC_METER_PHOTO} alt="電表照片" className="elec-detail-photo" />
          </div>
        </div>
      </div>
    </div>
  )
}

const DEDUCTION_RECORDS = [
  { date: '2025/03/09', amount: 50 },
  { date: '2025/03/08', amount: 51 },
  { date: '2025/03/07', amount: 48 },
  { date: '2025/03/06', amount: 53 },
]

const DEPOSIT_HISTORY = [
  { title: '電表儲值', date: '2025/03/08', amount: 1000 },
  { title: '電表儲值', date: '2025/02/10', amount: 500 },
  { title: '電表儲值', date: '2025/01/15', amount: 2000 },
]

function DeductionDetailPage({ record, onBack }) {
  const rows = [
    { label: '項目',       value: '電費' },
    { label: '扣款方式',   value: '儲值金' },
    { label: '計費日期',   value: record.date },
    { label: '用電度數',   value: '23.1 度' },
    { label: '費率',       value: '每度 $5' },
    { label: '扣款金額',   value: `$${record.amount}` },
    { label: '扣款日期',   value: record.date },
    { label: '扣款後儲值餘額', value: '$884.5' },
    { label: '計費週期',   value: '2025/04/08 - 2025/05/07' },
    { label: '收款日',     value: '2025/05/07' },
  ]

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">扣款細節</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="dd-body">
        <div className="dd-table">
          {rows.map(({ label, value }) => (
            <div key={label} className="dd-cell">
              <span className="dd-cell-label">{label}</span>
              <span className="dd-cell-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DeductionRecordPage({ onBack }) {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <DeductionDetailPage record={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">扣款紀錄</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="dh-body">
        {DEDUCTION_RECORDS.map((r, i) => (
          <div key={i} className="dh-row" style={{ cursor: 'pointer' }} onClick={() => setSelected(r)}>
            <div className="dh-row-content">
              <span className="dh-row-title">{r.date}</span>
              <div className="dh-row-right">
                <span className="dh-row-amount">${r.amount}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="dh-divider" />
          </div>
        ))}
        <div className="dr-note">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.65, flexShrink: 0 }}>
            <circle cx="12" cy="12" r="9" stroke="#5d697f" strokeWidth="1.2"/>
            <path d="M12 11v5M12 8.5v.5" stroke="#5d697f" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <p className="dr-note-text">電費會在每日凌晨 00:00:00 時計算前一日的使用度數，並進行扣款。</p>
        </div>
      </div>
    </div>
  )
}

function DepositDetailPage({ record, onBack }) {
  const rows1 = [
    { label: '項目',   value: '電表儲值' },
    { label: '房源',   value: '台北套房・101' },
    { label: '電表儲值', value: `$${record.amount.toLocaleString()}` },
    { label: '繳費期限', value: '2025/05/07' },
    { label: '計費週期', value: '2025/04/08 - 2025/05/07' },
    { label: '收款日',  value: '2025/05/07' },
  ]
  const rows2 = [
    { label: '匯款日期',  value: record.date },
    { label: '帳號後五碼', value: '12345' },
    { label: '匯款金額',  value: `$${record.amount.toLocaleString()}` },
    { label: '狀態',     value: '確認已收', green: true },
  ]

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">帳單細節</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="dd-body">
        <div className="dd-table">
          {rows1.map(({ label, value }) => (
            <div key={label} className="dd-cell">
              <span className="dd-cell-label">{label}</span>
              <span className="dd-cell-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="dd-section-title">繳費資料</div>
        <div className="dd-table">
          {rows2.map(({ label, value, green }) => (
            <div key={label} className="dd-cell">
              <span className="dd-cell-label">{label}</span>
              <span className={`dd-cell-value${green ? ' dd-cell-value--green' : ''}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DepositHistoryPage({ onBack }) {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <DepositDetailPage record={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">儲值歷程</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="dh-body">
        {DEPOSIT_HISTORY.map((r, i) => (
          <div key={i} className="dh-row" onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
            <div className="dh-row-content">
              <div className="dh-row-left">
                <span className="dh-row-title">{r.title}</span>
                <span className="dh-row-date">匯款日期：{r.date}</span>
              </div>
              <div className="dh-row-right">
                <span className="dh-row-amount">${r.amount.toLocaleString()}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="dh-divider" />
          </div>
        ))}
      </div>
    </div>
  )
}

function MeterModePage({ onBack, currentMode, onSave }) {
  const [selected, setSelected] = useState(currentMode)
  const modes = [
    { key: '供電', label: '供電模式', desc: '正常使用電力。' },
    { key: '斷電', label: '斷電模式', desc: '切斷電力，無法用電。' },
  ]
  const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="var(--color-primary-blue-main)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">電表模式</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="mmode-body">
        <div className="mi-group">
          {modes.map((m, i) => (
            <div
              key={m.key}
              className={`mmode-row${i < modes.length - 1 ? ' mmode-row--divider' : ''}`}
              onClick={() => setSelected(m.key)}
            >
              <div className="mmode-info">
                <span className="mmode-label">{m.label}</span>
                <span className="mmode-desc">{m.desc}</span>
              </div>
              {selected === m.key && <CheckIcon />}
            </div>
          ))}
        </div>
      </div>
      <div className="mmode-btn-area">
        <button className="mmode-save-btn" onClick={() => onSave(selected)}>儲存</button>
      </div>
    </div>
  )
}

function MeterInfoPage({ onBack, scenario, isLandlord, item }) {
  const [showRecord, setShowRecord] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showDeduction, setShowDeduction] = useState(false)
  const [showBalanceEdit, setShowBalanceEdit] = useState(false)
  const [showMeterName, setShowMeterName] = useState(false)
  const [showModeSelect, setShowModeSelect] = useState(false)
  const [meterMode, setMeterMode] = useState('供電')
  const [paymentAmt, setPaymentAmt] = useState(null)
  const isDeposit = scenario === 0
  const isTraditional = scenario === 2 || scenario === 3 || scenario === 5
  const isVacant = scenario === 4 || scenario === 5

  if (showModeSelect) {
    return <MeterModePage
      onBack={() => setShowModeSelect(false)}
      currentMode={meterMode}
      onSave={(mode) => { setMeterMode(mode); setShowModeSelect(false) }}
    />
  }

  if (showRecord) {
    if (isLandlord && isTraditional) {
      return <MeterDataPage item={item} onBack={() => setShowRecord(false)} scenario={scenario} />
    }
    return <ElecRecordPage scenario={scenario} onBack={() => setShowRecord(false)} />
  }
  if (showHistory) {
    return <DepositHistoryPage onBack={() => setShowHistory(false)} />
  }
  if (showDeduction) {
    return <DeductionRecordPage onBack={() => setShowDeduction(false)} />
  }

  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const InfoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.65, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke="#5d697f" strokeWidth="1.2"/>
      <path d="M12 11v5M12 8.5v.5" stroke="#5d697f" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">電表資訊</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="mi-body">
        {/* 基本資訊 (no section title) */}
        {!isTraditional && (
          <div className="mi-group">
            <div className="mi-row mi-row--divider">
              <span className="mi-label">型號</span>
              <span className="mi-value">AF221</span>
            </div>
            <div className="mi-row">
              <span className="mi-label">連線狀態</span>
              <span className="mi-value">已綁定 – <span className="mi-value--green">連線正常</span></span>
            </div>
          </div>
        )}

        <div className="mi-section-title">電表設備</div>
        <div className="mi-group">
          <div className="mi-row mi-row--divider" style={isLandlord ? { cursor: 'pointer' } : undefined} onClick={isLandlord ? () => setShowMeterName(true) : undefined}>
            <span className="mi-label">電表名稱</span>
            <div className="mi-value-row">
              <span className="mi-value">房間電表</span>
              {isLandlord && <ChevronRight />}
            </div>
          </div>
          <div className="mi-row mi-row--divider">
            <span className="mi-label">房源</span>
            <span className="mi-value">信義套房・101</span>
          </div>
          <div className="mi-row mi-row--divider">
            <span className="mi-label">狀態</span>
            <div className="mi-value-row">
              <span className="mi-value">{isVacant ? '無租約' : '租約中'}</span>
              <InfoIcon />
            </div>
          </div>
          {!isTraditional && (
            <div className="mi-row">
              <span className="mi-label">電表 ID</span>
              <span className="mi-value">12-34-5678-90-1</span>
            </div>
          )}
        </div>

        <div className="mi-section-title">電表運作</div>
        <div className="mi-group">
          <div className="mi-row mi-row--divider">
            <span className="mi-label">目前電表度數</span>
            <span className="mi-value">12342.55</span>
          </div>
          {!isVacant && (
            <div className="mi-row mi-row--divider">
              <span className="mi-label">計價方式</span>
              <span className="mi-value">{isDeposit ? '儲值模式' : isTraditional ? '手動抄表' : '系統抄表'}</span>
            </div>
          )}
          {isDeposit ? (<>
            <div className="mi-row mi-row--divider">
              <span className="mi-label">儲值費率</span>
              <span className="mi-value">每度 $5.5</span>
            </div>
            <div className="mi-row mi-row--divider" style={{ cursor: 'pointer' }} onClick={() => isLandlord ? setShowBalanceEdit(true) : setShowDeposit(true)}>
              <span className="mi-label">儲值餘額</span>
              <div className="mi-value-row">
                <span className="mi-value">$1,200</span>
                <ChevronRight />
              </div>
            </div>
            <div className="mi-row mi-row--divider" style={{ cursor: 'pointer' }} onClick={() => setShowHistory(true)}>
              <span className="mi-label">儲值歷程</span>
              <ChevronRight />
            </div>
            <div className="mi-row" style={{ cursor: 'pointer' }} onClick={() => setShowDeduction(true)}>
              <span className="mi-label">扣款紀錄</span>
              <ChevronRight />
            </div>
          </>) : isVacant ? (<>
            {scenario === 4 && (
              <div className="mi-row" style={{ cursor: 'pointer' }} onClick={() => setShowModeSelect(true)}>
                <span className="mi-label">電表模式</span>
                <div className="mi-value-row">
                  <span className="mi-value">{meterMode}</span>
                  <ChevronRight />
                </div>
              </div>
            )}
          </>) : (<>
            <div className="mi-row mi-row--divider">
              <span className="mi-label">電費</span>
              <span className="mi-value">每度 $5.5</span>
            </div>
            <div className="mi-row mi-row--divider">
              <span className="mi-label">夏季電費</span>
              <span className="mi-value">每度 $6</span>
            </div>
            <div className="mi-row" style={{ cursor: 'pointer' }} onClick={() => setShowRecord(true)}>
              <span className="mi-label">抄表紀錄</span>
              <ChevronRight />
            </div>
          </>)}
        </div>

        {isLandlord && (<>
          {!isTraditional && (<>
            <div className="mi-section-title">保固資訊</div>
            <div className="mi-group">
              <div className="mi-row mi-row--divider">
                <span className="mi-label">保固區域</span>
                <span className="mi-value">TW</span>
              </div>
              <div className="mi-row mi-row--divider">
                <span className="mi-label">保固到期日</span>
                <span className="mi-value">2025/12/30</span>
              </div>
              <div className="mi-row">
                <div className="mi-label-row">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" stroke="#333" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M9 13h6M12 10v6" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="mi-label">購買保固</span>
                </div>
                <ChevronRight />
              </div>
            </div>

            <div className="mi-note">
              <InfoIcon />
              <span className="mi-note-text">若您的保固尚未過期，才能購買保固。</span>
            </div>
          </>)}

          <div className="mi-btn-area">
            {!isTraditional && <button className="mi-btn mi-btn--outline">更換電表</button>}
            <button className="mi-btn mi-btn--grey">變更計價方式</button>
          </div>
        </>)}
      </div>
      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} onPay={(amt) => { setPaymentAmt(amt); setShowDeposit(false); setShowPayment(true) }} />}
      {showPayment && <PaymentModal amount={paymentAmt} onClose={() => setShowPayment(false)} />}
      {showBalanceEdit && <BalanceEditModal onClose={() => setShowBalanceEdit(false)} />}
      {showMeterName && <MeterNameModal onClose={() => setShowMeterName(false)} />}
    </div>
  )
}

function MHMeterPage({ onBack, scenario, isLandlord }) {
  const [activeTab, setActiveTab] = useState(0)
  const [showMeterInfo, setShowMeterInfo] = useState(false)
  const tabs = ['當日', '當週', '當月', '年']

  if (showMeterInfo) {
    return <MeterInfoPage scenario={scenario} isLandlord={isLandlord} onBack={() => setShowMeterInfo(false)} />
  }

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">MH 電表</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="mh-body">
        {/* 電量分析 */}
        <div className="mh-card mh-analysis-card">
          <img src={imgCardBg} alt="" className="mh-card-bg" />
          <div className="mh-card-title-row">
            <img src={icRentHouse} alt="" width={30} height={30} />
            <span className="mh-card-label">電量分析</span>
          </div>
          <div className="mh-stats-row">
            <div className="mh-stat-col">
              <span className="mh-stat-value">20.02</span>
              <span className="mh-stat-label">每日平均用電</span>
            </div>
            <div className="mh-stat-col">
              <span className="mh-stat-value">900.21</span>
              <span className="mh-stat-label">每月平均用電</span>
            </div>
            <div className="mh-stat-col">
              <span className="mh-stat-value">892.22</span>
              <span className="mh-stat-label">上期用電</span>
            </div>
          </div>
        </div>

        {/* 用電總量 */}
        <div className="mh-card mh-usage-card">
          <div className="mh-usage-header">
            <div className="mh-usage-title-row">
              <img src={icRentDoc} alt="" width={30} height={30} />
              <span className="mh-card-label">用電總量</span>
              <div className="mh-date-chip">
                <span className="mh-date-text">2025/06/26</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="#2e739e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="mh-amount-row">
              <span className="mh-amount">2.42</span>
              <span className="mh-amount-suffix">度 / 約 10 元</span>
            </div>
          </div>

          <div className="mh-tabs">
            {tabs.map((tab, i) => (
              <button key={tab} className={`mh-tab${activeTab === i ? ' mh-tab--active' : ''}`} onClick={() => setActiveTab(i)}>{tab}</button>
            ))}
          </div>

          <div className="mh-divider" />

          {/* Chart */}
          <div className="mh-chart-wrap">
            <div className="mh-chart-left">
              <div className="mh-y-labels">
                {[105, 90, 75, 60, 45, 30, 15, 0].map(v => (
                  <span key={v} className="mh-y-label">{v}</span>
                ))}
              </div>
              <span className="mh-y-title">電度</span>
            </div>
            <div className="mh-chart-right">
              <svg className="mh-chart-svg" viewBox="0 0 272 140" preserveAspectRatio="none" fill="none">
                {[0, 20, 40, 60, 80, 100, 120, 140].map(y => (
                  <line key={y} x1="0" y1={y} x2="272" y2={y} stroke="#e8e8e8" strokeWidth="0.5"/>
                ))}
                <path
                  d="M0,118 C12,112 22,90 40,72 C58,54 72,48 100,32 C120,20 142,14 160,10 C176,6 188,15 210,30 C228,43 252,58 272,68 L272,140 L0,140 Z"
                  fill="rgba(58,110,165,0.12)"
                />
                <path
                  d="M0,118 C12,112 22,90 40,72 C58,54 72,48 100,32 C120,20 142,14 160,10 C176,6 188,15 210,30 C228,43 252,58 272,68"
                  stroke="#3a6ea5"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="mh-x-labels">
                {['16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'].map(t => (
                  <span key={t} className="mh-x-label">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* High / Low cards */}
          <div className="mh-time-cards">
            <div className="mh-time-card">
              <div className="mh-time-card-top">
                <img src={icRentFire} alt="" width={12} height={12} />
                <span className="mh-time-card-lbl">最高用電時段</span>
              </div>
              <span className="mh-time-card-val">18:00~18:15</span>
            </div>
            <div className="mh-time-card">
              <div className="mh-time-card-top">
                <img src={icRentIce} alt="" width={12} height={12} />
                <span className="mh-time-card-lbl">最低用電時段</span>
              </div>
              <span className="mh-time-card-val">05:15~05:30</span>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="mh-bottom-card">
          <button className="mh-bottom-btn" onClick={() => setShowMeterInfo(true)}>
            <img src={icRentElectric} alt="" width={24} height={24} />
            <span className="mh-bottom-label">電表資訊</span>
          </button>
          <button className="mh-bottom-btn">
            <img src={icRentBill} alt="" width={24} height={24} />
            <span className="mh-bottom-label">進階比較</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function ElecRecordPage({ scenario, onBack }) {
  const [selected, setSelected] = useState(null)
  const hasDetail = scenario === 3

  if (scenario === 0) {
    return <MHMeterPage scenario={scenario} onBack={onBack} />
  }

  if (hasDetail && selected) {
    return <ElecDetailPage record={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">用電紀錄</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="elec-body">
        <div className="elec-year-label">2024</div>
        <div className="elec-list">
          {ELEC_RECORDS.map(({ date, reading }, i) => (
            <div
              key={date}
              className={`elec-row${hasDetail ? ' elec-row--clickable' : ''}${i < ELEC_RECORDS.length - 1 ? ' elec-row--divider' : ''}`}
              onClick={hasDetail ? () => setSelected({ date, reading }) : undefined}
            >
              <span className="elec-row-date">{date}</span>
              <div className="elec-row-right">
                <span className="elec-row-reading">{reading} 度</span>
                {hasDetail && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Meter Data Page (抄表資料) ───────────────────────────────────────────────

function ManualReadingSheet({ lastDate, prevReading, onClose, onSubmit }) {
  const [reading, setReading] = useState('')
  const [showErrorToast, setShowErrorToast] = useState(false)

  const handleSubmit = () => {
    if (!reading) return
    if (Number(reading) < Number(prevReading)) {
      setShowErrorToast(true)
      setTimeout(() => setShowErrorToast(false), 2500)
      return
    }
    onSubmit(reading)
  }

  return (
    <div className="mdr-overlay" onClick={onClose}>
      <div className="mdr-sheet" onClick={e => e.stopPropagation()}>
        <div className="mdr-handle" />
        <div className="mdr-content">
          <p className="mdr-title">電表抄表</p>
          <div className="mdr-field">
            <div className="mdr-field-label-row">
              <span className="mdr-field-label">本期電表度數*</span>
              <span className="mdr-field-hint">上次抄表日期：{lastDate}</span>
            </div>
            <div className="mdr-input-box">
              <input
                className="mdr-input"
                value={reading}
                onChange={e => setReading(e.target.value.replace(/\D/g, ''))}
                placeholder={`上次抄表度數 ${prevReading}`}
                inputMode="numeric"
              />
              <span className="mdr-input-unit">度</span>
            </div>
          </div>
          <button
            className={`mdr-submit-btn${reading ? '' : ' mdr-submit-btn--disabled'}`}
            disabled={!reading}
            onClick={handleSubmit}
          >上傳度數</button>
        </div>
        {showErrorToast && <div className="toast toast--error">不可小於前期抄表度數</div>}
      </div>
    </div>
  )
}

function MeterDataPage({ item, onBack, scenario }) {
  const [selected,          setSelected]          = useState(null)
  const [showReminder,      setShowReminder]      = useState(false)
  const [showToast,         setShowToast]         = useState(false)
  const [showReadingSheet,  setShowReadingSheet]  = useState(false)
  const [uploadedReading,   setUploadedReading]   = useState(null)

  const isLandlordManual = scenario === 2
  const hasDetail = !isLandlordManual

  const handleReminderConfirm = () => {
    setShowReminder(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  if (hasDetail && selected) {
    return <ElecDetailPage record={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="elec-page">
      <StatusBar />
      <div className="elec-header">
        <button className="elec-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="elec-title">抄表資料</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="elec-body md-body">
        <div className="elec-year-label">2024</div>
        <div className="elec-list">
          {ELEC_RECORDS.map(({ date, reading }, i) => {
            const isFailed = isLandlordManual && i === 0
            const showFailed = isFailed && !uploadedReading
            return (
              <div
                key={date}
                className={`elec-row elec-row--divider${hasDetail || showFailed ? ' elec-row--clickable' : ''}`}
                onClick={
                  showFailed ? () => setShowReadingSheet(true) :
                  hasDetail ? () => setSelected({ date, reading }) :
                  undefined
                }
              >
                <span className="elec-row-date">{date}</span>
                <div className="elec-row-right">
                  {showFailed ? (<>
                    <span className="elec-row-reading elec-row-reading--failed">抄表失敗</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>) : isFailed ? (<>
                    <span className="elec-row-reading">{uploadedReading} 度</span>
                  </>) : (<>
                    <span className="elec-row-reading">{reading} 度</span>
                    {hasDetail && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6l6 6-6 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!isLandlordManual && (
        <div className="md-btn-area">
          <button className="md-btn-outline" onClick={() => setShowReminder(true)}>抄表提醒</button>
        </div>
      )}

      {showReminder && (
        <div className="md-reminder-overlay">
          <div className="md-reminder-card">
            <p className="md-reminder-title">抄表提醒</p>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="7" y="10" width="46" height="37" rx="2" fill="#bccbe0" opacity="0.4"/>
              <rect x="10" y="13" width="40" height="31" rx="2" fill="white"/>
              <rect x="15" y="18" width="18" height="10" rx="1" fill="#d6d6f4"/>
              <circle cx="19" cy="28" r="4" fill="#c8d4e8"/>
              <path d="M28 38 L38 24 L48 38 Z" fill="#c8d4e8" opacity="0.7"/>
            </svg>
            <p className="md-reminder-sub">是否要提醒所有的租客？</p>
            <div className="md-reminder-btns">
              <button className="md-reminder-btn" onClick={handleReminderConfirm}>僅提醒此租客</button>
              <button className="md-reminder-btn" onClick={handleReminderConfirm}>提醒所有租客</button>
            </div>
          </div>
          <button className="md-reminder-close" onClick={() => setShowReminder(false)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
      {showToast && <Toast message="已發送抄表提醒！" />}
      {showReadingSheet && (
        <ManualReadingSheet
          lastDate={ELEC_RECORDS[1]?.date ?? ''}
          prevReading={ELEC_RECORDS[1]?.reading ?? ''}
          onClose={() => setShowReadingSheet(false)}
          onSubmit={(val) => { setUploadedReading(val); setShowReadingSheet(false) }}
        />
      )}
    </div>
  )
}

// ─── Landlord Home ──────────────────────────────────────────────────────────

const MENU_ITEMS = [
  '房源管理', '租賃合約', '帳單列表', '訂金',
  '押金', '退租單', '修繕單', '電子鎖清單', '電表清單', '租客列表',
]

function LandlordSideMenu({ open, onClose, onMenuSelect }) {
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
          <span className="ll-side-username">王大大</span>
        </div>
        <div className="ll-side-divider" />
        <div className="ll-side-list">
          {MENU_ITEMS.map(item => (
            <button key={item} className="ll-side-item" onClick={() => { onMenuSelect?.(item); onClose() }}>{item}</button>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Meter List Page ──────────────────────────────────────────────────────────

const METER_GROUPS = [
  { property: '台北套房', items: [
    { room: '101', tenant: '奇爾查克', sub: '退租日：2025/03/08', tag: null,  traditionalTag: '租客抄表', alertTag: '上月未抄表', prevReading: 12389 },
    { room: '102', tenant: null,       sub: '空置',               tag: null,  traditionalTag: null,       alertTag: null,         prevReading: 11823 },
    { room: '103', tenant: '先西',     sub: '即將搬入',           tag: null,  traditionalTag: '租客抄表', alertTag: null,         prevReading: 10274 },
    { room: '104', tenant: null,       sub: '空置',               tag: null,  traditionalTag: null,       alertTag: null,         prevReading: 9851  },
    { room: '105', tenant: '瑪露希爾', sub: '退租日：2025/03/08', tag: 'New', traditionalTag: '房東抄表', alertTag: null,         prevReading: 13102 },
  ]},
  { property: '桃園套房', items: [
    { room: '101', tenant: '小李',   sub: '退租日：2025/03/08', tag: null, traditionalTag: '租客抄表', prevReading: 8834 },
    { room: '102', tenant: '自來也', sub: '退租日：2025/03/08', tag: null, traditionalTag: '房東抄表', prevReading: 9271 },
  ]},
  { property: '台中套房', items: [
    { room: '201', tenant: '陳大文', sub: '退租日：2025/06/30', tag: null, traditionalTag: '租客抄表', prevReading: 14502 },
  ]},
  { property: '台東民宿', items: [
    { room: 'A01', tenant: '林小花', sub: '退租日：2025/05/15', tag: 'New', traditionalTag: '租客抄表', prevReading: 7643 },
    { room: 'A02', tenant: null,     sub: '空置',               tag: null,  traditionalTag: null,       prevReading: 6218 },
  ]},
]

function MeterSortModal({ groups, visible, onToggleVisible, onReorderAll, onClose }) {
  const [order, setOrder] = useState(() => groups.map((_, i) => i))
  const [drag, setDrag]   = useState(null)
  const itemRefs = useRef({})
  const dragRef  = useRef(null)
  const orderRef = useRef(order)
  dragRef.current  = drag
  orderRef.current = order

  const startDrag = (e, origIdx) => {
    e.preventDefault()
    e.stopPropagation()
    const el = itemRefs.current[origIdx]
    if (!el) return
    const rect = el.getBoundingClientRect()
    setDrag({
      origIdx,
      placeholderIdx: orderRef.current.indexOf(origIdx),
      ghostTop:   rect.top,
      ghostLeft:  rect.left,
      offsetY:    e.clientY - rect.top,
      offsetX:    e.clientX - rect.left,
      itemHeight: rect.height,
      itemWidth:  rect.width,
    })
  }

  useEffect(() => {
    if (!drag) return
    const onMove = (e) => {
      const d = dragRef.current
      if (!d) return
      const restOrder = orderRef.current.filter(i => i !== d.origIdx)
      let newIdx = restOrder.length
      for (let di = 0; di < restOrder.length; di++) {
        const el = itemRefs.current[restOrder[di]]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (e.clientY < rect.top + rect.height / 2) { newIdx = di; break }
      }
      setDrag(prev => prev ? { ...prev, placeholderIdx: newIdx, ghostTop: e.clientY - prev.offsetY, ghostLeft: e.clientX - prev.offsetX } : null)
    }
    const onUp = () => {
      const d = dragRef.current
      if (d) {
        const rest = orderRef.current.filter(i => i !== d.origIdx)
        rest.splice(d.placeholderIdx, 0, d.origIdx)
        onReorderAll(rest)
        setOrder(rest)
      }
      setDrag(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
  }, [!!drag])

  const restOrder   = drag ? order.filter(i => i !== drag.origIdx) : order
  const displayList = [...restOrder]
  if (drag) displayList.splice(drag.placeholderIdx, 0, null)

  return (
    <div className="sort-overlay" onClick={drag ? undefined : onClose}>
      <div className="sort-sheet" onClick={e => e.stopPropagation()}>
        <div className="sort-handle"/>
        <div className="sort-title">房源群組</div>
        <div className="sort-list">
          <div className="sort-item">
            <span className="sort-item-name sort-item-name--active">全部</span>
          </div>
          {displayList.map((origIdx, di) => {
            if (origIdx === null) {
              return <div key="__placeholder__" className="sort-item sort-item--placeholder" style={{ height: drag.itemHeight }}/>
            }
            const g = groups[origIdx]
            return (
              <div key={g.property} ref={el => { itemRefs.current[origIdx] = el }} className="sort-item">
                <span className="sort-item-name">{g.property}</span>
                <div className="sort-item-icons">
                  <button className="sort-eye-btn" onClick={() => onToggleVisible(origIdx)}>
                    <img src={visible[origIdx] ? icEyeOpen : icEyeClose} alt="" width={24} height={24}/>
                  </button>
                  <img src={icBurger} alt="" width={24} height={24} className="sort-drag-handle"
                    onPointerDown={e => startDrag(e, origIdx)}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {drag && (
        <div className="sort-item sort-item--ghost" style={{ left: drag.ghostLeft, width: drag.itemWidth, top: drag.ghostTop }}>
          <span className="sort-item-name">{groups[drag.origIdx].property}</span>
          <div className="sort-item-icons">
            <button className="sort-eye-btn">
              <img src={visible[drag.origIdx] ? icEyeOpen : icEyeClose} alt="" width={24} height={24}/>
            </button>
            <img src={icBurger} alt="" width={24} height={24} className="sort-drag-handle"/>
          </div>
        </div>
      )}
    </div>
  )
}

function ManualMeterPage({ onBack, onConfirm }) {
  const [readings, setReadings] = useState(() => {
    const map = {}
    METER_GROUPS.forEach(g => g.items.forEach(item => { map[`${g.property}-${item.room}`] = '' }))
    return map
  })
  const [collapsed,    setCollapsed]    = useState({})
  const [showConfirm,  setShowConfirm]  = useState(false)

  const toggle = (property) => setCollapsed(prev => ({ ...prev, [property]: !prev[property] }))
  const setReading = (key, val) => setReadings(prev => ({ ...prev, [key]: val.replace(/[^\d]/g, '') }))

  return (
    <div className="mm-page">
      <StatusBar />
      <div className="mm-header">
        <button className="mm-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="mm-title">電費抄表</span>
        <button className="mm-save-btn" onClick={() => setShowConfirm(true)}>儲存</button>
      </div>

      <div className="mm-info-bar">
        <img src={icRentDoc} alt="" width={30} height={30}/>
        <span className="mm-info-text">上次抄表：2025/06/05</span>
      </div>

      <div className="mm-body">
        {METER_GROUPS.map((group, gi) => (
          <div key={group.property}>
            {gi > 0 && <div className="mm-group-divider"/>}
            <div className="mm-property-row" onClick={() => toggle(group.property)}>
              <img src={imgPropertyDefault} alt="" className="mm-property-photo"/>
              <div className="mm-property-info">
                <span className="mm-property-name">{group.property}</span>
                <span className="mm-property-addr">台北市中山區中山路467巷172號2樓</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                style={{ transform: collapsed[group.property] ? 'rotate(0deg)' : 'rotate(180deg)', flexShrink: 0 }}>
                <path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {!collapsed[group.property] && (
              <div className="mm-room-table">
                {group.items.map((item, ri) => {
                  const key = `${group.property}-${item.room}`
                  return (
                    <div key={item.room} className={`mm-room-row${ri === 0 ? ' mm-room-row--first' : ''}`}>
                      <span className="mm-room-name">{item.room}</span>
                      <input
                        className="mm-room-input"
                        inputMode="numeric"
                        placeholder={`前期度數 ${item.prevReading}`}
                        value={readings[key]}
                        onChange={e => setReading(key, e.target.value)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className="ios-alert-overlay" onClick={e => e.stopPropagation()}>
          <div className="ios-alert">
            <div className="ios-alert-title">確定抄表資料正確嗎？</div>
            <div className="ios-alert-body">抄表資料確認後，系統將對照上期電表度數，生成電費帳單。</div>
            <div className="ios-alert-divider"/>
            <div className="ios-alert-btns">
              <button className="ios-alert-btn" onClick={() => setShowConfirm(false)}>取消</button>
              <div className="ios-alert-btn-divider"/>
              <button className="ios-alert-btn ios-alert-btn--primary" onClick={onConfirm}>確認資料正確</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MeterListPage({ onBack, scenario, onSelectView, onUpdateScenario }) {
  const [activeTab,    setActiveTab]    = useState(0)
  const [showSort,     setShowSort]     = useState(false)
  const [groupOrder,   setGroupOrder]   = useState(() => METER_GROUPS.map((_, i) => i))
  const [groupVisible, setGroupVisible] = useState(() => METER_GROUPS.map(() => true))
  const [selectedItem,    setSelectedItem]    = useState(null)
  const [showAddModal,    setShowAddModal]    = useState(false)
  const [showManualMeter, setShowManualMeter] = useState(false)
  const [showToast,       setShowToast]       = useState(false)
  const [segment,         setSegment]         = useState(0)
  const tabsRef = useRef(null)

  const handleManualConfirm = () => {
    setShowManualMeter(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  if (selectedItem) {
    if (segment === 0 && !selectedItem.tenant) {
      onUpdateScenario?.(4, 'landlord')
      return <MHMeterPage scenario={4} isLandlord={true} onBack={() => setSelectedItem(null)} />
    }
    if (segment === 0 && selectedItem.tenant) {
      return <MeterInfoPage scenario={1} isLandlord={true} onBack={() => setSelectedItem(null)} />
    }
    if (segment === 1) {
      if (!selectedItem.tenant) {
        return <MeterInfoPage scenario={5} isLandlord={true} item={selectedItem} onBack={() => setSelectedItem(null)} />
      }
      const tradScenario = selectedItem.traditionalTag === '房東抄表' ? 2 : 3
      return <MeterInfoPage scenario={tradScenario} isLandlord={true} item={selectedItem} onBack={() => setSelectedItem(null)} />
    }
    if (scenario === 0 || scenario === 1) {
      return <MeterInfoPage scenario={scenario} isLandlord={scenario === 0} onBack={() => setSelectedItem(null)} />
    }
    if (scenario === 2 || scenario === 3) {
      return <MeterInfoPage scenario={scenario} isLandlord={true} item={selectedItem} onBack={() => setSelectedItem(null)} />
    }
    return <MeterDataPage item={selectedItem} onBack={() => setSelectedItem(null)} scenario={scenario} />
  }
  if (showManualMeter) {
    return <ManualMeterPage onBack={() => setShowManualMeter(false)} onConfirm={handleManualConfirm} />
  }

  const visibleOrdered = groupOrder.filter(i => groupVisible[i])
  const tabs = ['全部', ...visibleOrdered.map(i => METER_GROUPS[i].property)]

  const displayGroups = activeTab === 0
    ? visibleOrdered.map(i => METER_GROUPS[i])
    : [METER_GROUPS[visibleOrdered[activeTab - 1]]].filter(Boolean)

  const handleReorderAll = (newOrder) => {
    setGroupOrder(newOrder)
    setActiveTab(0)
  }
  const toggleVisible = (origIdx) => {
    setGroupVisible(prev => { const n = [...prev]; n[origIdx] = !n[origIdx]; return n })
    setActiveTab(0)
  }

  return (
    <div className="ml-page">
      <StatusBar />
      <div className="ml-header">
        <button className="ll-icon-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="ml-title">電表清單</span>
        <div className="ml-header-actions">
          <button className="ll-icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.5" stroke="#333" strokeWidth="1.5"/>
              <path d="M16 16l3.5 3.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="ll-icon-btn" onClick={segment === 0 && scenario === 2 ? () => setShowAddModal(true) : undefined}>
            <img src={segment === 0 ? icAdd : icTutorial02} alt={segment === 0 ? '新增' : '說明'} width={24} height={24}/>
          </button>
        </div>
      </div>

      {/* Segment control */}
      <div className="ml-segment-wrap">
        <div className="ml-segment">
          <button className={`ml-segment-btn${segment === 0 ? ' ml-segment-btn--active' : ''}`} onClick={() => { setSegment(0); onUpdateScenario?.(0, 'landlord') }}>MH 電表</button>
          <button className={`ml-segment-btn${segment === 1 ? ' ml-segment-btn--active' : ''}`} onClick={() => { setSegment(1); onUpdateScenario?.(2, 'landlord') }}>傳統電表</button>
        </div>
      </div>

      {/* Tabs row */}
      <div className="ml-tabs-row">
        <div className="ml-tabs-scroll" ref={tabsRef}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`ml-tab${activeTab === i ? ' ml-tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >{tab}</button>
          ))}
        </div>
        <button className="ml-sort-arrow" onClick={() => setShowSort(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* List */}
      <div className="ml-body">
        {displayGroups.map(group => (
          <div key={group.property}>
            <div className="ml-section-header">{group.property}</div>
            <div className="ml-group">
              {group.items.map((item, i) => (
                <div key={i} className="ml-row" onClick={() => {
                  if (segment === 0 && item.tenant) onUpdateScenario?.(1, 'landlord')
                  if (segment === 1) {
                    const ts = !item.tenant ? 5 : item.traditionalTag === '房東抄表' ? 2 : 3
                    onUpdateScenario?.(ts, 'landlord')
                  }
                  setSelectedItem(item)
                }}>
                  <div className="ml-row-info">
                    <span className="ml-row-name">
                      {item.room}{item.tenant ? `・${item.tenant}` : ''}
                    </span>
                    <span className="ml-row-sub">{item.sub}</span>
                    <div className="ml-tag-row">
                      {segment === 1 && item.alertTag && <span className="ml-tag ml-tag--error">{item.alertTag}</span>}
                      {segment === 0 && item.tag && <span className="ml-tag">{item.tag}</span>}
                      {segment === 1 && item.traditionalTag && (
                        <span className={`ml-tag ${item.traditionalTag === '租客抄表' ? 'ml-tag--blue' : 'ml-tag--orange'}`}>{item.traditionalTag}</span>
                      )}
                    </div>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSort && (
        <MeterSortModal
          groups={METER_GROUPS}
          visible={groupVisible}
          onToggleVisible={toggleVisible}
          onReorderAll={handleReorderAll}
          onClose={() => setShowSort(false)}
        />
      )}

      {showAddModal && (
        <div className="md-reminder-overlay" onClick={() => setShowAddModal(false)}>
          <div className="md-reminder-card" onClick={e => e.stopPropagation()}>
            <p className="md-reminder-title">電表操作</p>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="7" y="10" width="46" height="37" rx="2" fill="#bccbe0" opacity="0.4"/>
              <rect x="10" y="13" width="40" height="31" rx="2" fill="white"/>
              <rect x="15" y="18" width="18" height="10" rx="1" fill="#d6d6f4"/>
              <circle cx="19" cy="28" r="4" fill="#c8d4e8"/>
              <path d="M28 38 L38 24 L48 38 Z" fill="#c8d4e8" opacity="0.7"/>
            </svg>
            <p className="md-reminder-sub">請選擇要綁定 MH 電表 (可用於儲值和系統自動抄表)，或是要進行傳統電表的手動抄表。</p>
            <div className="md-reminder-btns">
              <button className="md-reminder-btn" onClick={() => setShowAddModal(false)}>綁定 MH 電表</button>
              <button className="md-reminder-btn" onClick={() => { setShowAddModal(false); setShowManualMeter(true) }}>手動抄表</button>
            </div>
          </div>
          <button className="md-reminder-close" onClick={() => setShowAddModal(false)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
      {showToast && <Toast message="已發送電費帳單" />}
    </div>
  )
}

const LL_SHORTCUTS = [
  { key: 'contract', icon: icHomeContract, label: '待辦租約', count: 14256 },
  { key: 'rent',     icon: icHomeRent,     label: '待收帳單', count: 33102 },
  { key: 'deposit',  icon: icHomeDeposit,  label: '訂金',     count: 2     },
  { key: 'fix',      icon: icHomeFix,      label: '修繕單',   count: 38    },
]
const LL_PROP_STATS = [
  { value: 12000, label: '出租中' },
  { value: 200,   label: '空置' },
  { value: 2,     label: '即將搬入' },
  { value: 1,     label: '租約屆期' },
]
const LL_TABS = [
  { label: '首頁',   on: icTabHome,         off: icTabHomeUnfocus     },
  { label: '訊息',   on: icTabMessage,      off: icTabMessage         },
  { label: '佈告欄', on: icTabNotification, off: icTabNotification    },
  { label: '我的',   on: icTabSetting,      off: icTabSetting         },
]

function LandlordHomePage({ scenario, onSelectView, onUpdateScenario }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showMeterList, setShowMeterList] = useState(false)

  return (
    <div className="ll-page">
      <StatusBar />
      <div className="ll-topbar">
        <button className="ll-icon-btn" onClick={() => setShowMenu(true)}>
          <img src={icBurger} alt="選單" width={24} height={24} />
        </button>
        <span className="ll-page-title" />
        <button className="ll-icon-btn">
          <img src={icAdd} alt="新增" width={24} height={24} />
        </button>
      </div>

      <div className="ll-scroll">
        {/* 本月收入 */}
        <div className="ll-info-card">
          <img src={imgCardBg} alt="" className="ll-card-bg" />
          <div className="ll-card-title-row">
            <img src={icRentDoc} alt="" width={30} height={30} />
            <span className="ll-card-label">本月收入</span>
          </div>
          <div className="ll-card-amount">
            <span className="ll-card-currency">TWD</span>
            <span className="ll-card-value">$880,000,000,000</span>
          </div>
        </div>

        {/* 房源狀態 */}
        <div className="ll-info-card">
          <img src={imgCardBg} alt="" className="ll-card-bg" />
          <div className="ll-card-title-row">
            <img src={icRentHouse} alt="" width={30} height={30} />
            <span className="ll-card-label">房源狀態</span>
          </div>
          <div className="ll-prop-stats">
            {LL_PROP_STATS.map(s => (
              <div key={s.label} className="ll-prop-col">
                <span className="ll-prop-val">{s.value}</span>
                <span className="ll-prop-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 捷徑 */}
        <div className="ll-shortcut-grid">
          {LL_SHORTCUTS.map(s => (
            <button key={s.key} className="ll-shortcut-card">
              <img src={s.icon} alt={s.label} className="ll-shortcut-icon" />
              <div className="ll-shortcut-text">
                <span className="ll-shortcut-name">{s.label}</span>
                <span className="ll-shortcut-count">({s.count})</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="ll-tabbar">
        {LL_TABS.map(({ label, on, off }, i) => (
          <div key={label} className="ll-tab">
            <img src={i === 0 ? on : off} alt={label} width={24} height={24} />
            <span className="ll-tab-label" style={{ color: i === 0 ? 'var(--color-primary-blue-main)' : 'var(--color-text-unfocus)' }}>{label}</span>
          </div>
        ))}
        <div className="th-home-indicator" />
      </div>

      <LandlordSideMenu
        open={showMenu}
        onClose={() => setShowMenu(false)}
        onMenuSelect={item => { if (item === '電表清單') setShowMeterList(true) }}
      />
      {showMeterList && <MeterListPage onBack={() => setShowMeterList(false)} scenario={scenario} onSelectView={onSelectView} onUpdateScenario={onUpdateScenario} />}
    </div>
  )
}

// ─── Dialogs ─────────────────────────────────────────────────────────────────

function ConfirmUploadDialog({ property, room, reading, onCancel, onConfirm }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-card" onClick={e => e.stopPropagation()}>
        <p className="confirm-title">確定要上傳度數？</p>
        <p className="confirm-body">
          將送出「{property}・{room}」的電表抄表資料，本次抄表度數為 {reading}，上傳前請確定資料是否正確。
        </p>
        <div className="confirm-actions">
          <button className="confirm-btn confirm-btn--cancel" onClick={onCancel}>取消</button>
          <button className="confirm-btn confirm-btn--confirm" onClick={onConfirm}>上傳</button>
        </div>
      </div>
    </div>
  )
}

function PhotoPickerDialog({ onClose }) {
  return (
    <div className="photo-dialog-overlay" onClick={onClose}>
      <div className="photo-dialog-content" onClick={e => e.stopPropagation()}>
        <div className="photo-dialog-card">
          <div className="photo-dialog-text">
            <p className="photo-dialog-title">上傳照片</p>
            <div className="photo-dialog-img">
              <img src={imgPopupPhoto} alt="" width="60" height="60" />
            </div>
            <p className="photo-dialog-desc">請選擇照片來源，系統將會為您辨識相片中的數字。</p>
          </div>
          <div className="photo-dialog-btns">
            <button className="photo-dialog-btn">使用相機拍攝</button>
            <button className="photo-dialog-btn">從相簿選取</button>
          </div>
        </div>
        <button className="photo-dialog-close" onClick={onClose}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function PaymentModal({ amount, onClose }) {
  const dateRef = useRef(null)
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`
  const [date, setDate] = useState(todayStr)
  const [lastFive, setLastFive] = useState('')
  const [toast, setToast] = useState('')

  const canSubmit = date && lastFive.length === 5
  const fmtDate = d => d ? d.replace(/-/g, '/') : ''
  const openPicker = () => {
    try { dateRef.current?.showPicker() } catch { dateRef.current?.click() }
  }
  const handleCopy = () => {
    navigator.clipboard?.writeText('112233445566').catch(() => {})
    setToast('已複製！')
    setTimeout(() => setToast(''), 1500)
  }
  const handleSubmit = () => {
    setToast('已通知匯款！')
    setTimeout(() => { setToast(''); onClose() }, 2000)
  }

  return (
    <div className="meter-overlay" onClick={onClose}>
      <div className="meter-sheet pay-sheet" onClick={e => e.stopPropagation()}>
        <div className="meter-drag-indicator" />
        <p className="pay-title">繳費細節</p>

        {/* 銀行 */}
        <div className="pay-info-field">
          <span className="pay-info-label">銀行</span>
          <span className="pay-info-value--h2">中國信託 812</span>
        </div>

        {/* 帳戶號碼 */}
        <div className="pay-info-field">
          <span className="pay-info-label">帳戶號碼</span>
          <div className="pay-account-row">
            <span className="pay-info-value--h2">112233445566</span>
            <button className="pay-copy-icon" onClick={handleCopy}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="10" height="10" rx="2" stroke="#5d697f" strokeWidth="1.5"/>
                <path d="M15 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h2" stroke="#5d697f" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 金額 */}
        <div className="pay-info-field">
          <span className="pay-info-label">金額</span>
          <span className="pay-info-value--h1">$ {amount?.toLocaleString()}</span>
          <div className="pay-detail-box">
            <p className="pay-detail-title">電表儲值</p>
            <p className="pay-detail-fee">費用：${amount?.toLocaleString()}</p>
          </div>
        </div>

        {/* 匯款日期 */}
        <div className="pay-field">
          <span className="pay-field-label">匯款日期*</span>
          <div className="pay-input-wrap pay-input-wrap--select" onClick={openPicker}>
            <input ref={dateRef} type="date" className="pay-date-hidden" value={date} onChange={e => setDate(e.target.value)} />
            <span className="pay-input-text" style={{ color: date ? 'var(--color-text-main)' : 'var(--color-text-placeholder)' }}>
              {date ? fmtDate(date) : ''}
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 帳號後五碼 */}
        <div className="pay-field">
          <span className="pay-field-label">帳號後五碼*</span>
          <div className="pay-input-wrap">
            <input
              className="pay-input"
              inputMode="numeric"
              maxLength={5}
              value={lastFive}
              onChange={e => setLastFive(e.target.value.replace(/\D/g, '').slice(0, 5))}
            />
          </div>
        </div>

        <button
          className="pay-confirm-btn"
          style={{ opacity: canSubmit ? 1 : 0.45 }}
          onClick={canSubmit ? handleSubmit : undefined}
        >通知已匯款</button>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function MeterNameModal({ onClose }) {
  const [name, setName] = useState('房間電表')
  const canSave = name.trim().length > 0

  return (
    <div className="meter-overlay" onClick={onClose}>
      <div className="meter-sheet mn-sheet" onClick={e => e.stopPropagation()}>
        <div className="meter-drag-indicator" />
        <p className="mn-title">編輯電表名稱</p>

        <div className="mn-field">
          <div className="mn-field-top">
            <span />
            <span className="mn-char-count">{name.length}/20</span>
          </div>
          <div className={`mn-input-wrap${canSave ? ' mn-input-wrap--active' : ''}`}>
            <input
              className="mn-input"
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <button
          className="mn-save-btn"
          style={{ opacity: canSave ? 1 : 0.45 }}
          onClick={canSave ? onClose : undefined}
        >儲存</button>
      </div>
    </div>
  )
}

function BalanceEditModal({ onClose }) {
  const CURRENT_BALANCE = 20
  const RATE = 5
  const [addAmt, setAddAmt] = useState('')

  const parsed = parseInt(addAmt, 10)
  const afterBalance = !isNaN(parsed) && parsed > 0 ? CURRENT_BALANCE + parsed : CURRENT_BALANCE
  const usable = Math.floor(afterBalance / RATE)
  const canSave = !isNaN(parsed) && parsed > 0

  return (
    <div className="meter-overlay" onClick={onClose}>
      <div className="meter-sheet bal-sheet" onClick={e => e.stopPropagation()}>
        <div className="meter-drag-indicator" />
        <p className="bal-title">變更儲值餘額</p>

        <div className="bal-info-field">
          <span className="bal-info-label">儲值餘額</span>
          <span className="bal-info-value">${CURRENT_BALANCE.toLocaleString()}</span>
        </div>

        <div className="bal-info-field">
          <span className="bal-info-label">增加儲值金</span>
          <div className="bal-input-wrap">
            <input
              className="bal-input"
              inputMode="numeric"
              placeholder="請輸入想增加的金額"
              value={addAmt}
              onChange={e => setAddAmt(e.target.value.replace(/\D/g, ''))}
            />
            <span className="bal-suffix">元</span>
          </div>
        </div>

        <div className="bal-info-field">
          <span className="bal-info-label">贈送後金額</span>
          <span className="bal-info-value">${afterBalance.toLocaleString()}</span>
        </div>
        <div className="bal-info-field">
          <span className="bal-info-label">每度單價</span>
          <span className="bal-info-value">${RATE}</span>
        </div>
        <div className="bal-info-field">
          <span className="bal-info-label">預計可用電度</span>
          <span className="bal-info-value">{usable} 度</span>
        </div>

        <button
          className="bal-save-btn"
          style={{ opacity: canSave ? 1 : 0.45 }}
          onClick={canSave ? onClose : undefined}
        >儲存</button>
      </div>
    </div>
  )
}

function DepositModal({ onClose, onPay }) {
  const AMOUNTS = [500, 1000, 2000, 3000]
  const BALANCE = 1025
  const RATE = 5
  const [selected, setSelected] = useState(500)

  const afterBalance = BALANCE + selected
  const usableUnits = Math.floor(afterBalance / RATE)

  return (
    <div className="meter-overlay" onClick={onClose}>
      <div className="meter-sheet deposit-sheet" onClick={e => e.stopPropagation()}>
        <div className="meter-drag-indicator" />
        <p className="deposit-title">電表儲值</p>

        <div className="deposit-info-block">
          <span className="deposit-info-label">目前餘額</span>
          <span className="deposit-info-value">${BALANCE.toLocaleString()}</span>
        </div>

        <div className="deposit-section">
          <p className="deposit-section-label">儲值金額</p>
          <div className="deposit-amounts">
            {AMOUNTS.map(amt => (
              <button
                key={amt}
                className={`deposit-amount-btn${selected === amt ? ' deposit-amount-btn--active' : ''}`}
                onClick={() => setSelected(amt)}
              >${amt.toLocaleString()}</button>
            ))}
          </div>
          <p className="deposit-note">儲值後，可在「帳單」中找到本次儲值的費用明細。</p>
        </div>

        <div className="deposit-info-block">
          <span className="deposit-info-label">儲值後金額</span>
          <span className="deposit-info-value deposit-info-value--sm">${afterBalance.toLocaleString()}</span>
        </div>
        <div className="deposit-info-block">
          <span className="deposit-info-label">費率</span>
          <span className="deposit-info-value deposit-info-value--sm">${RATE} / 每度</span>
        </div>
        <div className="deposit-info-block">
          <span className="deposit-info-label">儲值後預計可用電度</span>
          <span className="deposit-info-value deposit-info-value--sm">{usableUnits} 度</span>
        </div>

        <button className="deposit-submit-btn" onClick={() => onPay(selected)}>儲值</button>
      </div>
    </div>
  )
}

function MeterModal({ property, room, onClose, onUpload }) {
  const [reading, setReading] = useState('')
  const [photo, setPhoto] = useState(null)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const fileRef = useRef(null)

  const used = reading && Number(reading) > LAST_READING ? Number(reading) - LAST_READING : null
  const estimate = used !== null ? used * PRICE_PER_UNIT : null

  return (
    <div className="meter-overlay" onClick={onClose}>
      <div className="meter-sheet" onClick={e => e.stopPropagation()}>
        <div className="meter-drag-indicator" />

        <p className="meter-title">電表抄表</p>

        {/* 電表照片 */}
        <div className="meter-field">
          <div className="meter-field-label-row">
            <span className="meter-label">電表照片</span>
          </div>
          <div className="meter-input-row">
            <span className="meter-input-text">
              {photo ? photo.name : ''}
            </span>
            <button className="meter-upload-link" onClick={() => setShowPhotoDialog(true)}>
              上傳照片
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => setPhoto(e.target.files[0] || null)} />
          </div>
        </div>

        {/* 本期電表度數 */}
        <div className="meter-field">
          <div className="meter-field-label-row">
            <span className="meter-label">本期電表度數*</span>
            <span className="meter-hint">上次抄表日期：{LAST_DATE}</span>
          </div>
          <div className="meter-input-row">
            <input
              className="meter-input"
              inputMode="numeric"
              placeholder={`上次抄表度數 ${LAST_READING}`}
              value={reading}
              onChange={e => setReading(e.target.value.replace(/[^\d]/g, ''))}
            />
            <span className="meter-suffix">度</span>
          </div>
        </div>

        {/* 本期使用度數 */}
        <div className="meter-info">
          <span className="meter-info-label">本期使用度數</span>
          <span className="meter-info-value">{used !== null ? `${used} 度` : '計算中'}</span>
        </div>

        {/* 每度單價 */}
        <div className="meter-info">
          <span className="meter-info-label">每度單價</span>
          <span className="meter-info-value">${PRICE_PER_UNIT}</span>
        </div>

        {/* 預估本期電費 */}
        <div className="meter-info">
          <span className="meter-info-label">預估本期電費</span>
          <span className="meter-info-value">{estimate !== null ? `$${estimate.toLocaleString()}` : '計算中'}</span>
        </div>

        <button className="meter-submit-btn" onClick={() => {
          if (reading && Number(reading) < LAST_READING) {
            setShowErrorToast(true)
            setTimeout(() => setShowErrorToast(false), 2500)
          } else {
            setShowConfirm(true)
          }
        }}>上傳度數</button>
        {showErrorToast && <div className="toast toast--error">不可小於前期抄表度數</div>}
      </div>

      {showPhotoDialog && <PhotoPickerDialog onClose={() => setShowPhotoDialog(false)} />}
      {showConfirm && (
        <ConfirmUploadDialog
          property={property}
          room={room}
          reading={reading || LAST_READING}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => { setShowConfirm(false); onUpload(reading) }}
        />
      )}
    </div>
  )
}

const TABS = [
  { icon: icTabHome,         unfocusIcon: icTabHomeUnfocus,     label: '首頁',  active: true  },
  { icon: icTabMessage,      unfocusIcon: icTabMessage,         label: '訊息',  active: false },
  { icon: icTabNotification, unfocusIcon: icTabNotification,    label: '佈告欄',active: false },
  { icon: icTabSetting,      unfocusIcon: icTabSetting,         label: '我的',  active: false },
]

// Scenarios that share the same screen content as 租客手動抄表 (3)
const SHARED_SCENARIOS = [0, 1, 3] // 儲值電表, 系統自動抄表, 租客手動抄表

export default function App() {
  const [scenario, setScenario] = useState(3)
  const [view, setView] = useState('tenant') // 'landlord' | 'tenant'
  const [navKey, setNavKey] = useState(0)

  // Full reset: used by scenario panel buttons — remounts LandlordHomePage
  const selectView = (s, v) => {
    setScenario(s)
    setView(v)
    setShowElecRecord(false)
    setShowMeterModal(false)
    setShowDepositModal(false)
    setShowPaymentModal(false)
    setNavKey(k => k + 1)
  }

  // Scenario-only update: used by segment tabs — updates state without remounting
  const updateScenario = (s, v) => { setScenario(s); if (v) setView(v) }
  const [showMeterModal, setShowMeterModal] = useState(false)
  const [showElecRecord, setShowElecRecord] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [displayReading, setDisplayReading] = useState('27273')
  const [displayDate, setDisplayDate] = useState('2025/05/12')

  const handleUploadSuccess = (reading) => {
    const today = new Date()
    const formatted = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`
    setDisplayReading(reading)
    setDisplayDate(formatted)
    setShowMeterModal(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div className="th-wrapper">

      {/* Phone */}
      <div className="th-screen">
        <StatusBar />

        <div className="th-header">
          <div className="th-user">
            <img src={AVATAR_URL} alt="Betty" className="th-avatar" />
            <span className="th-greeting">Hi Betty!</span>
          </div>
        </div>

        <div className="th-body">

          {/* ── 系統自動抄表 (1) & 租客手動抄表 (3) & 房東手動抄表-租客視角 (2+tenant) ── */}
          {(SHARED_SCENARIOS.includes(scenario) || (scenario === 2 && view === 'tenant')) && <>

          <div className="th-module">
            <div className="th-module-title">
              <h2>台北套房</h2>
              <button className="th-link">切換租屋處</button>
            </div>

            <LockCard
              photo={PHOTO_GATE_URL}
              name="公用大門"
              connected={true}
              doorLocked={true}
              outerPct={90}
              innerPct={50}
            />

            <LockCard
              photo={PHOTO_201_URL}
              name="201"
              connected={true}
              doorLocked={false}
              outerPct={90}
              innerPct={50}
            />

            <ActionCard actions={[
              { icon: <img src={icRentLease}  alt="" className="th-action-img" />, label: '租約' },
              { icon: <img src={icRentBill}   alt="" className="th-action-img" />, label: '帳單' },
              { icon: <img src={icRentRepair} alt="" className="th-action-img" />, label: '報修' },
            ]} />
          </div>

          <div className="th-module">
            <div className="th-module-title">
              <h2>電表</h2>
            </div>

            <div className="th-card th-elec-card">
              <div className="th-elec-row">
                <span className="th-elec-reading">{displayReading} 度</span>
                <span className="th-elec-date">抄表日：{displayDate}</span>
              </div>
            </div>

            <ActionCard actions={[
              { icon: <img src={icRentElectric}  alt="" className="th-action-img" />, label: '用電紀錄', onClick: () => setShowElecRecord(true) },
              ...(scenario === 3 ? [{ icon: <img src={icRentMeterCopy}  alt="" className="th-action-img" />, label: '抄表',    onClick: () => setShowMeterModal(true) }] : []),
              ...(scenario === 0 ? [{ icon: <img src={icRentDeposit} alt="" className="th-action-img" />, label: '電表儲值', onClick: () => setShowDepositModal(true) }] : []),
            ]} />
          </div>

          <div className="th-module">
            <div className="th-module-title">
              <h2>待繳帳單</h2>
              <button className="th-link">合併繳費</button>
            </div>

            <BillCard title="租金 2 期" due="2025/03/29" amount="$12,600" overdue={false} />
            {scenario === 0 && <BillCard title="電表儲值" due="2025/03/28" amount="$900" overdue={false} />}
            <BillCard title="租金 1 期" due="2025/02/18" amount="$12,600" overdue={true} />
          </div>

          </>}

        </div>

        <div className={`th-tabbar${view === 'landlord' ? ' th-tabbar--hidden' : ''}`}>
          {TABS.map(({ icon, unfocusIcon, label, active }) => (
            <div key={label} className="th-tab">
              <img src={active ? icon : unfocusIcon} alt={label} className="th-tab-img" />
              <span className={`th-tab-label${active ? ' th-tab-label--active' : ''}`}>{label}</span>
            </div>
          ))}
          <div className="th-home-indicator" />
        </div>

        {showMeterModal && <MeterModal property={PROPERTY_NAME} room={ROOM_NAME} onClose={() => setShowMeterModal(false)} onUpload={(r) => handleUploadSuccess(r)} />}
        {showDepositModal && <DepositModal onClose={() => setShowDepositModal(false)} onPay={(amt) => { setPaymentAmount(amt); setShowDepositModal(false); setShowPaymentModal(true) }} />}
        {showPaymentModal && <PaymentModal amount={paymentAmount} onClose={() => setShowPaymentModal(false)} />}
        {showElecRecord && (scenario === 2 || scenario === 3
          ? <MeterInfoPage scenario={scenario} isLandlord={false} onBack={() => setShowElecRecord(false)} />
          : scenario === 1
            ? <MHMeterPage scenario={1} onBack={() => setShowElecRecord(false)} />
            : <ElecRecordPage scenario={scenario} onBack={() => setShowElecRecord(false)} />
        )}
        {view === 'landlord' && <LandlordHomePage key={navKey} scenario={scenario} onSelectView={selectView} onUpdateScenario={updateScenario} />}
        {showToast && <Toast message="度數已上傳！" />}
      </div>

      {/* Scenario buttons */}
      <div className="th-scenario-panel">
        <p className="th-scenario-title">情境切換</p>
        <p className="th-scenario-desc">房東端點擊漢堡 › 電表清單</p>
        {[
          { blockLabel: '智慧電表', items: [{ idx: 0 }, { idx: 1 }, { idx: 4, label: '無租約', landlordOnly: true }] },
          { blockLabel: '傳統電表', items: [{ idx: 2 }, { idx: 3 }, { idx: 5, label: '無租約', landlordOnly: true }] },
        ].map(({ blockLabel, items }) => (
          <div key={blockLabel} className="th-scenario-block">
            <p className="th-scenario-block-title">{blockLabel}</p>
            {items.map(({ idx, label, landlordOnly }) => (
              <div key={idx}>
                <p className="th-scenario-group-title">{label ?? SCENARIOS[idx]}</p>
                <div className="th-scenario-sub">
                  <button
                    className={`th-scenario-sub-btn${scenario === idx && view === 'landlord' ? ' th-scenario-sub-btn--active' : ''}`}
                    onClick={() => selectView(idx, 'landlord')}
                  >房東視角</button>
                  {!landlordOnly && (
                    <button
                      className={`th-scenario-sub-btn${scenario === idx && view === 'tenant' ? ' th-scenario-sub-btn--active' : ''}`}
                      onClick={() => selectView(idx, 'tenant')}
                    >租客視角</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}
