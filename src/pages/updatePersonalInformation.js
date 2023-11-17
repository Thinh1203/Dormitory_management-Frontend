import { Container, Grid, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { checkEmail, checkPhoneNumber } from "../utils/validation";
import { toast } from "react-toastify";
import { updateInformation } from "../api/student.api";


const UpdatePersonalInformation = () => {
    const [information, setInformation] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.information;

    const [updateData, setUpdateData] = React.useState({
        email: user.email,
        address: user.address,
        numberPhone: user.numberPhone,
        identificationNumber: user.identificationNumber,
        relativeName: user.relativeName,
        relativeNumberPhone: user.relativeNumberPhone,
        relationship: user.relationship
    });
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!checkPhoneNumber(updateData.numberPhone) || !checkPhoneNumber(updateData.relativeNumberPhone))
            return toast.error("Số điện thoại không hợp lệ!", { position: "bottom-right", autoClose: 1000 });
        if (!checkEmail(updateData.email))
            return toast.error("Địa chỉ email không hợp lệ!", { position: "bottom-right", autoClose: 1000 });

        const update = async () => {
            const res = await updateInformation(user?.id, updateData);
            if (res.status === 200) {
                toast.success("Cập nhật thành công!", { position: "bottom-right", autoClose: 1000 });
                return setTimeout(() => {
                    navigate("/thongtincanhan");
                }, 2000);
            } else {
                return toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
            }
        }
        update();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="bg-gray-200">
            <Header />
            <Container sx={{ flex: 1 }}>
                <Grid sx={{ paddingY: 3 }} className="rounded-md shadow-lg my-2 bg-white" >
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" colSpan={5} className="px-6 py-3 bg-blue-700 text-white text-center">
                                        Cập nhật thông tin sinh viên
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" rowSpan={8} className=" py-4 font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-800">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Button
                                                onClick={(e) => handleUpdate(e)}
                                                startIcon={<EditIcon />}
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                sx={{ marginY: 2, marginX: 2 }}
                                            >Cập nhật</Button>
                                        </div>
                                    </th>

                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Họ và tên
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {user?.fullName}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Giới tính
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {user?.gender}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Mã số sinh viên
                                    </td>
                                    <td className="px-6 py- sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {user?.mssv}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Ngày sinh
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {new Date(user?.birthday).toLocaleDateString('en-GB')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Địa chỉ email
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData.email}
                                            onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                        />
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Địa chỉ
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData?.address}
                                            onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
                                        />
                                    </td>
                                </tr>
                                <tr className="border-b border-gray700-200 dark:border-gray-">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Mã căn cước công dân
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData.identificationNumber}
                                            onChange={(e) => setUpdateData({ ...updateData, identificationNumber: e.target.value })}
                                        />
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Số điện thoại
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData?.numberPhone}
                                            onChange={(e) => setUpdateData({ ...updateData, numberPhone: e.target.value })}
                                        />
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Ngành học
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {user?.major}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Mã lớp
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {user.classs}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Họ và tên người thân
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData.relativeName}
                                            onChange={(e) => setUpdateData({ ...updateData, relativeName: e.target.value })}
                                        />
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Khóa
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {user?.course}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Số điện thoại người thân
                                    </td>
                                    <td className="px-6 py-2 bg-gray-50 dark:bg-gray-800 sm:text-sm text-xs">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData?.relativeNumberPhone}
                                            onChange={(e) => setUpdateData({ ...updateData, relativeNumberPhone: e.target.value })}
                                        />
                                    </td>
                                    <td className="px-6 py-2">
                                        Mối quan hệ
                                    </td>
                                    <td className="px-6 py-2 bg-gray-50 dark:bg-gray-800">
                                        <input
                                            className="w-full p-1 border-2"
                                            type="text"
                                            value={updateData?.relationship}
                                            onChange={(e) => setUpdateData({ ...updateData, relationship: e.target.value })}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default UpdatePersonalInformation;