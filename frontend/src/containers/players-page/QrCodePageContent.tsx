import { useState } from 'react'
import { QrCode } from '../../components/QrCode'
import { Users } from '../../shared'
import { Modal } from '../../components/Modal'

export const QrCodePageContent = () => {
    const [currentPlayer, setCurrentPlayer] = useState<Users | null>(null)
    const [currentQr, setCurrentQr] = useState<string | null>(null)
    const [modalContent, setModalContent] = useState<{ id: number; type: string } | null>(null)

    return (
        <div className='qr-code-page-content'>
            <div className="qr">
                <QrCode
                    handleClose={() => setModalContent(null)}
                    value={currentQr || ''}
                    code={String(currentPlayer?.id_user) || ''} />
            </div>
        </div>
    )
}

