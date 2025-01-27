import { QRCodeCanvas } from 'qrcode.react'
import styles from '../styles/components/QrCode.module.css'
import { IoPrintSharp as PrintIcon } from 'react-icons/io5'

export const QrCode = ({
  value,
  code,
  handleClose,
  entity = 'jugador'
}: { value: string; code: string; handleClose: () => void; entity?: string; }) => {
  const downloadQRCode = () => {
    const qrCodeEl = document.getElementById('qrCodeElement') as HTMLCanvasElement
    
    const qrCodeURL = qrCodeEl.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    const aEl = document.createElement('a')
    aEl.href = qrCodeURL
    aEl.download = 'QR_Code.png'
    document.body.appendChild(aEl)
    aEl.click()
    document.body.removeChild(aEl)
  }

  return (
    <div className={styles.container}>
      <button onClick={handleClose} className={styles['close-button']}>x</button>
      <button className={styles['qr-download']} onClick={downloadQRCode}>
        <PrintIcon />
        <span>Descargar</span>
      </button>
      <div className={styles['qr-code__element']}>
        <QRCodeCanvas id='qrCodeElement' value={value} />
      </div>
    </div>
  )
}