import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkImageExtension, checkEmail, checkPhoneNumber } from "../utils/validation"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: null,
        mssv: "",
        address: "",
        classs: "",
        course: "",
        birthday: "",
        gender: "Nam",
        numberPhone: "",
        identificationNumber: "",
        relativeName: "",
        relationship: "",
        relativeNumberPhone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            avatar: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.avatar || !formData.address || !formData.birthday || !formData.classs || !formData.course || !formData.email || !formData.fullName || !formData.gender || !formData.identificationNumber || !formData.mssv || !formData.numberPhone || !formData.password || !formData.relationship || !formData.relativeName || !formData.relativeNumberPhone)
            return toast.error("Vui lòng điền đầy đủ thông tin!", { position: "bottom-right", autoClose: 1000 });

        if (!checkImageExtension(formData.avatar))
            return toast.error("Ảnh không hợp lệ (.jpg | .png | .jpeg)", { position: "bottom-right", autoClose: 1000 });
            
        if (!checkEmail(formData.email))
            return toast.error("Địa chỉ email không hợp lệ!", { position: "bottom-right", autoClose: 1000 });

        if (!checkPhoneNumber(formData.numberPhone))
            return toast.error("Số điện thoại không hợp lệ!", { position: "bottom-right", autoClose: 1000 });

        if (!checkPhoneNumber(formData.relativeNumberPhone))
            return toast.error("Số điện thoại người thân không hợp lệ!", { position: "bottom-right", autoClose: 1000 });
        
    };

    const courseList = ["44", "45", "46", "47", "48", "49", "50"];

    return (
        <div className="bg-cover bg-no-repeat bg-fixed bg-center bg-[url('https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80')]">
            <div className="min-h-screen flex items-center justify-center mx-5">
                <div className="max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 lg:w-1/2 my-2">
                    <span className="text-3xl font-bold text-rose-500 flex justify-center mt-2">ĐĂNG KÝ TÀI KHOẢN</span>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full md:flex ">
                            {/* cột 1 */}
                            <div className="w-full md:w-1/2 px-6 my-2 ">
                                <div className="relative ">
                                    {formData.avatar ? (
                                        <img
                                            src={URL.createObjectURL(formData.avatar)}
                                            alt="Avatar"
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                            Chưa có hình ảnh
                                        </div>
                                    )}
                                </div>
                                <div className="mb-2 mt-[4px]">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Ảnh chân dung
                                    </span>
                                    <input
                                        type="file"
                                        name="avatar"
                                        onChange={handleAvatarChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Họ và tên
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        name="fullName"
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Mã số sinh viên
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="B1900000"
                                        value={formData.mssv}
                                        name="mssv"
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Mật khẩu
                                    </span>
                                    <input
                                        type="password"

                                        value={formData.password}
                                        name="password"
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Địa chỉ email
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="nguyenvana123@gmail.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Số điện thoại
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="0123456789"
                                        name="numberPhone"
                                        value={formData.numberPhone}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            {/* Cột 2 */}
                            <div className="w-full md:w-1/2 px-6">
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Mã số CCCD
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="41025378913"
                                        name="identificationNumber"
                                        value={formData.identificationNumber}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Ngày sinh
                                    </span>
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={formData.birthday}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Lớp
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="DI19V7Ax"
                                        name="classs"
                                        value={formData.classs}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Khóa
                                    </span>
                                    <select onChange={handleChange} name="course" className="w-full p-2 border border-gray-300 rounded-md">
                                        {
                                            courseList && courseList.map((e, index) => (
                                                <option key={index} value={e}>
                                                    {e}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Giới tính
                                    </span>
                                    <select onChange={handleChange} name="gender" className="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="Nam">
                                            Nam
                                        </option>
                                        <option value="Nữ">
                                            Nữ
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Địa chỉ
                                    </span>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Đường 3/2, Q.Ninh Kiều, TP.Cần Thơ"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Họ và tên người thân
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Nguyễn Văn B"
                                        name="relativeName"
                                        value={formData.relativeName}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Số điện thoại người thân
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="0123456789"
                                        name="relativeNumberPhone"
                                        value={formData.relativeNumberPhone}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="mb-2">
                                    <span className="block text-sm font-medium text-gray-600">
                                        Mối quan hệ
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Bố, Mẹ, Chú, Thím,..............."
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full p-6 flex justify-around">
                            <button
                                type="submit"
                                className="w-5/12 bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Đăng ký
                            </button>
                            <span className=" text-gray-700">
                                <Link to="/">
                                    <button className="py-2 px-8 rounded-md bg-gray-400 text-white hover:text-black ">Đăng nhập</button>
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
