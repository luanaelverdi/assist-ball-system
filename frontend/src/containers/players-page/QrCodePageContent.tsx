import QRCodeComponent from "../../components/QRCodeComponent";

export const QrCodePageContent = () => {

    return (
        <div className="qr-code-container">
            <h1>HOLA!</h1>
            <h2>Este es tu código qr, mostraselo a tu entrenador</h2>
            <QRCodeComponent/>
        </div>
    )
};

export default QrCodePageContent;



