import instance from "../utils/instance";
import jwt_decode from 'jwt-decode';

export const addNewCheckOut = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const currentUserToken = localStorage.getItem("token");
        const decodedToken = jwt_decode(currentUserToken);
        const data = decodedToken;

        const result = await instance.post('/checkOut/add/', data, { headers });
        return result;
    } catch (error) {
        return error;
    }

}


export const getOneFormCheckOut = async () => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get('/checkOut/getOne', { headers });

        return result;
    } catch (error) {
        return error;
    }

}


export const getAllFormCheckOut = async (page, filter, search) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const queryParams = {
            page,
            filter,
            search,
        };
        const result = await instance.get('/checkOut/getAll', { params: queryParams, headers });

        return result;
    } catch (error) {
        return error;
    }

}

export const updateStatusForm = async (id, data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
;
        const result = await instance.patch(`/checkOut/update/${id}`, data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}