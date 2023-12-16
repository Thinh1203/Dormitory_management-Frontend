import instance from "../utils/instance";
import jwt_decode from "jwt-decode";

export const updateStatusRoomFree = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const { user_id } = decodedToken;
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.patch(`/roomStudent/update/${user_id}`, data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}