import { Container, Grid, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getInformationStudentInRoom } from "../api/room.api";
import axios from "axios";
import { getRoomReceipt } from "../api/receipt.api";
import { checkStudentRoom } from "../api/registrationForm.api";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addNewCheckOut, getOneFormCheckOut } from "../api/checkout.api";
import { toast } from "react-toastify";


const RoomInformationPage = () => {
    const [data, setData] = React.useState({});
    const [paymentData, setPaymentData] = React.useState({});
    const [receipt, setReceipt] = React.useState([]);
    const [checkStudentInRoom, setCheckStudentInRoom] = React.useState(false);
    const [checkFromCheckOut, setCheckFromCheckOut] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const [open, setOpen] = React.useState(false);


    const sendFormCheckOut = async () => {
        const res = await addNewCheckOut();
        if (res.status === 200) {
            setOpen(false);
            return toast.success('Đã gửi đơn đăng ký trả chỗ!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    useEffect(() => {
        const checkStudentInRoom = async () => {
            const res = await checkStudentRoom();
            if (res.status === 200) {
                setCheckStudentInRoom(true);
            }
        };
        checkStudentInRoom();
    }, []);

    useEffect(() => {
        const checkOut = async () => {
            const res = await getOneFormCheckOut();
            if (res?.status === 200) {
                setCheckFromCheckOut(true);
                setFormData(res.data);
            }
        };
        checkOut();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getInformationStudentInRoom();
            setData(res.data);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchReceipt = async () => {
            const res = await getRoomReceipt();
            setReceipt(res.data);
        };
        fetchReceipt();
    }, []);


    const handlePayment = async () => {
        try {
            const response = await axios.post("http://localhost:8088/api/payment/pay", paymentData);
            console.log(response.data);
            window.location.href = response.data.approval_url
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

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
                            {
                                checkStudentInRoom &&
                                (!formData?.status ?
                                    (<h2 className="px-6 text-yellow-500 text-lg sm:text-md font-semibold underline">
                                        Đã đăng ký trả chỗ
                                    </h2>) : (<button onClick={() => setOpen(true)} className="px-6 text-blue-500 text-lg sm:text-md font-semibold underline hover:text-green-500 hover:cursor-pointer">
                                        Đăng ký trả chỗ
                                    </button>)
                                )
                            }
                            <Link to="/dangkysuachuacsvc">
                                <h2 className="px-6 text-blue-500 text-lg sm:text-md font-semibold underline hover:text-green-500">
                                    Sửa chữa thiết bị
                                </h2>
                            </Link>
                            <Dialog
                                open={open}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" color='red'>
                                    Bạn có muốn đăng ký trả chỗ?
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Sau khi đăng ký sẽ không thể hủy đơn!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpen(false)}>Hủy bỏ</Button>
                                    <Button onClick={() => sendFormCheckOut()} autoFocus>
                                        Đồng ý
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700 border-t-2">
                                    <td className="px-6 py-2  sm:text-sm text-xs  font-semibold">
                                        Loại phòng đăng ký
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? data?.room?.room?.roomType : " "}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Mã tòa nhà
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? data?.room?.room?.building?.areaCode : " "}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Phòng
                                    </td>
                                    <td className="px-6 py- sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? data?.room?.room?.roomCode : " "}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Giá phòng
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? (data?.room?.room?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ/tháng") : " "}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Ngày đăng ký
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? (new Date(data?.registrationForm?.createdAt).toLocaleDateString('en-GB')) : " "}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Số tháng đăng ký
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? data?.registrationForm?.registrationTime : " "}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Ngày được duyệt
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        {data !== undefined ? (new Date(data?.room?.createdAt).toLocaleDateString('en-GB')) : " "}
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Tổng phí phòng
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800 font-medium">
                                        {data !== undefined ? (data?.room?.roomFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")) : " "}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="px-6 py-2 sm:text-sm text-xs  font-semibold">
                                        Trạng thái thanh toán
                                    </td>
                                    <td className={`px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800 font-medium ${(data !== undefined && data?.room?.paymentStatus) ? 'text-green-600' : 'text-red-500'}`}>
                                        {data === undefined ? " " : (data?.room?.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán")}                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs font-semibold">
                                        Thanh toán
                                    </td>
                                    <td className="px-6 py-2 sm:text-sm text-xs bg-gray-50 dark:bg-gray-800">
                                        <Button
                                            onClick={
                                                () => {
                                                    setPaymentData({
                                                        title: "Thanh toán phí phòng.",
                                                        amount: data?.room?.roomFee,
                                                        sku: data?.room?.id
                                                    });
                                                    handlePayment();
                                                }
                                            }
                                            variant="contained"
                                            disabled={(data === undefined ? true : (data?.room?.paymentStatus))}
                                        >
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
                                    receipt ? receipt?.map((e, index) => (
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
                                                    {e.receipt.totalWaterBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                                </td>
                                                <td rowSpan={2} className="px-6 py-2 text-xl text-center bg-gray-50 dark:bg-gray-800">
                                                    {e.receipt.totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                                </td>
                                                <td rowSpan={2} className="px-6 text-center py-2 sm:text-sm text-xs">
                                                    {e.receipt.paymentStatus ? new Date(e.receipt.updatedAt).toLocaleString('en-GB', {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        second: 'numeric',
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                    }) : "Chưa đóng"}
                                                </td>
                                                <td rowSpan={2} className="px-6 py-2 text-xl text-center bg-gray-50 dark:bg-gray-800">
                                                    <Button variant="contained" disabled={e.receipt.paymentStatus}>
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
                                                    {e.receipt.totalElectricityBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                                </td>


                                            </tr>
                                        </React.Fragment>
                                    )) : (
                                        <tr>
                                            <td colSpan={7} className="text-red-600 font-semibold text-center text-xl">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )
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