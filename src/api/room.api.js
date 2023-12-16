import instance from "../utils/instance";


export const getRoomList = async (page, search, filter) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    const queryParams = {
      page,
      search,
      areaCode: filter.areaCode,
      capacity: filter.capacity,
      roomMale: filter.roomMale,
      empty: filter.empty,
      kitchen: filter.kitchen,
    };

    const result = await instance.get('/room/getAll', {
      params: queryParams,
      headers,
    });

    return result;
  } catch (error) {
    return error;
  }
}

export const getRoomInformation = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.get(`/room/getOne/${id}`, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const deleteRoom = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.delete(`/room/delete/${id}`, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const addRoom = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.post("/room/add", data, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const updateInformationRoom = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.patch(`/room/update/${id}`, data, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const getAllSchoolYear = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.get("/shoolYear/getAll", { headers });
    return result;
  } catch (error) {
    return error;
  }
}


export const getListRoom = async (query) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const queryParams = {
      id: query.id
    };

    const result = await instance.get("/room/getList", { params: queryParams, headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const addNewSchoolYear = async (data) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.post("/shoolYear/add", data, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const deleteOneYear = async (id) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.delete(`/shoolYear/delete/${id}`, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const getOneYear = async (id) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.get(`/shoolYear/getOne/${id}`, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const updateOneYear = async (id, data) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.patch(`/shoolYear/update/${id}`, data, { headers });
    return result;
  } catch (error) {
    return error;
  }
}

export const getInformationStudentInRoom = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.get("/roomStudent/checkRoomUser", { headers });

    return result;
  } catch (error) {
    return error;
  }
}

export const getInformationDetailsRoom = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.get(`/roomStudent/getOne/${id}`, { headers });
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
    const result = await instance.delete(`/roomStudent/delete/${id}`, { headers });
    return result;
  } catch (error) {
    return error;
  }
}


export const addUser = async (data) => {
  try {

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.post('/roomStudent/addNewStudent', data, { headers });
    return result;
  } catch (error) {
    return error;
  }
}


export const registerRoom = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.post("/registrationForm/add", data, { headers });

    return result;
  } catch (error) {
    return error;
  }
}

export const getAllRoomStudent = async (page, filter, search) => {
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
    const result = await instance.get("/roomStudent/getAll", { params: queryParams, headers });

    return result;
  } catch (error) {
    return error;
  }
}


export const resetAllRoom = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const result = await instance.patch("/room/resetAll", data, { headers });

    return result;
  } catch (error) {
    return error;
  }
}