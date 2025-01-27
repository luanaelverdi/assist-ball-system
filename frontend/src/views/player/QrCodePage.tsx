import { QrCodePageContent } from "../../containers/players-page/QrCodePageContent"
import { ViewWithHeader } from "../../containers/ViewWithHeader"

export const QrCodePage = () => {
  return (
    <ViewWithHeader
      title="QR CODE"
      status={undefined}
      error={null}
      icon={undefined}>
      <QrCodePageContent />
    </ViewWithHeader>
  )
}