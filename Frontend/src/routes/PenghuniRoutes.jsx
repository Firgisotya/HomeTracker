import { Route, Routes } from "react-router-dom";
import IndexPenghuni from "../pages/penghuni/IndexPenghuni";
import CreatePenghuni from "../pages/penghuni/CreatePenghuni";
import EditPenghuni from "../pages/penghuni/EditPenghuni";
import DetailPenghuni from "../pages/penghuni/DetailPenghuni";

const PenghuniRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<IndexPenghuni />} />
            <Route path="create" element={<CreatePenghuni />} />
            <Route path="edit/:id" element={<EditPenghuni />} />
            <Route path="detail/:id" element={<DetailPenghuni />} /> 
        </Routes>
    )
}

export default PenghuniRoutes