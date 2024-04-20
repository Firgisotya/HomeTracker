import { Routes, Route } from "react-router-dom"
import IndexPengeluaran from "../pages/pengeluaran/IndexPengeluaran"
import CreatePengeluaran from "../pages/pengeluaran/CreatePengeluaran"

const PengeluaranRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<IndexPengeluaran />} />
        <Route path="create" element={<CreatePengeluaran />} />
    </Routes>
  )
}

export default PengeluaranRoutes