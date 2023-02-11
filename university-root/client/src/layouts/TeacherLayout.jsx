import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import images from "../utils/images+icons";
/**
 * use Sidebar for all admin child components.
 */
const TeacherLayout = () => (
    <Sidebar
        Menus={Menus}>
        <Outlet />
    </Sidebar>
);
const Menus = [
    { title: "Home", Src: images.Home, path: './home' },
    { title: "Students", Src: images.Users, path: './students' },
    { title: "Test", Src: images.HourglassEmpty ,gap:true, path: './testPage' },
    { title: "404 Test", Src: images.Error,  path: './Url'},
    { title: "Logout", Src: images.Logout , gap: true , path: './logout' },
];
export default TeacherLayout;