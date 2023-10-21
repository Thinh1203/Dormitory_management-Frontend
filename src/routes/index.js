import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AdminDashboard from "../pages/AdminDashboard";
import RegisterFormPage from "../pages/RegisterFormPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PersonalInformation from "../pages/PersonalInformationpage";

const routers = [
    { path: "/", component: LoginPage },
    { path: "/dangky", component: RegisterPage },
    { path: "/trangchu", component: HomePage },
    { path: "/dondangky", component: RegisterFormPage },
    { path: "/doimatkhau", component: ChangePasswordPage },
    { path: "/thongtincanhan", component: PersonalInformation },
    { path: "/admin", component: AdminDashboard },
];
export default routers;