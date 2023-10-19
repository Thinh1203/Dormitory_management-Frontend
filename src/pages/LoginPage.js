import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../api/auth.api";


const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const fetchApi = async () => {
            const res = await auth(data, navigate);
            if (res.status != 200)
                return toast.error("Tài khoản hoặc mật khẩu không chính xác!", { position: "bottom-right", autoClose: 1000 });
        };
        fetchApi();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 via-sky-300 to-blue-500">
            <form onSubmit={handleSubmit(onSubmit)}
                className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
            >
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-3xl font-bold text-blue-700 text-center">ĐĂNG NHẬP</span>
                    <span className="font-light text-gray-400 mb-4 text-center">
                        Vui lòng đăng nhập vào hệ thống!
                    </span>
                    <div className="py-4">
                        <span className="mb-2 text-md">Tài khoản</span>
                        <input
                            type="text"
                            placeholder="Mã số đăng nhập"
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            {...register("userName", { required: "Vui lòng nhập tài khoản." })}

                        />
                        <p className="text-red-600">{errors.userName?.message}</p>
                    </div>
                    <div className="py-4 relative">
                        <span className="mb-2 text-md">Mật khẩu</span>
                        <input
                            type="password"
                            // type={showPassword ? "text" : "password"}
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            {...register("password", { required: "Vui lòng nhập mật khẩu." })}

                        />
                        <p className="text-red-600">{errors.password?.message}</p>
                        {/* { register("password").value.length > 0 && (
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-1 bottom-7">{showPassword ? <AiFillEyeInvisible className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}</button>)} */}
                    </div>
                    <button

                        type="submit"
                        className="w-full bg-gray-600 text-white p-2 rounded-lg mb-6 hover:bg-blue-700 hover:text-white hover:border hover:border-gray-300"
                    >
                        Đăng nhập
                    </button>
                    <div className="text-center text-gray-700">
                        {"Chưa có tài khoản?  "}
                        <Link to="/dangky">
                            <button type="button" className="font-bold text-black hover:text-blue-600">Đăng ký</button>
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                        alt="img"
                        className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                    />

                    <div
                        className="absolute hidden bottom-10 right-6 p-6 bg-gray-500 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
                    >
                        <span className="text-white text-xl"
                        > Hệ thống quản lý ký túc xá sinh viên
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;