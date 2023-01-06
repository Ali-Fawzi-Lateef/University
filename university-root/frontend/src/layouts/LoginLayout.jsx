import { Outlet } from 'react-router-dom';

const LoginLayout = () => (
  <div /* layout props & styling */ >
    {/* local layout UI */}
    <Outlet />
  </div>
);
export default LoginLayout;