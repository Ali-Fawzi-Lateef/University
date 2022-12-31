import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    return localStorage.getItem('isLoggedIn') === "true" ? <Outlet/> : <Navigate to="/"/>;
};

export default ProtectedRoutes