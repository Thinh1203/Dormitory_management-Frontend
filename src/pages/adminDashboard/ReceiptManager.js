import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Button, TextField, MenuItem, Dialog, DialogActions, Box, Paper, DialogContent, DialogContentText, DialogTitle, Divider, Stack, Pagination, Tooltip } from '@mui/material';
import { CustomTabPanel } from '../../utils/createTheme';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import { addNewReceipt, getAllReceipt, getOneReceipt, updateOne, uploadFileData } from '../../api/receipt.api';
import { listMonth } from '../../utils/data';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { getAllSchoolYear, getListRoom } from '../../api/room.api';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAreaCode } from '../../api/Building.api';
import InputAdornment from '@mui/material/InputAdornment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [theme.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

const drawerWidth = 256;



const ReceiptManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [search, setSearch] = React.useState("");
    const [dataBuildingList, setDataBuildingList] = React.useState([]);
    const [filter, setFilter] = React.useState({
        month: '',
        schoolyearId: '',
        paymentStatus: '',
    });
    const [query, setQuery] = React.useState({ id: 0 });
    const [currentPage, setCurrentPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [detailData, setDetailData] = React.useState({});
    const [id, setId] = React.useState(0);
    const [listSchoolYear, setListSchoolYear] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [addData, setAddData] = React.useState({
        month: '',
        oldElectricityIndicator: '',
        newElectricityIndicator: '',
        oldWaterIndicator: '',
        newWaterIndicator: '',
        roomId: '',
        schoolyearId: ''
    });
    const [list, setList] = React.useState([]);
    const [reset, setReset] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const updateOneReceipt = async (id, data) => {
        const res = await updateOne(id, data);
        if (res?.status === 200) {
            setId(id);
            return toast.success('Đã thanh toán!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    const detailOneReceipt = async (id) => {
        const res = await getOneReceipt(id);
        // console.log(res.data);
        setDetailData({
            oldElectricityIndicator: res?.data.oldElectricityIndicator,
            newElectricityIndicator: res?.data.newElectricityIndicator,
            oldWaterIndicator: res?.data.oldWaterIndicator,
            newWaterIndicator: res?.data.newWaterIndicator,
            totalElectricityBill: res?.data.receipt?.totalElectricityBill,
            totalWaterBill: res?.data.receipt?.totalWaterBill
        });
        setOpenDetail(true);

    };

    const handleAddReceipt = async () => {
        if (!addData.month ||
            !addData.newElectricityIndicator ||
            !addData.newWaterIndicator ||
            !addData.oldElectricityIndicator ||
            !addData.oldWaterIndicator ||
            !addData.schoolyearId ||
            !addData.roomId) {
            return toast.error("Vui lòng điền đầy đủ thông tin!", { position: "bottom-right", autoClose: 1000 });
        }
        const res = await addNewReceipt(addData);
        if (res?.status === 200) {
            setOpen(false);
            setAddData({
                month: '',
                oldElectricityIndicator: '',
                newElectricityIndicator: '',
                oldWaterIndicator: '',
                newWaterIndicator: '',
                roomId: '',
                schoolyearId: ''
            });
            setQuery({ id: 0 });
            return toast.success("Thêm thành công!", { position: "bottom-right", autoClose: 1000 });
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const res = await uploadFileData(file);
        if (res?.status === 200) {
            setReset(1);
            return toast.success("Thêm thành công!", { position: "bottom-right", autoClose: 1000 });
        }
    }

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllSchoolYear();
            setListSchoolYear(res.data)
        };
        fetchApi();
    }, []);

    React.useEffect(() => {
        const fetchApiListBuilding = async () => {
            const res = await getAreaCode();
            setDataBuildingList(res.data);
        };
        fetchApiListBuilding();
    }, []);

    React.useEffect(() => {
        const fetchListRoom = async () => {
            const res = await getListRoom(query);
            setList(res.data);

        };
        fetchListRoom();
    }, [query]);

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getAllReceipt(currentPage, filter, search);
            setData(res.data);
        };
        fetchData();
    }, [currentPage, filter, search, id, open, reset]);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    )}

                    <Navigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                    />
                </Box>
                <div className='w-full bg-gray-200'>
                    <div className='bg-white p-5 mt-5 mx-5 rounded-t-md'>
                        {/* <h2>
                            Bộ lọc
                        </h2> */}
                        <div className='grid grid-cols-1 sm:grid-cols-5 mt-2'>
                            <div className='flex my-2'>
                                <TextField
                                    select
                                    label="Trạng thái thanh toán"
                                    value={(filter.paymentStatus === '') ? '' : filter.paymentStatus}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                    onChange={(e) => setFilter({ ...filter, paymentStatus: e.target.value })}
                                >
                                    <MenuItem value={true} >
                                        Đã thanh toán
                                    </MenuItem>
                                    <MenuItem value={false} >
                                        Chưa thanh toán
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <TextField
                                    select
                                    label="Năm học - học kỳ"
                                    value={(filter.schoolyearId === '') ? '' : filter.schoolyearId}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                    onChange={(e) => setFilter({ ...filter, schoolyearId: e.target.value })}
                                >
                                    {
                                        listSchoolYear && listSchoolYear?.map((e, index) => (
                                            <MenuItem key={index} value={e.id}>
                                                Năm học {e.year} - học kỳ {e.semester}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <TextField
                                    label="Mã phòng"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                            </div>
                            <div className='flex my-2'>
                                <TextField
                                    select
                                    label="Tháng"
                                    value={(filter.month === '') ? '' : filter.month}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                    onChange={(e) => setFilter({ ...filter, month: e.target.value })}
                                >
                                    {
                                        listMonth.map((e, index) => (
                                            <MenuItem key={index} value={e}>
                                                Tháng {e}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>

                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <Tooltip title="Bỏ lọc" placement="top" onClick={() => setFilter({
                                    month: '',
                                    schoolyearId: '',
                                    paymentStatus: '',
                                })}>
                                    <Button variant='contained' size='large' sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}>
                                        <FilterAltOffIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Ghi hóa đơn" placement="top" onClick={() => setOpen(true)}>
                                    <Button variant='contained' size='large' color='success' sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}>
                                        <AddCircleIcon />
                                    </Button>
                                </Tooltip>
                                <div>
                                    <Tooltip title="Tải tệp lên" placement="top">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="warning"
                                            sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}
                                        >
                                            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                                <DriveFolderUploadIcon />
                                            </label>
                                        </Button>
                                    </Tooltip>

                                    <input
                                        id="file-upload"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <Dialog open={open} >
                                    <DialogTitle color='blue'>Ghi chỉ số điện nước</DialogTitle>
                                    <DialogContent sx={{ width: 600 }}>
                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='w-full my-2'>
                                                <TextField
                                                    select
                                                    label="Chọn tòa nhà"
                                                    value={query.id > 0 ? query.id : ''}
                                                    onChange={(e) => setQuery({ id: e.target.value })}
                                                    sx={{ maxWidth: 300, marginBottom: 1 }}
                                                    fullWidth
                                                >
                                                    {dataBuildingList && dataBuildingList?.map((e) => (
                                                        <MenuItem key={e.id} value={e.id}>
                                                            Khu {e.area} {"-"} dãy {e.areaCode}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <TextField
                                                    select
                                                    label="Năm học - học kỳ"
                                                    value={addData.schoolyearId}
                                                    onChange={(e) => setAddData({ ...addData, schoolyearId: e.target.value })}
                                                    sx={{ maxWidth: 300, marginBottom: 1 }}
                                                    fullWidth
                                                >
                                                    {
                                                        listSchoolYear && listSchoolYear?.map((e, index) => (
                                                            <MenuItem key={index} value={e.id}>
                                                                Năm học {e.year} - học kỳ {e.semester}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </TextField>

                                                <TextField
                                                    label="Chỉ số điện cũ"
                                                    id="outlined-start-adornment"
                                                    type='number'
                                                    value={addData.oldElectricityIndicator}
                                                    sx={{ maxWidth: 300, marginBottom: 1 }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">kW</InputAdornment>,
                                                    }}
                                                    onChange={(e) => setAddData({ ...addData, oldElectricityIndicator: e.target.value })}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="Chỉ số nước cũ"
                                                    id="outlined-start-adornment"
                                                    type='number'
                                                    sx={{ maxWidth: 300 }}
                                                    value={addData.oldWaterIndicator}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">m&#xB3;</InputAdornment>,
                                                    }}
                                                    onChange={(e) => setAddData({ ...addData, oldWaterIndicator: e.target.value })}
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='w-full my-2'>
                                                <TextField
                                                    select
                                                    label="Chọn phòng"
                                                    value={addData.roomId}
                                                    onChange={(e) => setAddData({ ...addData, roomId: e.target.value })}
                                                    sx={{ maxWidth: 300, marginBottom: 1 }}
                                                    fullWidth
                                                >
                                                    {(list && list?.length > 0) ? list?.map((e) => (
                                                        <MenuItem key={e.id} value={e.id}>
                                                            Phòng {e.roomCode}
                                                        </MenuItem>
                                                    )) :
                                                        <MenuItem value=''>
                                                            Phòng không tồn tại
                                                        </MenuItem>
                                                    }
                                                </TextField>
                                                <TextField
                                                    select
                                                    label="Tháng"
                                                    value={addData.month}
                                                    sx={{ maxWidth: 300, marginBottom: 1 }}
                                                    fullWidth
                                                    onChange={(e) => setAddData({ ...addData, month: e.target.value })}
                                                >
                                                    {
                                                        listMonth.map((e, index) => (
                                                            <MenuItem key={index} value={e}>
                                                                Tháng {e}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </TextField>
                                                <TextField
                                                    label="Chỉ số điện mới"
                                                    id="outlined-start-adornment"
                                                    type='number'
                                                    value={addData.newElectricityIndicator}
                                                    sx={{ maxWidth: 300, marginBottom: 1 }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">kW</InputAdornment>,
                                                    }}
                                                    onChange={(e) => setAddData({ ...addData, newElectricityIndicator: e.target.value })}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="Chỉ số nước mới"
                                                    id="outlined-start-adornment"
                                                    type='number'
                                                    sx={{ maxWidth: 300 }}
                                                    value={addData.newWaterIndicator}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">m&#xB3;</InputAdornment>,
                                                    }}
                                                    onChange={(e) => setAddData({ ...addData, newWaterIndicator: e.target.value })}
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpen(false)}>Đóng lại</Button>
                                        <Button onClick={() => handleAddReceipt()}>Lưu lại</Button>
                                    </DialogActions>
                                </Dialog>

                            </div>
                        </div>

                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                {/* <caption>
                                    Tổng số tiền thu được: {data?.totalReceipt ? data.totalReceipt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" : "0đ"}
                                </caption> */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className='border-r-2'>Mã phòng</TableCell>
                                        <TableCell align="center" className='border-r-2'>Khu vực</TableCell>
                                        <TableCell align="center" className='border-r-2'>Tháng</TableCell>
                                        <TableCell align="center" className='border-r-2'>Năm học</TableCell>
                                        <TableCell align="center" className='border-r-2'>Học kỳ</TableCell>
                                        {/* <TableCell align="center" className='border-r-2'>Tiền điện</TableCell>
                                        <TableCell align="center" className='border-r-2'>Tiền nước</TableCell> */}
                                        <TableCell align="center" className='border-r-2'>Tổng số tiền</TableCell>
                                        <TableCell align="center" className='border-r-2'>Trạng thái thanh toán</TableCell>
                                        <TableCell align="center" className='border-r-2'>Ngày thanh toán</TableCell>
                                        <TableCell align="center" className='border-r-2'>Hành động</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? data?.data?.map((e) => (
                                        <TableRow key={e.id}>
                                            <TableCell align="center" className='border-r-2'>{e.room.roomCode}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.room.building.areaCode}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.month}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.schoolyear.year}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.schoolyear.semester}</TableCell>
                                            {/* <TableCell align="center" className='border-r-2'>{e.receipt.totalElectricityBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'}</TableCell> */}
                                            {/* <TableCell align="center" className='border-r-2'>{e.receipt.totalWaterBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'}</TableCell> */}
                                            <TableCell align="center" className='border-r-2'>{e.receipt.totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'}</TableCell>
                                            <TableCell align="center" className='border-r-2'>
                                                {e.receipt.paymentStatus ?
                                                    (<p className='text-green-600 font-medium'>Đã thanh toán</p>) :
                                                    (<p className='text-red-600 font-medium'>Chưa thanh toán</p>)
                                                }
                                            </TableCell>
                                            <TableCell align="center" className='border-r-2'>
                                                {e.receipt.paymentStatus ?
                                                    (<p className='text-blue-600 font-semibold'>
                                                        {new Date(e.receipt.updatedAt).toLocaleString('en-GB', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            second: 'numeric',
                                                            day: 'numeric',
                                                            month: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </p>) : ''}
                                            </TableCell>
                                            <TableCell align="center" className='border-r-2'>
                                                <Tooltip title="Xác nhận" placement="top">
                                                    <Button
                                                        variant='outlined'
                                                        color='success'
                                                        size='small'
                                                        disabled={e.receipt.paymentStatus}
                                                        onClick={() => updateOneReceipt(e.receipt.id, { paymentStatus: true })}
                                                    >
                                                        <DoneOutlineIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Xem chi tiết" placement="top">
                                                    <Button
                                                        sx={{ marginX: 1 }}
                                                        variant='outlined'
                                                        size='small'
                                                        color='warning'
                                                        onClick={() => detailOneReceipt(e.id)}
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </Button>
                                                </Tooltip>


                                            </TableCell>

                                        </TableRow>
                                    )) :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={12} align="center" component="th" scope="row" style={{ padding: "4px", color: "red", fontSize: "20px" }}>
                                                    Không có dữ liệu
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                                <Dialog open={openDetail} >
                                    <DialogTitle color='blue'>Thông tin chỉ số điện nước</DialogTitle>
                                    <DialogContent sx={{ width: 600 }}>
                                        <div className='grid grid-cols-2 '>
                                            <div className='w-full my-2'>
                                                <TextField
                                                    label="Chỉ số điện cũ"
                                                    id="outlined-start-adornment"
                                                    value={detailData ? detailData?.oldElectricityIndicator : ''}
                                                    sx={{ paddingX: 0.5, marginY: 1 }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">kW</InputAdornment>,
                                                    }}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="Chỉ số điện mới"
                                                    id="outlined-start-adornment"
                                                    sx={{ paddingX: 0.5 }}
                                                    value={detailData ? detailData?.newElectricityIndicator : ''}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">kW</InputAdornment>,
                                                    }}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="Chỉ số điện sử dụng"
                                                    id="outlined-start-adornment"
                                                    sx={{ paddingX: 0.5, marginY: 1 }}
                                                    fullWidth
                                                    value={detailData ? (detailData?.newElectricityIndicator - detailData?.oldElectricityIndicator) : ''}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">kW</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    label="Tổng tiền điện"
                                                    id="outlined-start-adornment"
                                                    sx={{ paddingX: 0.5, marginY: 1 }}
                                                    fullWidth
                                                    value={detailData ? detailData?.totalElectricityBill?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">đ</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                            <div className='w-full my-2'>
                                                <TextField
                                                    label="Chỉ số nước cũ"
                                                    id="outlined-start-adornment"
                                                    fullWidth
                                                    value={detailData ? detailData?.oldWaterIndicator : ''}
                                                    sx={{ paddingX: 0.5, marginY: 1 }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">m&#xB3;</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    label="Chỉ số nước mới"
                                                    id="outlined-start-adornment"
                                                    fullWidth
                                                    sx={{ paddingX: 0.5 }}
                                                    value={detailData ? detailData?.newWaterIndicator : ''}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">m&#xB3;</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    label="Chỉ số nước sử dụng"
                                                    id="outlined-start-adornment"
                                                    fullWidth
                                                    value={detailData ? (detailData?.newWaterIndicator - detailData?.oldWaterIndicator) : ''}
                                                    sx={{ paddingX: 0.5, marginY: 1 }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">m&#xB3;</InputAdornment>,
                                                    }}
                                                />
                                                <TextField
                                                    label="Tổng tiền nước"
                                                    id="outlined-start-adornment"
                                                    sx={{ paddingX: 0.5, marginY: 1 }}
                                                    fullWidth
                                                    value={detailData ? detailData?.totalWaterBill?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="start">đ</InputAdornment>,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenDetail(false)}>Đóng lại</Button>
                                    </DialogActions>
                                </Dialog>
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination count={Math.ceil(data?.total / data?.data_per_page)}
                                page={currentPage}
                                // rowsPerPage={data?.data_per_page}
                                color="primary"
                                onChange={handleChangePage} />
                        </Stack>
                    </div>
                </div>
            </Box>
        </ThemeProvider >

    );
}


export default ReceiptManager;