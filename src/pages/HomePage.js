import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div>
            <Header />
        </div>
    );
}

export default HomePage;