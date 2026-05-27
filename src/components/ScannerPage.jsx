import { useState } from 'react'
import './ScannerPage.css'
import icBasicSuccess from '../assets/ic_basic_success.png'

/**
 * ScannerPage — 電表 QR Code 掃描頁
 *
 * Props:
 *   onBack      {function}  返回按鈕回呼
 *   onSuccess   {function}  掃描成功後回呼
 *   toastText   {string}    成功 toast 文字（可含 \n 換行），預設「已成功綁定電表！」
 *   location    {string}    相機區顯示的位置文字，預設「信義套房・101」
 *   title       {string}    頁面標題，預設「識別電表」
 *   sheetTitle  {string}    底部卡片標題，預設「綁定電表」
 *   sheetDesc   {string}    底部卡片說明文字
 */
export default function ScannerPage({
  onBack,
  onSuccess,
  toastText  = '已成功綁定電表！',
  location   = '信義套房・101',
  title      = '識別電表',
  sheetTitle = '綁定電表',
  sheetDesc  = '請確認電表已安裝完成，並連上 wifi。',
}) {
  const [showToast, setShowToast] = useState(false)

  const handleScan = () => {
    setShowToast(true)
    setTimeout(() => { setShowToast(false); onSuccess() }, 2500)
  }

  return (
    <div className="sc-page">

      {/* Status bar */}
      <div className="sc-status">
        <span className="sc-status-time">9:41</span>
        <div className="sc-status-icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0"    y="3"   width="3" height="9"    rx="1" fill="white" />
            <rect x="4.5"  y="2"   width="3" height="10"   rx="1" fill="white" />
            <rect x="9"    y="0.5" width="3" height="11.5" rx="1" fill="white" />
            <rect x="13.5" y="0"   width="3" height="12"   rx="1" fill="white" opacity="0.35" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.7 10.7 0.5 8 0.5C5.3 0.5 2.8 1.7 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill="white"/>
            <path d="M8 5.5C9.5 5.5 10.9 6.1 11.9 7.1L13.3 5.7C11.9 4.3 10 3.5 8 3.5C6 3.5 4.1 4.3 2.7 5.7L4.1 7.1C5.1 6.1 6.5 5.5 8 5.5Z" fill="white"/>
            <circle cx="8" cy="10" r="1.5" fill="white"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
            <rect x="22" y="4" width="2" height="4" rx="1" fill="white" fillOpacity="0.4"/>
            <rect x="2"  y="2" width="17" height="8" rx="2" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="sc-header">
        <button className="sc-back" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sc-title">{title}</span>
        </button>
        <span className="sc-hint">說明</span>
      </div>

      {/* Camera area */}
      <div className="sc-camera">
        <div className="sc-viewfinder" onClick={handleScan} style={{ cursor: 'pointer' }} />
        <p className="sc-location">{location}</p>
      </div>

      {/* Bottom sheet */}
      <div className="sc-sheet">
        <div className="sc-drag-indicator" />
        <p className="sc-sheet-title">{sheetTitle}</p>
        <p className="sc-sheet-desc">{sheetDesc}</p>
        <div className="sc-divider">
          <div className="sc-divider-line" />
          <span className="sc-divider-text">or</span>
          <div className="sc-divider-line" />
        </div>
        <div className="sc-manual">
          <p className="sc-manual-hint">找不到 QR Code？</p>
          <button className="sc-manual-link">手動輸入設備 ID</button>
        </div>
      </div>

      {/* Success toast */}
      {showToast && (
        <div className="sc-toast-overlay">
          <div className="sc-toast">
            <img src={icBasicSuccess} alt="" width={84} height={86} />
            <p className="sc-toast-text">{toastText}</p>
          </div>
        </div>
      )}
    </div>
  )
}
