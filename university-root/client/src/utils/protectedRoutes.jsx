import { Navigate, Outlet } from "react-router-dom";
/**
 * 
 * @returns Content page.
 * check if user is logged in or not
 * render content of requested page if logged in
 * and rediract to login page if not.
 */
const ProtectedRoutes = () => {
    return localStorage.getItem('isLoggedIn') === "true" ? <Outlet/> : <Navigate to="/"/>;
};

export default ProtectedRoutes