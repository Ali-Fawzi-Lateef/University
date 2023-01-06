import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar'
/**
 * use AdminSidebar for all admin child components.
 */
const AdminLayout = () => (
    <AdminSidebar>
    <Outlet />
    </AdminSidebar>
);
export default AdminLayout;