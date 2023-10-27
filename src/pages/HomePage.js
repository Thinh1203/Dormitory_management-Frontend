import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography, Button, Tooltip, Grid, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Pagination, Stack, OutlinedInput } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getRoomList, getRoomInformation, getAllSchoolYear, registerRoom } from '../api/room.api';
import { checkForm, checkStudentRoom } from '../api/registrationForm.api';
import { capacity } from '../utils/data';
import { toast } from 'react-toastify';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [checkRegisterForm, setCheckRegisterForm] = React.useState(false);
    const [checkStudentInRoom, setCheckStudentInRoom] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [roomRegister, setRoomRegister] = React.useState({});
    const [schoolYear, setShoolYear] = React.useState({});
    const [filter, setFilter] = React.useState({ capacity: "", roomMale: "", kitchen: "", empty: "" });
    const [formRegister, setFormRegister] = React.useState({ roomId: 0, schoolYearId: 0, registrationTime: 0, wish: "" });

    const handleClose = () => {
        setOpen(false);
    };

    const closeRigester = () => {
        setId(0);
        setFormRegister({ roomId: 0, schoolYearId: 0, registrationTime: 0, wish: "" });
        setOpenRegister(false);
    }

    const fetchApi = async () => {
        const res = await getRoomList(currentPage, search, filter);
        setData(res.data);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const roomInformation = async () => {
        const res = await getRoomInformation(id);
        setRoomRegister(res.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerRoom(formRegister);
        if (res.status === 200) {
            setOpenRegister(false);
            setRefresh(refresh => refresh + 1);
            toast.success("Đăng ký thành công!", { position: "bottom-right", autoClose: 1000 });
        }
    }

    useEffect(() => {
        roomInformation();
    }, [id]);

    useEffect(() => {
        fetchApi();
    }, [currentPage, search, refresh]);

    useEffect(() => {
        const checkFormUser = async () => {
            const res = await checkForm();
            if (res.status === 200 && res.data.registrationForm.registrationStatus < 1) {
                setCheckRegisterForm(true);
            }

        };
        checkFormUser();
    }, []);

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
        const getSchoolYear = async () => {
            const res = await getAllSchoolYear();
            setShoolYear(res.data);
        }
        getSchoolYear();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Grid style={{ flex: 1 }}>
                <Grid container>
                    <Grid item xs={3}>
                        <div className='pl-4 text-blue-700 font-bold underline mt-1 text-xs md:text-lg lg:text-xl'>
                            Xem tình trạng phòng
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        {
                            (checkRegisterForm) ? (
                                <Link to="/dondangky">
                                    <div className='px-2 text-blue-700 font-bold underline hover:text-red-500 cursor-pointer text-xs md:text-lg lg:text-xl mt-1'>
                                        Xem đơn đăng ký
                                    </div>
                                </Link>
                            ) : " "
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <OutlinedInput
                            onChange={(e) => setSearch(e.target.value)}
                            fullWidth
                            placeholder="A100, B101..."
                            sx={{ maxHeight: 40, marginY: "3px" }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography align='right' className='px-4'>
                            <Tooltip title="Filter list" >
                                <IconButton onClick={() => setOpen(true)}>
                                    <FilterListIcon className='text-blue-700' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Refresh" >
                                <IconButton onClick={() => {
                                    setFilter({
                                        capacity: "",
                                        roomMale: "",
                                        kitchen: "",
                                        empty: ""
                                    });
                                    setCurrentPage(1);
                                    setRefresh(0);
                                    fetchApi();
                                }}>
                                    <RefreshIcon className='text-blue-700' />
                                </IconButton>
                            </Tooltip>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">

                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={() => setOpen(false)}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent dividers>
                                    <Box sx={{ minWidth: 200, paddingBottom: "8px" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sức chứa</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"

                                                label="Sức chứa"
                                                onChange={(e) => setFilter({ ...filter, capacity: e.target.value })}
                                            >
                                                {capacity?.map((e, index) => (
                                                    <MenuItem value={e} key={index}>{e}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ minWidth: 200, paddingBottom: "8px" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Phòng Nam/Nữ</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"

                                                label="Phòng Nam/Nữ"
                                                onChange={(e) => setFilter({ ...filter, roomMale: e.target.value })}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="Nam">Nam</MenuItem>
                                                <MenuItem value="Nữ">Nữ</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ minWidth: 200, paddingBottom: "8px" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Phòng còn chỗ</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"

                                                label="Phòng còn chỗ"
                                                onChange={(e) => setFilter({ ...filter, empty: e.target.value })}
                                            >
                                                <MenuItem value={1}>Còn</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ minWidth: 300, paddingBottom: "8px" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Phòng nấu ăn</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"

                                                label="Phòng nấu ăn"
                                                onChange={(e) => setFilter({ ...filter, kitchen: e.target.value })}
                                            >
                                                <MenuItem value={true}>Có</MenuItem>
                                                <MenuItem value={false}>Không</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={() => { handleClose(); setRefresh(refresh => refresh + 1); }}>
                                        Lọc
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        </Typography>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} className='px-4'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow className='bg-blue-500'>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>STT</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Mã phòng</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Mã tòa nhà</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Loại phòng</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Phòng Nam/Nữ</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Trạng thái phòng</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Sức chứa</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Số chỗ ở thực tế</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Đã ở</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Còn trống</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Phòng nấu ăn</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}>Đơn giá (VNĐ)</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: "bold" }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data ? data?.data?.map((e, index) => (
                                <TableRow
                                    className={index % 2 == 0 ? 'bg-gray-100' : ''}
                                    style={{ padding: "4px" }}
                                    key={e.id}
                                >
                                    <TableCell align="center" component="th" scope="row" style={{ padding: "4px" }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.roomCode}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.building.areaCode}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.roomType}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.roomMale}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{(e?.status) ? "Đang sử dụng" : "Đang bảo trì"}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.capacity}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.actualCapacity}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.wereThere}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.empty}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{(e?.kitchen) ? "Có thể" : "Không thể"}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{e?.price && e?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }} >
                                        <Button
                                            variant="outlined"
                                            size='small'
                                            disabled={!e?.status || (e?.empty < 1) || checkRegisterForm || checkStudentInRoom}
                                            onClick={() => { setId(e?.id); setOpenRegister(true); roomInformation(); setFormRegister({ ...formRegister, roomId: e?.id }); }}
                                        >
                                            Đăng ký
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={12} align="center" component="th" scope="row" style={{ padding: "4px" }}>
                                        Không có dữ liệu
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <Dialog open={openRegister} onClose={handleClose} fullWidth={true}>
                            <form>
                                <DialogTitle color={'blueviolet'} align='center'>Thông tin đăng ký</DialogTitle>
                                <DialogContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
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
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 6, marginBottom: 5, textAlign: "center" }}>
                                                Năm học
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 6, marginBottom: 5, textAlign: "center" }}>
                                                Thời gian (tháng)
                                            </Paper>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                {roomRegister?.building?.areaCode}
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                {roomRegister?.roomCode}
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                {roomRegister?.roomType}
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                {roomRegister?.empty}
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                {roomRegister?.status ? "Có thể" : "Không"}
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                {roomRegister?.price && roomRegister?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                            </Paper>
                                            <FormControl sx={{ maxHeight: 250, marginBottom: "2px" }} fullWidth size='small'>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={""}
                                                    // label="Phòng Nam/Nữ"
                                                    onChange={(e) => setFormRegister({ ...formRegister, schoolYearId: e.target.value })}
                                                    MenuProps={MenuProps}
                                                >
                                                    {(schoolYear !== undefined && schoolYear.length > 0) && schoolYear?.map((e) => (
                                                        <MenuItem key={e?.id} value={e?.id}>Học kỳ {e?.semester} Năm {e?.year}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ maxHeight: 250 }} fullWidth size='small'>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={formRegister.registrationTime > 0 ? formRegister?.registrationTime : 1}
                                                    // label="Phòng Nam/Nữ"
                                                    onChange={(e) => setFormRegister({ ...formRegister, registrationTime: e.target.value })}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="5">5</MenuItem>
                                                    <MenuItem value="6">6</MenuItem>
                                                    <MenuItem value="7">7</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <textarea onChange={(e) => setFormRegister({ ...formRegister, wish: e.target.value })} id="message" rows="2" class="block p-2.5 mt-2 ml-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyện vọng đăng ký"></textarea>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button' variant='outlined' color='inherit' onClick={closeRigester}>
                                        Đóng lại
                                    </Button>
                                    <Button type='submit' variant='outlined' color='success' onClick={(e) => handleSubmit(e)}>
                                        Đăng ký
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </Table>
                </TableContainer>
                {data && (<Stack spacing={2} padding={2} className='flex justify-center items-center'>
                    <Pagination
                        count={Math.ceil(data?.total / data?.data_per_page)}
                        page={currentPage}
                        // rowsPerPage={data?.data_per_page}
                        color="primary"
                        onChange={handleChangePage}
                    />
                </Stack>)}
            </Grid>
            <Footer />
        </div>
    );
}

export default HomePage;
