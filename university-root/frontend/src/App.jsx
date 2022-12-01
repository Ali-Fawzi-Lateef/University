import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from './components/home';
import Login from './components/login';
import {NotFound} from './components/404';
import Dashboard from "./components/ALL";



function App() 
{
  return (
    <Router>
      <Routes>
        <Route path="/">
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
