import { useState } from 'react'
import { QrCode } from '../../components/QrCode'
import { Users } from '../../shared'
import { Modal } from '../../components/Modal'
import { useDataFetching } from '../../hooks'
import { CiTextAlignCenter } from 'react-icons/ci'

export const QrCodePageContent = () => {
    const player = useDataFetching<Users>(`user/searchUserByType/player`)
    const [currentPlayer, setCurrentPlayer] = useState<Users | null>(null)
    const [currentQr, setCurrentQr] = useState<string | null>(null)
    const [modalContent, setModalContent] = useState<{ id: number; type: string } | null>(null)

    return (
        <div className='qr-code-page-content'>
            <div className="qr">
                <h1 className='title'>HOLA {player.data?.fullname_user}!</h1>
                <h2 className='parrafo'>Este es tu código QR, mostraselo a tu entrenador</h2>
            </div>
            <QrCode
                handleClose={() => setModalContent(null)}
                value={currentQr || ''}
                code={String(player?.data?.id_user) || ''} />
        </div>
    )
}

