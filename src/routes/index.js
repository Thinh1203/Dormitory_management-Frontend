import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import AdminDashboard from "../pages/AdminDashboard";

const routers = [
    { path: "/", component: LoginPage },
    { path: "/dangky", component: RegisterPage },
    { path: "/trangchu", component: HomePage },
    { path: "/admin", component: HomePage },
    
];
export default routers;