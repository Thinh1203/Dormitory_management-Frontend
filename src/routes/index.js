import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import RegisterFormPage from "../pages/RegisterFormPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PersonalInformation from "../pages/PersonalInformationpage";
import RoomInformationPage from "../pages/RoomInformationPage";
import ErrorPage from "../pages/ErrorPage";
import RepairDevicePage from "../pages/RepairDevicePage";
import IntroducePage from "../pages/IntroducePage";
import RulePage from "../pages/RulePage";
import EventPage from "../pages/EventPage";
import MainDashboard from "../pages/adminDashboard/MainDashboard";

const routers = [
    { path: "/", component: LoginPage },
    { path: "/dangky", component: RegisterPage },
    { path: "/trangchu", component: HomePage },
    { path: "/dondangky", component: RegisterFormPage },
    { path: "/doimatkhau", component: ChangePasswordPage },
    { path: "/thongtincanhan", component: PersonalInformation },
    { path: "/thongtinphong", component: RoomInformationPage },
    { path: "/dangkysuachuacsvc", component: RepairDevicePage },
    { path: "/gioithieu", component: IntroducePage },
    { path: "/noiquy", component: RulePage },
    { path: "/tintuc-sukien", component: EventPage },
    { path: "/admin/dashboard", component: MainDashboard },
    { path: "/*", component: ErrorPage }
];
export default routers;