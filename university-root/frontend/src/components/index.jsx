import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from './home';
import Login from './login';
import {NotFound} from './404';
import Dashboard from "./ALL";

const Index = () => {
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

export default Index;
