import { Container, Grid, Typography, CardMedia, CardContent, CardActionArea, Card, Divider, Pagination, Stack, Button } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from "react";
import { getAllNotification, getOneNotification } from "../api/notification.api";



const EventPage = () => {
    const [event, setEvent] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [oneEvent, setOneEvent] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = async (id) => {
        const res = await getOneNotification(id);
        setOneEvent(res)
        setOpen(true);
    };

    const handleClose = () => {
        setOneEvent({});
        setOpen(false);
    };
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllNotification(currentPage);
            setEvent(res.data);
        }
        fetchApi();
    }, [currentPage]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="bg-gray-200">
            <Header />
            <Grid style={{ flex: 1 }}>
                <Container maxWidth="lg">
                    <div className="p-2 rounded-md shadow-md bg-white">
                        <h2 className="bg-blue-100 text-blue-600 font-semibold text-md px-4 py-2 underline">TIN TỨC - SỰ KIỆN - THÔNG BÁO</h2>
                        <Grid container p={2}>
                            {
                                event?.data?.map((e) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} padding={2} key={e?.id}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea onClick={() => handleClickOpen(e?.id)}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="http://benhvientravinh.com.vn/upload/1002175/20230410/hinh-anh-thong-bao_9488c6da2d.png"
                                                    alt="green iguana"
                                                />
                                                <Divider />
                                                <CardContent>
                                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ display: "flex" }}>
                                                        <EventAvailableIcon color="error" fontSize="small" /> <Typography fontSize={15} marginLeft={2} color={"GrayText"}>{(new Date(e?.createdAt).toLocaleDateString('en-GB'))}</Typography>
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={"bold"} color="text.secondary">
                                                        {e?.topic}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>

                                    </Grid>
                                ))
                            }
                            
                        </Grid>
                        <Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination
                                // count={10}
                                count={Math.ceil(event?.total / event?.data_per_page)}
                                page={currentPage}
                                // // rowsPerPage={data?.data_per_page}
                                color="primary"
                                onChange={handleChangePage}
                            />
                        </Stack>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {oneEvent?.data?.topic}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {oneEvent?.data?.content}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={handleClose}>Đóng lại</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Container>
            </Grid>
            <Footer />
        </div>
    );
}

export default EventPage;