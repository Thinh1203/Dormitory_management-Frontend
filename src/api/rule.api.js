import instance from "../utils/instance";


export const getOneRule = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const result = await instance.get(`/rule/getOne/${id}`, { headers });

    return result;
  } catch (error) {
    return error;
  }
}

export const addNew = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const result = await instance.post('/rule/add/', data, { headers });

    return result;
  } catch (error) {
    return error;
  }
}

export const getAllRule = async (page, search) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    const queryParams = {
      page,
      search
    };

    const result = await instance.get('/rule/getAll', {
      params: queryParams,
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}
