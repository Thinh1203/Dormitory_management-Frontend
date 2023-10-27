import { Container, Grid, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { getInformation } from "../api/student.api";


const PersonalInformation = () => {
    const [information, setInformation] = React.useState({});

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getInformation();
            setInformation(res.data);
         
        };
        fetchApi();
    }, []);

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
                                        Thông tin sinh viên
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" rowSpan={8} className="px-6 py-4 font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-800">
                                        <div>
                                            <img src={information?.avatar} alt="Avatar" className="max-w-xs" />
                                        </div>
                                        <Button startIcon={<EditIcon />} variant="contained" color="success" size="small" sx={{ marginY: 2 }}>Cập nhật thông tin</Button>
                                    </th>

                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Họ và tên
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information?.fullName}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Giới tính
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information?.gender}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Mã số sinh viên
                                    </td>
                                    <td className="px-6 py- sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information?.mssv}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Ngày sinh
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {new Date(information?.birthday).toLocaleDateString('en-GB')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Địa chỉ email
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information.email}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Địa chỉ
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information.address}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray700-200 dark:border-gray-">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Mã căn cước công dân
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information.identificationNumber}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Số điện thoại
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information?.numberPhone}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Ngành học
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information?.major}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Mã lớp
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information.classs}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Họ và tên người thân
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information.relativeName}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Khóa
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {information.course}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-2 sm:text-sm text-xs">
                                        Số điện thoại người thân
                                    </td>
                                    <td className="px-6 py-2 bg-gray-50 dark:bg-gray-800 sm:text-sm text-xs">
                                    {information.relativeNumberPhone}
                                    </td>
                                    <td className="px-6 py-2">
                                        Mối quan hệ
                                    </td>
                                    <td className="px-6 py-2 bg-gray-50 dark:bg-gray-800">
                                    {information.relationship}
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

export default PersonalInformation;