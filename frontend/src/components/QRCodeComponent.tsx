import { useState } from "react";
import { useDataFetching } from "../hooks";
import { Users } from "../shared";
import { request } from "../libraries/axios-lib";

const QRCodeComponent = () => {
  const [qrCode, setQrCode] = useState("");
  const user = useDataFetching<Users>('user/getDatosWithToken');
  const id = user.data?.id_user;

  const fetchQRCode = async () => {
    try {
      const response = await request({ method: 'GET', endpoint: `user/qr/${id}` });
      console.log("QR Code URL:", response.data);
      setQrCode(response.data);
    } catch (error) {
      console.error("Error al obtener el QR", error);
    }
  };

  return (
    <div className="qr-code">
      <button onClick={fetchQRCode}>Generar QR</button>
      <div className="qr">

        {qrCode ? <img src={qrCode} alt="Código QR" style={{ width: "200px", height: "200px" }} /> : <p>No hay QR</p>}
      </div>
    </div>
  );
};

export default QRCodeComponent;
