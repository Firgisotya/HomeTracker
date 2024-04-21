import { Route, Routes } from "react-router-dom";
import IndexRumah from "../pages/rumah/IndexRumah";
import CreateRumah from "../pages/rumah/CreateRumah";
import EditRumah from "../pages/rumah/EditRumah";
import DetailRumah from "../pages/rumah/DetailRumah";
import HistoryRumah from "../pages/rumah/HistoryRumah";

const RumahRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<IndexRumah />} />
        <Route path="create" element={<CreateRumah />} />
        <Route path="edit/:id" element={<EditRumah />} />
        <Route path="detail/:id" element={<DetailRumah />} />
        <Route path=":id/history" element={<HistoryRumah />} />
    </Routes>
  )
}

export default RumahRoutes