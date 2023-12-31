import * as React from 'react';
import { Container, Paper, Grid, Typography, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { Transition } from '../utils/createTheme';
import { checkForm, deleteRegistrationForm } from '../api/registrationForm.api';
import { useNavigate } from 'react-router-dom';

const RegisterFormPage = () => {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [information, setInformation] = React.useState({});

    const navigator = useNavigate();
    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await checkForm();
            setInformation(res.data);
        };
        fetchApi();
    }, []);

    const deleteForm = async () => {
        const res = await deleteRegistrationForm(id);
        setOpen(false);
        if (res.status === 200) {

            toast.success("Đã hủy đơn", {
                position: "bottom-right",
                autoClose: 1000,
            });
            return setTimeout(() => {
                navigator("/trangchu");
            }, 1500)

        } else {
            return toast.error("Có lỗi xảy ra", {
                position: "bottom-right",
                autoClose: 1000,
            }) 
        }
    }


    const handleClickOpen = () => {
        setId(information?.registrationForm?.id)
        setOpen(true);
    };

    const handleClose = () => {
        setId(0);
        setOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className='bg-gray-200'>
            <Header />
            <Container style={{ flex: 1 }} maxWidth="sm">
                <Grid container sx={{ marginTop: 1, marginBottom: 1 }}>
                    <Grid item xs={7}>
                        <Typography align="center" variant="h5" color={"red"}>Thông tin đăng ký</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Button onClick={handleClickOpen} size="small" variant="contained">Hủy đăng ký</Button>
                    </Grid>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Bạn có muốn hủy đơn đăng ký?"}</DialogTitle>
                        {/* <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                
                            </DialogContentText>
                        </DialogContent> */}
                        <DialogActions>
                            <Button onClick={deleteForm}>Đồng ý</Button>
                            <Button onClick={handleClose}>Từ chối</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid container sx={{ padding: 1, marginBottom: 2, backgroundColor: "#c5cae9", borderRadius: 5 }} >
                    <Grid item xs={6} sx={{ padding: 2 }}>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Mã tòa nhà
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Mã phòng
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Loại phòng
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Còn trống
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Phòng nấu ăn
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Đơn giá (VNĐ)
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Năm học
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Thời gian
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Trạng thái
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Tổng phí phòng
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sx={{ padding: 2 }}>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.room?.building.areaCode}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.room?.roomCode}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.room?.roomType}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.room?.empty}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.room?.kitchen ? "Có thể" : "Không"}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.room?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Học kỳ {information?.schoolYear?.semester} - Năm {information?.schoolYear?.year}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            {information?.registrationForm?.registrationTime} tháng
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center", color: "red" }}>
                            {!information?.registrationForm?.registrationStatus && "Chờ duyệt"}
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center", color: "green" }}>
                            {
                                (information?.registrationForm?.registrationTime * information?.room?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }đ
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default RegisterFormPage;