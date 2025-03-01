import { useParams } from "react-router-dom"
import { View } from "../../containers/View"
import { useDataFetching } from "../../hooks"
import { Assistance } from "../../shared"

export const PlayerPage = () => {
  const params = useParams();
  const assistances = useDataFetching<Assistance[]>(`assistance/getByIdPlayer/${encodeURIComponent(params.playerId ?? '')}`)

  return (
    <View data={assistances.data} status={assistances.status} error={assistances.error}>
      <h1>Player Page</h1>
    </View>
    )
}