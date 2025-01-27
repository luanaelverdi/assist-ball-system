import { PaginatedTable } from "../../../components/PaginatedTable";
import { Assistance } from "../../../shared";

interface AssistancePageContentProps {
  assistances: Assistance[] | null;
}

export const AssistancesPagePageContent = ({
  assistances
}: AssistancePageContentProps) => {

  if (assistances === null)
    return null

  return (
    <>
      <PaginatedTable<Assistance>
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
      </PaginatedTable>

    </>
  )
}