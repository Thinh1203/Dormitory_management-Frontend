import instance from "../utils/instance";

export const getAllBuilding = async (area) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const query = { area };
        const result = await instance.get('/building/getAll', { params: query, headers });
        return result;
    } catch (error) {
        return error;
    }

}

export const getArea = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get('/building/getArea', { headers });
        return result;
    } catch (error) {
        return error;
    }

}

export const getAreaCode = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get("/building/getAreaCode", { headers });

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
        const result = await instance.get(`/building/getOne/${id}`, { headers });

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
        const result = await instance.patch(`/building/update/${id}`, data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}

export const deleteBuilding = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.delete(`/building/delete/${id}`, { headers });
        return result;
    } catch (error) {
        return error;
    }
}

export const newBuilding = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.post('/building/add/', data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}