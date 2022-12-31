import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from './components/404';
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Apply from "./pages/Apply";
import ProtectedRoutes from "./utils/protectedRoutes";

function App() 
{
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />}/>
          <Route path="apply" element={<Apply />}/>
          <Route path="unauthorized" element={<Unauthorized/>} />
            <Route element={<ProtectedRoutes/>}>
              <Route path="AdminDashboard" element={<AdminDashboard />} />
            </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

export default App;
