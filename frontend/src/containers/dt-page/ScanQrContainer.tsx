import { useEffect, useState } from 'react'
import { Modal } from '../../components/Modal'
import { FaQrcode as QrIcon } from 'react-icons/fa'
// import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import QrReader from '../../components/QrReader'

export const ScanQrContainer = () => {
  const [ openScanner, setOpenScanner ] = useState(false)
  const [ hasCameraPermission, setHasCameraPermission ] = useState(false)

  const handleScanQr = (result: string) => {
    window.location.href = result
  }

  useEffect(() => {
    async function checkCameraPermission() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        setHasCameraPermission(true)
      } catch {
        setHasCameraPermission(false) 
      }
    }

    checkCameraPermission()
  }, [])

  return (
    <>
      <div className='flex'>
        <button className='qr-button mechanic' onClick={() => setOpenScanner(true)}>
          <QrIcon />
        </button>
      </div>
      {openScanner && (
        <Modal isActive={openScanner}>
          <div className='scanner-container'>
            <span>Escaneando qr...</span>
            <button onClick={() => setOpenScanner(false)} className='close-button'>x</button>
            {hasCameraPermission ? (
              <QrReader onScan={handleScanQr} />
            ) : <div>Active el permiso de uso de su cámara para continuar</div>}
          </div>
        </Modal>
      )}
    </>
  )
}