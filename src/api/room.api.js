import instance from "../utils/instance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';

export const getRoomList = async (page, search, filter) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    };


    const queryParams = {
      page,
      search,
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
