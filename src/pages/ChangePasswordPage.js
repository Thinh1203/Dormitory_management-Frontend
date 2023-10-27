import * as React from 'react';
import { Container } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/auth.api";

const ChangePasswordPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            return toast.error("Mật khẩu mới không trùng khớp!", { position: "bottom-right", autoClose: 1000 });
        }
        const fetchApi = async () => {
            const res = await changePassword(data);
            if (res?.status !== 200) {
                return toast.error("Mật khẩu cũ không khớp!", { position: "bottom-right", autoClose: 1000 });
            } else {
                toast.success("Đổi mật khẩu thành công!", { position: "bottom-right", autoClose: 1000 });
                setTimeout(() => {
                    navigate("/");
                }, 2000)
            }
        };
        fetchApi();
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className='bg-gray-200'>
            <Header />
            <Container sx={{ flex: 1, display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 max-w-screen-md"
                >
                    <div className="flex flex-col justify-center p-8">
                        <span className="mb-3 text-3xl font-bold text-blue-700 text-center">ĐỔI MẬT KHẨU</span>
                        {/* <span className="font-light text-gray-400 mb-4 text-center">
                            Vui lòng đăng nhập vào hệ thống!
                        </span> */}
                        <div className="py-2">
                            <span className=" text-md">Mật khẩu cũ</span>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                {...register("oldPassword", { required: "Vui lòng nhập mật khẩu cũ." })}

                            />
                            <p className="text-red-600">{errors.userName?.message}</p>
                        </div>

                        <div className="py-2 relative">
                            <span className=" text-md">Mật khẩu mới</span>
                            <input
                                type="password"
                                // type={showPassword ? "text" : "password"}
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                {...register("newPassword", { required: "Vui lòng nhập mật khẩu mới." })}

                            />
                            <p className="text-red-600">{errors.password?.message}</p>
                            {/* { register("password").value.length > 0 && (
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-1 bottom-7">{showPassword ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}</button>)} */}
                        </div>
                        <div className="py-2">
                            <span className=" text-md">Nhập lại mật khẩu mới</span>
                            <input
                                type="password"

                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                {...register("confirmNewPassword", { required: "Vui lòng nhập mật khẩu mới." })}

                            />
                            <p className="text-red-600">{errors.userName?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-green-700 hover:text-white hover:border hover:border-gray-300"
                        >
                            Lưu lại
                        </button>

                    </div>

                    <div className="relative">
                        <img
                            src="https://mic.gov.vn/Upload_Moi/2022_vn02/20220827-ta50_1.jpeg"
                            alt="img"
                            className="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
                        />

                        <div
                            className="absolute hidden bottom-10 right-6 p-6 bg-gray-500 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
                        >
                            <span className="text-white md:text-xl">
                                Hệ thống quản lý ký túc xá sinh viên
                            </span>
                        </div>
                    </div>
                </form>
            </Container>
            <Footer />
        </div>
    );
}

export default ChangePasswordPage;