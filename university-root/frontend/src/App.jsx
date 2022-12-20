import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from "./pages/AdminDashboard";
import NotFound from './components/404';
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Users from "./components/Users";
import Apply from "./pages/Apply";

function App() 
{
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />}/>
          <Route path="apply" element={<Apply />}/>
          {/* <Route path="dashboard" element={<Dashboard />}/> */}
          <Route path="unauthorized" element={<Unauthorized/>} />

          {/* <Route element={<PersistLogin/>}>

            <Route element={<RequireAuth allowedRoles={'dean'} />}> */}
              <Route path="dashboard" element={<Dashboard />} />
            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRoles={'dean'} />}> */}
              <Route path="Users" element={<Users />} />
            {/* </Route> */}

          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

export default App;
