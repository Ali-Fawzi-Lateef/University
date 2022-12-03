import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from "./components/ALL";
import {NotFound} from './components/404';
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from './components/RequireAuth';


function App() 
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />}/>
          {/* <Route path="dashboard" element={<Dashboard />}/> */}
          <Route path="unauthorized" element={<Unauthorized/>} />

          <Route element={<RequireAuth allowedRoles={['dean']} />}>
            <Route path="Dashboard" element={<Dashboard />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
