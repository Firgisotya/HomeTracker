import { Routes, Route } from "react-router-dom"
import IndexPembayaran from "../pages/pembayaran/IndexPembayaran"
import CreatePembayaran from "../pages/pembayaran/CreatePembayaran"

const PembayaranRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<IndexPembayaran />} />
        <Route path="create" element={<CreatePembayaran />} />
    </Routes>
  )
}

export default PembayaranRoutes