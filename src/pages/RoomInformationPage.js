import { Container, Grid, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import { Link } from "react-router-dom";

const RoomInformationPage = () => {

    const list = [
        {
            "month": 1,
            "oldElectricityIndicator": 23,
            "newElectricityIndicator": 35,
            "oldWaterIndicator": 12,
            "newWaterIndicator": 34,
            "electricityPrice": 1200,
            "waterPrice": 2350,
            "totalElectricityBill": "250.000",
            "totalWaterBill": "23.000",
            "totalBill": "253.000",
            "paymentStatus": false,
            "paymentTime": "22/12/2023"
        },
        {
            "month": 2,
            "oldElectricityIndicator": 23,
            "newElectricityIndicator": 35,
            "oldWaterIndicator": 12,
            "newWaterIndicator": 34,
            "electricityPrice": 1200,
            "waterPrice": 2350,
            "totalElectricityBill": "250.000",
            "totalWaterBill": "23.000",
            "totalBill": "253.000",
            "paymentStatus": false,
            "paymentTime": ""
        },
        {
            "month": 3,
            "oldElectricityIndicator": 23,
            "newElectricityIndicator": 35,
            "oldWaterIndicator": 12,
            "newWaterIndicator": 34,
            "electricityPrice": 1200,
            "waterPrice": 2350,
            "totalElectricityBill": "250.000",
            "totalWaterBill": "23.000",
            "totalBill": "253.000",
            "paymentStatus": false,
            "paymentTime": ""
        }
    ]
    const room = {
        "type": "Phòng 8 người ở",
        "building": "B1",
        "room": "B105",
        "price": "150.000",
        "registerDay": "01/01/2023",
        "acceptDay": "02/01/2023",
        "Fee": "1.350.000",
        "status": false,
        "month": 7
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container sx={{ flex: 1 }}>
                <Grid sx={{ paddingY: 3 }} className="rounded-md shadow-lg my-2 bg-white" >
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                        <div className="flex flex-row justify-between">
                            <h2 className="px-6 text-blue-500 text-lg sm:text-md font-semibold underline">
                                Thông tin ở ký túc xá
                            </h2>
                            <Link to="/dangkysuachuacsvc">
                                <h2 className="px-6 text-blue-500 text-lg sm:text-md font-semibold underline hover:text-red-500">
                                    Sửa chữa thiết bị
                                </h2>
                            </Link>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700 border-t-2">
                                    <td className="px-6 py-2  sm:text-sm text-xs  font-semibold">
                                        Loại phòng đăng ký
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {room.type}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Mã tòa nhà
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {room.building}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Phòng
                                    </td>
                                    <td className="px-6 py- sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {room.room}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Giá phòng
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {room.price} / tháng
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Ngày đăng ký
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {room.registerDay}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Số tháng đăng ký
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {room.month}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Ngày được duyệt
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        2/1/2023
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Tổng phí phòng
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800 font-medium">
                                        {room.Fee}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Trạng thái thanh toán
                                    </td>
                                    <td className={`px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800 font-medium ${room.status ? 'text-green-500' : 'text-red-500'}`}>
                                        {room.status ? "Đã thanh toán" : "Chưa thanh toán"}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs font-semibold">
                                        Thanh toán
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <Button variant="contained" disabled={room.status}>
                                            Thanh toán
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="px-6 text-blue-500 text-lg sm:text-md font-semibold underline">
                            Thông tin điện nước hàng tháng
                        </h2>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr className="bg-blue-700 text-white text-md text-center font-semibold">
                                    <th scope="col" className="px-6 py-3 border-r-2">
                                        Tháng
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r-2">
                                        Loại
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r-2">
                                        Chỉ số sử dụng
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r-2">
                                        Phải đóng
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r-2">
                                        Tổng phải đóng
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r-2">
                                        Ngày đóng
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {' '}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list ? list?.map((e, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="border-b border-gray-200 dark:border-gray-700" >
                                                <td className="px-6 py-2 text-center sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                                    {e.month}
                                                </td>
                                                <td className="px-6 py-2 sm:text-sm text-xs ">
                                                    Đơn giá nước
                                                </td>
                                                <td className="px-6 text-center py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                                    {e.newWaterIndicator - e.oldWaterIndicator} khối
                                                </td>
                                                <td className="px-6 text-center py-2 sm:text-sm text-xs ">
                                                    {e.totalWaterBill}đ
                                                </td>
                                                <td rowSpan={2} className="px-6 py-2 text-xl text-center bg-gray-50 dark:bg-gray-800">
                                                    {e.totalBill}đ
                                                </td>
                                                <td rowSpan={2} className="px-6 text-center py-2 sm:text-sm text-xs">
                                                    {e.status ? e.paymentTime : "Chưa đóng"}
                                                </td>
                                                <td rowSpan={2} className="px-6 py-2 text-xl text-center bg-gray-50 dark:bg-gray-800">
                                                    <Button variant="contained" disabled={e.paymentStatus}>
                                                        Thanh toán
                                                    </Button>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-200 dark:border-gray-700" >
                                                <td className="px-6 text-center py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                                    {e.month}
                                                </td>
                                                <td className="px-6 py-2 sm:text-sm text-xs">
                                                    Đơn giá điện
                                                </td>
                                                <td className="px-6 py-2 text-center sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                                    {e.newElectricityIndicator - e.oldElectricityIndicator}kW
                                                </td>
                                                <td className="px-6 text-center py-2 sm:text-sm text-xs  ">
                                                    {e.totalElectricityBill}đ
                                                </td>


                                            </tr>
                                        </React.Fragment>
                                    )) : ""
                                }
                            </tbody>
                        </table>
                    </div>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default RoomInformationPage;