import { useState } from 'react'
import './MeterBindFlow.css'

// ── StatusBar ──────────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="mbf-status">
      <span className="mbf-status-time">9:41</span>
      <div className="mbf-status-icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0"    y="3"   width="3" height="9"    rx="1" fill="#333" />
          <rect x="4.5"  y="2"   width="3" height="10"   rx="1" fill="#333" />
          <rect x="9"    y="0.5" width="3" height="11.5" rx="1" fill="#333" />
          <rect x="13.5" y="0"   width="3" height="12"   rx="1" fill="#333" opacity="0.35" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.7 10.7 0.5 8 0.5C5.3 0.5 2.8 1.7 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="#333"/>
          <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.3 10 3.5 8 3.5C6 3.5 4.1 4.3 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" fill="#333"/>
          <circle cx="8" cy="10" r="1.5" fill="#333"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#333" strokeOpacity="0.35"/>
          <rect x="22" y="4" width="2" height="4" rx="1" fill="#333" fillOpacity="0.4"/>
          <rect x="2"  y="2" width="17" height="8" rx="2" fill="#333"/>
        </svg>
      </div>
    </div>
  )
}

// ── MeterSelectPropertyPage ────────────────────────────────────────────────────
//
// Props:
//   groups        {array}     Array of { property, address, items[] }
//   filterKeys    {string[]}  If provided, only show groups whose property name is in this list
//   onBack        {function}  () => void
//   onSelect      {function}  (group) => void
//   propertyPhoto {string}    Image src for the property thumbnail
//   arrowIcon     {string}    Image src for the right-arrow icon

export function MeterSelectPropertyPage({ groups, filterKeys, onBack, onSelect, propertyPhoto, arrowIcon }) {
  const [activeTab, setActiveTab] = useState('全部')
  const filtered = filterKeys ? groups.filter(g => filterKeys.includes(g.property)) : groups
  const shown = activeTab === '全部' ? filtered : filtered.filter(g => g.property === activeTab)

  return (
    <div className="msp-page">
      <StatusBar />
      <div className="msp-header">
        <button className="mbf-icon-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="msp-title">選擇電表房源</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="msp-tabs">
        {['全部', ...filtered.map(g => g.property)].map(t => (
          <button key={t} className={`msp-tab${activeTab === t ? ' msp-tab--on' : ''}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="msp-list">
        {shown.map(group => (
          <div key={group.property} className="msp-card" onClick={() => onSelect(group)}>
            <div className="msp-card-photo">
              {propertyPhoto && <img src={propertyPhoto} alt="" width={62} height={60} style={{ objectFit: 'cover', borderRadius: 2 }} />}
            </div>
            <div className="msp-card-info">
              <span className="msp-card-name">{group.property}</span>
              <span className="msp-card-address">{group.address}</span>
              <span className="msp-card-count">({group.items.filter(i => i.tenant).length}/{group.items.length} 已租)</span>
            </div>
            {arrowIcon && <img src={arrowIcon} alt="" width={24} height={24} />}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MeterSelectRoomPage ────────────────────────────────────────────────────────
//
// Props:
//   group            {object}    { property, address, items[] } — selected group
//   isRoomDisabled   {function}  (item) => boolean — when true, room is greyed out and unclickable
//   hasExistingMeter {function}  (item) => boolean — when true, shows confirm dialog before calling onScan
//   onBack           {function}  () => void
//   onScan           {function}  (item) => void — called when a room is selected (after confirm if needed)
//   propertyPhoto    {string}    Image src for the property thumbnail
//   hintText         {string}    Hint text shown above the room grid (default: '請選擇要綁定電表的房間。')
//   floorLabel       {string}    Floor label shown above the grid (default: '1F')

export function MeterSelectRoomPage({
  group,
  isRoomDisabled = () => false,
  hasExistingMeter = () => false,
  onBack,
  onScan,
  propertyPhoto,
  hintText = '請選擇要綁定電表的房間。',
  floorLabel = '1F',
  disabledRoomLabel = '已達上限',
}) {
  const [confirmRoom, setConfirmRoom] = useState(null)

  return (
    <div className="msrp-page">
      <StatusBar />
      <div className="msrp-header">
        <button className="mbf-icon-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="msrp-title">綁定電表</span>
        <div style={{ width: 44 }} />
      </div>

      <div className="msrp-body">
        <div className="msrp-prop-row">
          <div className="msrp-prop-icon">
            {propertyPhoto && <img src={propertyPhoto} alt="" width={62} height={60} style={{ objectFit: 'cover', display: 'block' }} />}
          </div>
          <div className="msrp-prop-info">
            <span className="msrp-prop-name">{group.property}</span>
            <span className="msrp-prop-address">{group.address}</span>
          </div>
        </div>

        <p className="msrp-hint">{hintText}</p>

        <div className="msrp-floor-label">{floorLabel}</div>
        <div className="msrp-grid">
          {group.items.map((item) => {
            const disabled = isRoomDisabled(item)
            const existing = hasExistingMeter(item)
            return (
              <div
                key={item.room}
                className={`msrp-room${disabled ? ' msrp-room--disabled' : ''}`}
                onClick={disabled ? undefined : existing ? () => setConfirmRoom(item) : () => onScan(item)}
              >
                {disabled && <span className="msrp-room-tag">{disabledRoomLabel}</span>}
                {existing && !disabled && <span className="msrp-room-tag msrp-room-tag--blue">已有電表</span>}
                <span className="msrp-room-name" style={disabled ? { color: 'var(--color-text-unfocus)' } : undefined}>
                  {item.room}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {confirmRoom && (
        <div className="mbf-alert-overlay">
          <div className="mbf-alert">
            <p className="mbf-alert-title">此房源已有電表</p>
            <p className="mbf-alert-body">確定「{group.property}・{confirmRoom.room}」要綁定第二顆電表嗎？</p>
            <div className="mbf-alert-divider-h" />
            <div className="mbf-alert-btns">
              <button className="mbf-alert-btn" onClick={() => setConfirmRoom(null)}>取消</button>
              <div className="mbf-alert-divider-v" />
              <button className="mbf-alert-btn mbf-alert-btn--primary" onClick={() => { setConfirmRoom(null); onScan(confirmRoom) }}>綁定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sample data ────────────────────────────────────────────────────────────────
// Import and pass to components as-is, or use as a reference for your own data shape.

export const METER_GROUPS_SAMPLE = [
  { property: '台北套房', address: '台北市大安區忠孝東路四段100號', items: [
    { room: '101', tenant: '我是儲值電表', sub: '退租日：2025/03/08', isDepositMeter: true, isUnbound: false },
    { room: '102', tenant: null,          sub: '空置' },
    { room: '103', tenant: '我是自動抄表', sub: '即將搬入' },
    { room: '104', tenant: '我沒設定電費', sub: '退租日：2026/12/31' },
    { room: '105', tenant: '瑪露希爾',    sub: '退租日：2025/03/08' },
  ]},
  { property: '台東民宿', address: '台東縣台東市中正路300號', items: [
    { room: 'A01', tenant: '我是儲值電表', sub: '退租日：2025/05/15', isDepositMeter: true, isUnbound: true },
    { room: 'A02', tenant: '我是自動抄表', sub: '退租日：2027/01/31', isUnbound: true },
    { room: 'A03', tenant: '我是自動抄表斷線了', sub: '退租日：2026/08/31' },
  ]},
]

export const MH_ONLY_SAMPLE = ['台北套房', '台東民宿']
