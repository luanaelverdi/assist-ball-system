import { useParams } from "react-router-dom"
import { DtPageContent } from "../../containers/dt-page/DtPageContent"
import { View } from "../../containers/View"
import { useDataFetching } from "../../hooks"
import { Assistance, DtPlayers, Users } from "../../shared"

export const DtPage = () => {
    const params = useParams();
    console.log("params dt: ", params.dtId)
    const dtId = params.dtId ?? ''

    //const assistances = useDataFetching<Assistance[]>(`assistance/getByIdDT/${encodeURIComponent(id_dt)}`)
    const players = useDataFetching<Users[]>(`user/getPlayersByIdDT/${encodeURIComponent(dtId)}`)

    return (

      /*  <View data={players.data  && assistances.data} status={players.status && assistances.status} error={players.error && assistances.error}>
            <DtPageContent
                players={players.data}
                assistances={assistances.data}
                refetchPlayers={players.fetch}
                refetchAssistances={assistances.fetch}
            />
        </View>*/
        <View data={players.data } status={players.status} error={players.error }>
            <DtPageContent
                players={players.data}
                refetchPlayers={players.fetch}
            />
        </View>

    )
}
