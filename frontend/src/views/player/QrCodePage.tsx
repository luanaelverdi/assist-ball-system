import QrCodePageContent from "../../containers/players-page/QrCodePageContent";
import { ViewWithHeader } from "../../containers/ViewWithHeader"
import '../../styles/views/player-qr.css'

export const QrCodePage = () => {

  return (
    <ViewWithHeader
      title="QR"
      icon={undefined}>
      <QrCodePageContent/>
    </ViewWithHeader>
  )
}
