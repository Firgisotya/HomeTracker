import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    let token = localStorage.getItem("token");
    const user = token ? { loggedIn: true } : null;
    return user;
}

const ProtectedRoutes = () => {
    const user = useAuth();
    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoutes