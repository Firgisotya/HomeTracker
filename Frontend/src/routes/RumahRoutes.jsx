import { Route, Routes } from "react-router-dom";
import IndexRumah from "../pages/rumah/IndexRumah";
import CreateRumah from "../pages/rumah/CreateRumah";
import EditRumah from "../pages/rumah/EditRumah";

const RumahRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<IndexRumah />} />
        <Route path="create" element={<CreateRumah />} />
        <Route path="edit/:id" element={<EditRumah />} />
    </Routes>
  )
}

export default RumahRoutes