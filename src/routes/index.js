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
import RoomManagerDashboard from "../pages/adminDashboard/RoomManagerDashboard";
import UpdatePersonalInformation from "../pages/updatePersonalInformation";
import RegisterFormManager from "../pages/adminDashboard/RegistrationFormManager";
import RoomDetailsInformation from "../pages/adminDashboard/RoomDetailsInformation";
import StudentManagerDashboard from "../pages/adminDashboard/StudentManagerDashboard";
import AdminManagerDashboard from "../pages/adminDashboard/AdminManagerDashboard";
import EventManager from "../pages/adminDashboard/EventManager";

const routers = [
    { path: "/", component: LoginPage },
    { path: "/dangky", component: RegisterPage },
    { path: "/trangchu", component: HomePage },
    { path: "/dondangky", component: RegisterFormPage },
    { path: "/doimatkhau", component: ChangePasswordPage },
    { path: "/thongtincanhan", component: PersonalInformation },
    { path: "/thongtinphong", component: RoomInformationPage },
    { path: "/dangkysuachuacsvc", component: RepairDevicePage },
    { path: "/capnhatthongtincanhan", component: UpdatePersonalInformation},
    { path: "/gioithieu", component: IntroducePage },
    { path: "/noiquy", component: RulePage },
    { path: "/tintuc-sukien", component: EventPage },
    { path: "/admin/dashboard", component: MainDashboard },
    { path: "/admin/dashboard/tintuc-sukien", component: EventManager },
    { path: "/admin/dashboard/danhsachphong", component: RoomManagerDashboard },
    { path: "/admin/dashboard/danhsachphong/chitiet", component: RoomDetailsInformation },
    { path: "/admin/dashboard/danhsachsinhvien", component: StudentManagerDashboard },
    { path: "/admin/dashboard/danhsachquanly", component: AdminManagerDashboard },
    { path: "/admin/dashboard/danhsachdondangky", component: RegisterFormManager },
    { path: "/*", component: ErrorPage }
];
export default routers;