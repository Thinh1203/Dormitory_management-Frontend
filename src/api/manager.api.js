import instance from "../utils/instance";

export const getAll = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.get('/user/manager/getAll', { headers });
        return result;
    } catch (error) {
        return error;
    }

}

export const getOne = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.get(`/user/manager/getOne/${id}`, { headers });
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

        const result = await instance.patch(`/user/manager/update/${id}`, data, { headers });
        return result;
    } catch (error) {
        return error;
    }

}

export const deleteOne = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.delete(`/user/manager/deleteOne/${id}`, { headers });
        return result;
    } catch (error) {
        return error;
    }

}

export const addNewUser = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.post('/user/manager/add/', data, { headers });
        return result;
    } catch (error) {
        return error;
    }

}