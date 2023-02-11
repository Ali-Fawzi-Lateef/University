import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/error/404';
import LoginLayout from "./layouts/LoginLayout";
import AdminLayout from "./layouts/AdminLayout";
import Unauthorized from "./pages/error/Unauthorized";
import ProtectedRoutes from "./utils/protectedRoutes";
import Home from "./pages/admin/Home";
import Users from "./pages/admin/users/Users";
import AddUser from "./pages/admin/users/AddUser";
import TeacherLogout from "./pages/teacher/teacherLogout";
import TestPage from "./pages/admin/TestPage";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLogout from "./pages/admin/adminLogout";
import Students from "./pages/teacher/Students/Students";
import StudentLayout from "./layouts/StudentLayout";
import Grades from "./pages/student/Grades";
import StudentLogout from "./pages/student/studentLogout";

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
            {/*take it off*/}
          <Route path="unVerified" element={<Unauthorized/>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="AdminDashboard" element={<AdminLayout />}>
          <Route element={<ProtectedRoutes/>}>
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="testPage" element={<TestPage />}/>
            <Route path="logout" element={<AdminLogout />} />
            <Route path="users/addUser" element={<AddUser />} />
          </Route>
        </Route>
          <Route path="TeacherDashboard" element={<TeacherLayout />}>
              <Route element={<ProtectedRoutes />}>
                  <Route path="home" element={<Home />} />
                  <Route path="testPage" element={<TestPage />}/>
                  <Route path="students" element={<Students />} />
                  <Route path="logout" element={<TeacherLogout />} />
              </Route>
          </Route>
          <Route path="StudentDashboard" element={<StudentLayout />}>
              <Route element={<ProtectedRoutes />}>
                  <Route path="home" element={<Home />} />
                  <Route path="testPage" element={<TestPage />}/>
                  <Route path="grades" element={<Grades />} />
                  <Route path="logout" element={<StudentLogout />} />
              </Route>
          </Route>
      </Routes>
  )
}