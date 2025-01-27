
import Tab from '../../components/Tab'
import { useSearchParams } from 'react-router-dom'
import { Assistance, Users } from '../../shared';
import { ScanQrContainer } from './ScanQrContainer';
import '../../styles/views/dt-page.css'
import { FaQrcode as QrIcon } from 'react-icons/fa'
import { PaginatedTable } from '../../components/PaginatedTable';
import { PlayerCard } from '../../components/PlayerCard';
import { PlayersPage } from '../../views/dt/PlayersPage';
import { PlayerPageContent } from '../players-page/PlayerPageContent';


export const DtPageContent = ({
    players,
    assistances,
    refetchPlayers,
    refetchAssistances
}: { players: Users[] | null; refetchPlayers: () => void; assistances: Assistance[] | null; refetchAssistances: () => void }) => {
    const [params, setParams] = useSearchParams()

    const handleTabClick = (index: number) => {
        setParams({ tab: index.toString() })

        refetchPlayers()
        refetchAssistances()
    }

    const activeTab = parseInt(params.get('tab') ?? '0')

    if (players === null || assistances === null)
        return null

    return (
        <div className="mechanic-page-content">
            <div className='tabs-container'>
                {['Jugadores', 'Asistencias', 'Escanear'].map((label, index) => (
                    <Tab
                        key={index}
                        label={label}
                        isActive={index === activeTab}
                        onClick={() => handleTabClick(index)}
                    />
                ))}
                {
                    activeTab === 0 ? <PlayerPageContent
                        players={players} /> : null
                }
                {
                    activeTab === 1 ? <PaginatedTable<Assistance>
                        columns={['ID', 'DIA', 'HORARIO']}
                        rowsPerPage={20}
                        data={assistances}
                        renderRow={(assistance) => (
                            <tr key={assistance.id_assistance}>
                                <td className="user-id">{assistance.id_assistance}</td>
                                <td>{assistance.date.toString()}</td>
                                <td>{assistance.entry_time}</td>
                              </tr>
                            )} >
                          </PaginatedTable> : null
                }
                {activeTab === 2 ?
                    <ScanQrContainer /> : null
                }
            </div>
        </div>
    )
}