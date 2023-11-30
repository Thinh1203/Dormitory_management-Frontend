import instance from "../utils/instance";

export const getAllReceipt = async (page, filter, search) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };


        const queryParams = {
            page,
            search,
            month: filter.month,
            schoolyearId: filter.schoolyearId,
            paymentStatus: filter.paymentStatus,
        };

        const result = await instance.get('/receipt/getAll', {
            params: queryParams,
            headers,
        });

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
        const result = await instance.patch(`/receipt/update/${id}`, data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}

export const getOneReceipt = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get(`/receipt/getOne/${id}`, { headers });
        return result;
    } catch (error) {
        return error;
    }
}