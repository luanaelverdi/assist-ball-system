import { useParams } from "react-router-dom"
import { AssistancesPagePageContent } from "../../containers/dt-page/assistances-page/AssistancesPagePageContent"
import { ViewWithHeader } from "../../containers/ViewWithHeader"
import { useDataFetching } from "../../hooks"
import { Assistance } from '../../shared'


export const AssistancesPage = () => {
  const params = useParams();
  const assistances = useDataFetching<Assistance[]>(`assistance/getByIdDt/${encodeURIComponent(params.dtId ?? '')}`)

  
    return (
      <ViewWithHeader
        title="ASISTENCIAS"
        status={assistances.status}
        error={assistances.error}
        icon={undefined}>
        <AssistancesPagePageContent
          assistances={assistances.data}
        />
  
      </ViewWithHeader>
    )
}