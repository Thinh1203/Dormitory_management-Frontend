import instance from "../utils/instance";

export const getAllNotification = async (page) => {
    try {
        const queryParams = {
            page,
        };
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.get("/notification/getAll", { params: queryParams, headers });
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


export const updateOne = async (id, data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.patch(`/notification/update/${id}`, data, { headers });
        return result;
    } catch (error) {
        return error;
    }
}

export const addNewEvent = async (data) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const result = await instance.post('/notification/add/', data, { headers });
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
      const result = await instance.delete(`/notification/delete/${id}`, { headers });
      return result;
    } catch (error) {
      return error;
    }
  }

