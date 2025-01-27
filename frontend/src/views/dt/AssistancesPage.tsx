import { AssistancesPagePageContent } from "../../containers/dt-page/assistances-page/AssistancesPagePageContent"
import { ViewWithHeader } from "../../containers/ViewWithHeader"
import { useDataFetching } from "../../hooks"
import { Assistance } from '../../shared'


export const AssistancesPage = () => {
  const assistances = useDataFetching<Assistance[]>('assistance/getAll')
  
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