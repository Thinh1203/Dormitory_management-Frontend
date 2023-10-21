import * as React from 'react';
import { Box, Container, Paper, Grid, Typography, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterFormPage = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        toast.success("Đã hủy đơn", {
            position: "bottom-right",
            autoClose: 1000,
        })
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className='bg-gray-200'>
            <Header />
            <Container style={{ flex: 1 }} maxWidth="sm">
                <Grid container sx={{ marginTop: 1, marginBottom: 1 }}>
                    <Grid item xs={7}>
                        <Typography align="center" variant="h5" color={"chocolate"}>Thông tin đăng ký</Typography>
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
                            <Button onClick={handleClose}>Đồng ý</Button>
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
                            B1
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            B106
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Phòng 8 người ở
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            2
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            Không
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            170.000
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            2023-2024 - học kỳ 1
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                            7 tháng
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center", color: "red" }}>
                            Chờ được duyệt
                        </Paper>
                        <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center", color: "green" }}>
                            1.350.000đ
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default RegisterFormPage;