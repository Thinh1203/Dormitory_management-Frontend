import instance from "../utils/instance";

export const getAllNotification = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get("/notification/getAll", { headers });
        // console.log(result);
        return result;
    } catch (error) {
        return error;
    }
}

export const getOneNotification = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get(`/notification/getOne/${id}`, { headers });

        return result;
    } catch (error) {
        return error;
    }
}