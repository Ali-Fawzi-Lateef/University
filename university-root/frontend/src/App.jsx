import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/error/404';
import LoginLayout from "./layouts/LoginLayout";
import AdminLayout from "./layouts/AdminLayout";
import Unauthorized from "./pages/error/Unauthorized";
import Apply from "./pages/Apply";
import ProtectedRoutes from "./utils/protectedRoutes";
import Home from "./pages/admin/Home";
import Account from "./pages/admin/Account";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";

/**
 * 
 * @returns Routes
 */
export default function App() 
{
  return (
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />}/>
          <Route path="apply" element={<Apply />}/>
          <Route path="unauthorized" element={<Unauthorized/>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="AdminDashboard" element={<AdminLayout />}>
          <Route element={<ProtectedRoutes/>}>
            <Route path="home" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="users" element={<Users />} />
            <Route path="users/addUser" element={<AddUser />} />
          </Route>
        </Route>
      </Routes>
  )
}