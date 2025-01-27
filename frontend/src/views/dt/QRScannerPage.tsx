import { ScanQrContainer } from "../../containers/dt-page/ScanQrContainer"
import { ViewWithHeader } from "../../containers/ViewWithHeader"

export const QRScannerPage = () => {
  return (
    <ViewWithHeader
      title="ESCANEAR QR"
      status={undefined}
      error={null}
      icon={undefined}>
      <ScanQrContainer/>
    </ViewWithHeader>
  )
}