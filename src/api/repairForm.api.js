import instance from "../utils/instance";

export const getOneForm = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    const result = await instance.get(`/repairRequestForm/getOne/${id}`, {
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}

export const getListRepairForm = async (page, filter) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    const queryParams = {
      page,
      filter,
    };

    const result = await instance.get('/repairRequestForm/getAll', {
      params: queryParams,
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}

export const getUserRepair = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    const result = await instance.get('/repairRequestForm/getUserRepair', {
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}

export const updateOneForm = async (id, data) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const result = await instance.patch(`/repairRequestForm/update/${id}`, data, {
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}

export const addNewForm = async (data) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const result = await instance.post('/repairRequestForm/add', data, {
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}
