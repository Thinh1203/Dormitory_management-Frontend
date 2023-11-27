import instance from "../utils/instance";

export const getAllDevice = async (page) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const queryParams = {
            page
        };

        const result = await instance.get('/device/getAll', {
            params: queryParams,
            headers,
        });

        return result;
    } catch (error) {
        return error;
    }
}

export const addNewDevice = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.post('/device/add', data, {
            headers,
        });

        return result;
    } catch (error) {
        return error;
    }
}

export const deleteDevice = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.delete(`/device/delete/${id}`, {
            headers,
        });

        return result;
    } catch (error) {
        return error;
    }
}

export const getOneDevice = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.get(`/device/getOne/${id}`, {
            headers,
        });

        return result;
    } catch (error) {
        return error;
    }
}

export const updateDevice = async (id, data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const result = await instance.patch(`/device/update/${id}`, data, {
            headers,
        });

        return result;
    } catch (error) {
        return error;
    }
}