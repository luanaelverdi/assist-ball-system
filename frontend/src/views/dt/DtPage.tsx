import { DtPageContent } from "../../containers/dt-page/DtPageContent"
import { View } from "../../containers/View"
import { useDataFetching } from "../../hooks"
import { Assistance, Users } from "../../shared"

export const DtPage = () => {
    const players = useDataFetching<Users[]>('user/searchUserByType/player')
    const assistances = useDataFetching<Assistance[]>('assistance/getAll')

    return (

        <View data={players.data && assistances.data} status={players.status && assistances.status} error={players.error && assistances.error}>
            <DtPageContent
                players={players.data}
                assistances={assistances.data}
                refetchPlayers={players.fetch}
                refetchAssistances={assistances.fetch}
            />
        </View>

    )
}
