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
