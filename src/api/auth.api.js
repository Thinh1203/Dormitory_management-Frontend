import instance from "../utils/instance";
import jwt_decode from "jwt-decode";
export const auth = async (user, navigate) => {
    try {
        const res = await instance.post("/auth", user);
        const token = res.data.token;
        const decodedToken = jwt_decode(token);
        if (decodedToken.role === "student") {
            setTimeout(() => {
                navigate("/trangchu"); 
            }, 1000);
        }
        else navigate("/admin");
        localStorage.setItem("token", token);
        return res;
    } catch (error) {
        return error;
    }
}