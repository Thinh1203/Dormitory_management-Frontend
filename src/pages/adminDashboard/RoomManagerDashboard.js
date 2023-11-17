import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Button, Tooltip, TextField, MenuItem, Dialog, DialogActions, DialogContent, IconButton, DialogTitle, Divider, Stack, Pagination, DialogContentText, Slide } from '@mui/material';
import { CustomTabPanel } from '../../utils/createTheme';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { addRoom, deleteRoom, getAllListBuilding, getRoomInformation, getRoomList, updateInformationRoom } from '../../api/room.api';
import { toast } from 'react-toastify';
import { actualCapacity, capacity, ListRoomType } from '../../utils/data';
import { Link } from 'react-router-dom';




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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const drawerWidth = 256;
const RoomManagerDashboard = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAddRoom, setOpenAddRoom] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState({ areaCode: "" });
    const [dataRoomList, setDataRoomList] = React.useState([]);
    const [dataBuildingList, setDataBuildingList] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [addNewRoom, setAddNewRoom] = React.useState({ roomCode: "", roomType: "", capacity: 0, actualCapacity: 0, roomMale: "", kitchen: "", price: 0, buildingId: 0 });
    const [updateRoom, setUpdateRoom] = React.useState({ roomCode: "", roomType: "", capacity: 0, actualCapacity: 0, roomMale: "", kitchen: "", price: 0, status: "" });
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const fetchApiListRoom = async () => {
        const res = await getRoomList(currentPage, search, filter);
        setDataRoomList(res.data);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleEdit = async (idRoom) => {
        const res = await getRoomInformation(idRoom);
        setUpdateRoom({
            status: res.data.status,
            roomCode: res.data.roomCode,
            roomType: res.data.roomType,
            capacity: res.data.capacity,
            actualCapacity: res.data.actualCapacity,
            roomMale: res.data.roomMale,
            kitchen: res.data.kitchen,
            price: res.data.price
        });
        setOpenEdit(true);
    };

    const handleUpdate = async () => {
        const res = await updateInformationRoom(id, updateRoom);
        if (res.status === 200) {
            setOpenEdit(false);
            setId(0);
            return toast.success("Đã cập nhật!", { position: "bottom-right", autoClose: 1000 });
        } else {
            setOpenEdit(false);
            setId(0);
            return toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
        }
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAddRoom = async () => {
        if (
            addNewRoom.actualCapacity < 1
            || addNewRoom.buildingId < 1
            || addNewRoom.capacity < 1
            || addNewRoom.price < 1
            || addNewRoom.roomCode.length < 1
            || addNewRoom.roomMale.length < 1
            || addNewRoom.roomType.length < 1
        ) {
            return toast.error("Vui lòng điền đầy đủ thông tin!", { position: "bottom-right", autoClose: 1000 });
        }
        const res = await addRoom(addNewRoom);
        if (res.status === 200) {
            setOpenAddRoom(false);
            setAddNewRoom({ roomCode: "", roomType: "", capacity: 0, actualCapacity: 0, roomMale: "", kitchen: "", price: 0, buildingId: 0 });
            return toast.success("Thêm thành công!", { position: "bottom-right", autoClose: 1000 });
        } else
            return toast.error("Phòng đã tồn tại!", { position: "bottom-right", autoClose: 1000 });

    }

    const handleDelete = async () => {
        const res = await deleteRoom(id);
        if (res.status === 200) {
            setOpenDelete(false);
            setId(0);
            toast.success("Đã xóa!", { position: "bottom-right", autoClose: 1000 });
        } else {
            setOpenDelete(false);
            setId(0);
            toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
        }
    }

    React.useEffect(() => {
        fetchApiListRoom();
    }, [currentPage, search, filter, id, openAddRoom]);

    React.useEffect(() => {
        const fetchApiListBuilding = async () => {
            const res = await getAllListBuilding();
            setDataBuildingList(res.data);
        };
        fetchApiListBuilding();
    }, []);

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
                    <div className='bg-white p-5 mx-5 rounded-md'>
                        <h2>
                            Bộ lọc
                        </h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2'>
                            <div className='flex my-2 mx-2'>
                                <TextField
                                    select
                                    label="Chọn tòa nhà"
                                    value={filter.areaCode}
                                    onChange={(e) => { setFilter({ areaCode: e.target.value }); setCurrentPage(1) }}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                >
                                    {dataBuildingList && dataBuildingList?.map((e) => (
                                        <MenuItem key={e.id} value={e.areaCode}>
                                            Khu {e.area} {"-"} dãy {e.areaCode}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Tooltip title="Bỏ lọc" placement="top" onClick={() => setFilter({ areaCode: "" })}>
                                    <Button variant='contained' size='large' sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}>
                                        <FilterAltOffIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <TextField
                                    onChange={(e) => setSearch(e.target.value)}
                                    label="Tìm kiếm phòng"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                />

                                <Button onClick={() => setOpenAddRoom(true)} variant='contained' color='success' size='small' sx={{ paddingY: 2, marginLeft: 2, maxHeight: 54 }}>
                                    Thêm phòng
                                </Button>
                            </div>
                            <Dialog open={openAddRoom} onClose={() => setOpenAddRoom(false)}>
                                <DialogTitle color="blue">Thêm mới phòng </DialogTitle>
                                <DialogContent sx={{ maxWidth: 800 }}>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <TextField
                                                select
                                                label="Chọn tòa nhà"
                                                value={addNewRoom.buildingId < 1 ? "" : addNewRoom.buildingId}
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, buildingId: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2, marginTop: 1 }}
                                                fullWidth

                                            >
                                                {dataBuildingList && dataBuildingList?.map((e) => (
                                                    <MenuItem key={e.id} value={e.id}>
                                                        Tòa {e.areaCode}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                fullWidth
                                                label="Mã phòng"
                                                id="Mã phòng"
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, roomCode: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2 }}
                                            />

                                            <TextField
                                                select
                                                label="Loại phòng"
                                                value={addNewRoom.roomType}
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, roomType: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2 }}
                                                fullWidth

                                            >
                                                {ListRoomType.map((e, index) => (
                                                    <MenuItem key={index} value={e}>
                                                        {e}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                select
                                                label="Sức chứa"
                                                value={addNewRoom.capacity > 0 ? addNewRoom.capacity : ""}
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, capacity: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2 }}
                                                fullWidth

                                            >
                                                {capacity.map((e, index) => (
                                                    <MenuItem key={index} value={e}>
                                                        {e}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div>
                                            <TextField
                                                select
                                                label="Số chỗ ở thực tế"
                                                value={addNewRoom.actualCapacity > 0 ? addNewRoom.actualCapacity : ""}
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, actualCapacity: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2, marginTop: 1 }}
                                                fullWidth

                                            >
                                                {actualCapacity.map((e, index) => (
                                                    <MenuItem key={index} value={e}>
                                                        {e}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                select
                                                label="Phòng Nam/Nữ"
                                                value={addNewRoom.roomMale}
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, roomMale: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2 }}
                                                fullWidth

                                            >
                                                <MenuItem value="Nam">
                                                    Nam
                                                </MenuItem>

                                                <MenuItem value="Nữ">
                                                    Nữ
                                                </MenuItem>
                                            </TextField>

                                            <TextField
                                                select
                                                label="Phòng nấu ăn"
                                                value={addNewRoom.kitchen}
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, kitchen: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2 }}
                                                fullWidth

                                            >
                                                <MenuItem value={true}>
                                                    Có thể
                                                </MenuItem>
                                                <MenuItem value={false}>
                                                    Không thể
                                                </MenuItem>
                                            </TextField>

                                            <TextField
                                                fullWidth
                                                type='number'
                                                label="Giá phòng"
                                                id="Giá phòng"
                                                onChange={(e) => setAddNewRoom({ ...addNewRoom, price: e.target.value })}
                                                sx={{ maxWidth: 300, marginBottom: 2 }}
                                            />
                                        </div>
                                    </div>


                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenAddRoom(false)}>Hủy</Button>
                                    <Button onClick={handleAddRoom}>Thêm mới</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center' className='border-r-2 '>Mã phòng</TableCell>
                                        <TableCell align='center' className='border-r-2 '>Mã tòa nhà</TableCell>
                                        {/* <TableCell align='center' className='border-r-2'>Loại phòng</TableCell> */}
                                        <TableCell align='center' className='border-r-2'>Phòng Nam/Nữ</TableCell>
                                        <TableCell align='center' className='border-r-2'>Trạng thái</TableCell>
                                        <TableCell align='center' className='border-r-2'>Sức chứa</TableCell>
                                        <TableCell align='center' className='border-r-2'>Số chỗ ở thực tế</TableCell>
                                        <TableCell align='center' className='border-r-2'>Đã ở</TableCell>
                                        <TableCell align='center' className='border-r-2'>Còn trống</TableCell>
                                        <TableCell align='center' className='border-r-2'>Phòng nấu ăn</TableCell>
                                        <TableCell align='center' className='border-r-2'>Đơn giá</TableCell>
                                        <TableCell >{' '}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataRoomList ? dataRoomList?.data?.map((e) => (
                                        <TableRow
                                            key={e.id}

                                        >
                                            <TableCell align='center' className='border-r-2' >{e.roomCode}</TableCell>
                                            <TableCell align='center' className='border-r-2' >{e.building.areaCode}</TableCell>
                                            {/* <TableCell align='center' className='border-r-2'>{row.loaiPhong}</TableCell> */}
                                            <TableCell align='center' className='border-r-2'>{e.roomMale}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{(e.status) ? "Đang sử dụng" : "Đang bảo trì"}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.capacity}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.actualCapacity}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.wereThere}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.empty}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{(e.kitchen) ? "Có thể" : "Không thể"}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.price && e?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</TableCell>
                                            <TableCell align='center' >
                                                <Tooltip title="Xóa" placement='top'>
                                                    <IconButton sx={{ color: "red" }} onClick={() => { setOpenDelete(true); setId(e.id); }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Sửa" placement='top' >
                                                    <IconButton sx={{ color: "green" }} onClick={() => { handleEdit(e.id); setId(e.id); }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xem chi tiết" placement='top'>
                                                    <Link to="/admin/dashboard/danhsachphong/chitiet" state={{ id: e.id }}>
                                                        <IconButton sx={{ color: "#2196f3" }}>
                                                            <RemoveRedEyeIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={12} align="center" component="th" scope="row" style={{ padding: "4px", color: "red", fontSize: "20px" }}>
                                                Không có dữ liệu
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {dataRoomList && (<Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination
                                count={Math.ceil(dataRoomList?.total / dataRoomList?.data_per_page)}
                                page={currentPage}
                                // rowsPerPage={data?.data_per_page}
                                color="primary"
                                onChange={handleChangePage}
                            />
                        </Stack>)}
                    </div>
                </div>

                <Dialog
                    open={openDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenDelete(false)}
                // aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Bạn có muốn xóa phòng này?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Sau khi xóa tất cả thông tin liên quan đến phòng này sẽ mất!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete}>Đồng ý</Button>
                        <Button onClick={() => { setOpenDelete(false); setId(0); }}>Hủy bỏ</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                    <DialogTitle color="blue"> Chỉnh sửa thông tin phòng</DialogTitle>
                    <DialogContent sx={{ maxWidth: 800 }}>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <TextField
                                    select
                                    label="Trạng thái phòng"
                                    value={updateRoom.status}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, status: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2, marginTop: 1 }}
                                    fullWidth

                                >
                                    <MenuItem value={true}>
                                        Đang sử dụng
                                    </MenuItem>

                                    <MenuItem value={false}>
                                        Bảo trì
                                    </MenuItem>
                                </TextField>

                                <TextField
                                    fullWidth
                                    label="Mã phòng"
                                    id="Mã phòng"
                                    value={updateRoom?.roomCode}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, roomCode: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2 }}
                                />

                                <TextField
                                    select
                                    label="Loại phòng"
                                    value={updateRoom?.roomType}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, roomType: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2 }}
                                    fullWidth

                                >
                                    {ListRoomType.map((e, index) => (
                                        <MenuItem key={index} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Sức chứa"
                                    value={updateRoom.capacity > 0 ? updateRoom.capacity : ""}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, capacity: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2 }}
                                    fullWidth

                                >
                                    {capacity.map((e, index) => (
                                        <MenuItem key={index} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div>
                                <TextField
                                    select
                                    label="Số chỗ ở thực tế"
                                    value={updateRoom.actualCapacity > 0 ? updateRoom.actualCapacity : ""}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, actualCapacity: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2, marginTop: 1 }}
                                    fullWidth

                                >
                                    {actualCapacity.map((e, index) => (
                                        <MenuItem key={index} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Phòng Nam/Nữ"
                                    value={updateRoom.roomMale}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, roomMale: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2 }}
                                    fullWidth
                                >
                                    <MenuItem value="Nam">
                                        Nam
                                    </MenuItem>

                                    <MenuItem value="Nữ">
                                        Nữ
                                    </MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    label="Phòng nấu ăn"
                                    value={updateRoom.kitchen}
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, kitchen: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2 }}
                                    fullWidth
                                >
                                    <MenuItem value={true}>
                                        Có thể
                                    </MenuItem>
                                    <MenuItem value={false}>
                                        Không thể
                                    </MenuItem>
                                </TextField>

                                <TextField
                                    fullWidth
                                    type='number'
                                    value={updateRoom.price}
                                    label="Giá phòng"
                                    id="Giá phòng"
                                    onChange={(e) => setUpdateRoom({ ...updateRoom, price: e.target.value })}
                                    sx={{ maxWidth: 300, marginBottom: 2 }}
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setOpenEdit(false); setId(0); }}>Hủy</Button>
                        <Button onClick={handleUpdate}>Lưu lại</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>

    );
}


export default RoomManagerDashboard;