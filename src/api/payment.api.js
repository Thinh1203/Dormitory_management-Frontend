import instance from "../utils/instance";
import jwt_decode from "jwt-decode";

export const getConfig = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.post("/payment/create", data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}