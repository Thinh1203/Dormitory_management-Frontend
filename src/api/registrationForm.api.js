import instance from "../utils/instance";
import 'react-toastify/dist/ReactToastify.css';

export const checkForm = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get('/registrationForm/checkForm', { headers });
        return result;
    } catch (error) {
        return error;
    }
}

export const checkStudentRoom = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get('/roomStudent/checkRoomUser', { headers });

        return result;
    } catch (error) {
        return error;
    }
}

export const deleteRegistrationForm = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.delete(`/registrationForm/delete/${id}`, { headers });

        return result;
    } catch (error) {
        return error;
    }
}