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

export const getAllForm = async (page, filter, search) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const queryParams = {
            page,
            search,
            filter
        };
        const result = await instance.get('/registrationForm/getAll', { params: queryParams, headers });

        return result;
    } catch (error) {
        return error;
    }
}

export const getOneDetail = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.get(`/registrationForm/getOne/${id}`, { headers });

        return result;
    } catch (error) {
        return error;
    }
}

export const updateOne = async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const result = await instance.patch(`/registrationForm/update/${id}`, data, { headers });
      return result;
    } catch (error) {
      return error;
    }
  }
