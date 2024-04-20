import { Routes, Route } from "react-router-dom"
import IndexPenghuniRumah from "../pages/penghuni_rumah/IndexPenghuniRumah"
import CreatePenghuniRumah from "../pages/penghuni_rumah/CreatePenghuniRumah"
import DetailPenghuniRumah from "../pages/penghuni_rumah/DetailPenghuniRumah"
import EditPenghuniRumah from "../pages/penghuni_rumah/EditPenghuniRumah"

const PenghuniRumahRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<IndexPenghuniRumah />} />
      <Route path="create" element={<CreatePenghuniRumah />} />
      <Route path="edit/:id" element={<EditPenghuniRumah />} />
      <Route path="detail/:id" element={<DetailPenghuniRumah />} />
    </Routes>
  )
}

export default PenghuniRumahRoutes