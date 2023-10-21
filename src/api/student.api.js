import instance from "../utils/instance";
export const register = async (data, avatar) => {
    try {
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('mssv', data.mssv);
        formData.append('address', data.address);
        formData.append('classs', data.classs);
        formData.append('course', data.course);
        formData.append('birthday', data.birthday);
        formData.append('gender', data.gender);
        formData.append('numberPhone', data.numberPhone);
        formData.append('identificationNumber', data.identificationNumber);
        formData.append('relativeName', data.relativeName);
        formData.append('relationship', data.relationship);
        formData.append('relativeNumberPhone', data.relativeNumberPhone);
  
        const res = await instance.post("/user/student/add", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            } });
        return res;
    } catch (error) {
        return error;
    }
}