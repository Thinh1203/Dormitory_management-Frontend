import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography, Button, Tooltip, Grid, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Pagination, Stack } from "@mui/material";
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
import { Link } from 'react-router-dom';

function createData(maPhong, maToaNha, loaiPhong, phongNam, trangThai, sucChua, soChoOThucTe, daO, conTrong, gia, phongNauAn) {
    return { maPhong, maToaNha, loaiPhong, phongNam, trangThai, sucChua, soChoOThucTe, daO, conTrong, gia, phongNauAn };
}

const rows = [
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),


];
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

const toaNha = [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"
]

const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [toaNha1, setToaNha1] = React.useState("");
    const [gioiTinh, setGioiTinh] = React.useState("Nam");
    const [thoiGian, setThoiGian] = React.useState(1);
    const [sucChua, setSucChua] = React.useState(0);
    const [nauAn, setNauAn] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const closeRigester = () => {
        setOpenRegister(false);
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Grid style={{ flex: 1 }}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant="h6" align='left' className='pl-4 text-blue-700 font-bold underline'>
                            Xem tình trạng phòng
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/dondangky">
                            <Typography variant="h6" align='left' className='pl-4 text-blue-700 font-bold underline hover:text-red-400 cursor-pointer'>
                                Xem đơn đăng ký
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='right' className='px-4'>
                            <Tooltip title="Filter list" >
                                <IconButton onClick={() => setOpen(true)}>
                                    <FilterListIcon className='text-blue-700' />
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
                                            <InputLabel id="demo-simple-select-label">Tòa nhà</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={toaNha1}
                                                label="Tòa nhà"
                                                onChange={(e) => setToaNha1(e.target.value)}
                                            >
                                                {toaNha?.map((e, index) => (
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
                                                value={gioiTinh}
                                                label="Phòng Nam/Nữ"
                                                onChange={(e) => setGioiTinh(e.target.value)}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="Nam">Nam</MenuItem>
                                                <MenuItem value="Nữ">Nữ</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ minWidth: 200, paddingBottom: "8px" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sức chứa</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sucChua}
                                                label="Sức chứa"
                                                onChange={(e) => setSucChua(e.target.value)}
                                            >
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ minWidth: 300, paddingBottom: "8px" }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Phòng nấu ăn</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={"nauAn"}
                                                label="Phòng nấu ăn"
                                                onChange={(e) => {
                                                    console.log(nauAn);
                                                    setNauAn(e.target.value)
                                                }}
                                            >
                                                <MenuItem value={true}>Có thể</MenuItem>
                                                <MenuItem value={false}>Không thể</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
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
                            {rows.map((row, index) => (
                                <TableRow
                                    className={index % 2 == 0 ? 'bg-gray-100' : ''}
                                    style={{ padding: "4px" }}
                                    key={index}
                                >
                                    <TableCell align="center" component="th" scope="row" style={{ padding: "4px" }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.maPhong}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.maToaNha}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.loaiPhong}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.phongNam}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.trangThai}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.sucChua}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.soChoOThucTe}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.daO}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.conTrong}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.phongNauAn}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }}>{row.gia}</TableCell>
                                    <TableCell align="center" style={{ padding: "2px" }} >
                                        <Button variant="outlined" size='small' onClick={() => setOpenRegister(true)}>Đăng ký</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
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
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                Năm học
                                            </Paper>
                                            <Paper className='md:text-base text-sm' variant='outlined' style={{ padding: 5, marginBottom: 5, textAlign: "center" }}>
                                                Thời gian (tháng)
                                            </Paper>

                                        </Grid>
                                        <Grid item xs={6}>
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
                                            <FormControl sx={{ maxHeight: 250, marginBottom: "2px" }} fullWidth size='small'>
                                                <Select

                                                    sx={{ textAlign: "center" }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={gioiTinh}
                                                    // label="Phòng Nam/Nữ"
                                                    onChange={(e) => setGioiTinh(e.target.value)}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem value="Nam">Nam</MenuItem>
                                                    <MenuItem value="Nữ">Nữ</MenuItem>

                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ maxHeight: 250 }} fullWidth size='small'>
                                                <Select
                                                    sx={{ textAlign: "center" }}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={thoiGian}
                                                    // label="Phòng Nam/Nữ"
                                                    onChange={(e) => setThoiGian(e.target.value)}
                                                    MenuProps={MenuProps}
                                                >
                                                    <MenuItem textAlign="center" value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="5">5</MenuItem>
                                                    <MenuItem value="6">6</MenuItem>
                                                    <MenuItem value="7">7</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button' variant='outlined' color='inherit' onClick={closeRigester}>
                                        Đóng lại
                                    </Button>
                                    <Button type='submit' variant='outlined' color='success' onClick={closeRigester}>
                                        Đăng ký
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </Table>
                </TableContainer>
                <Stack spacing={2} padding={2} className='flex justify-center items-center'>
                    <Pagination count={10} color="primary" />
                </Stack>
            </Grid>
            <Footer />
        </div>
    );
}

export default HomePage;
