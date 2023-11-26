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
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { getAll, getOne, updateOne, deleteOne, addNewUser } from '../../api/manager.api';


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
const AdminManagerDashboard = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [dataUpdate, setDataUpdate] = React.useState({});
    const [newUser, setNewUser] = React.useState({ fullName: '', mscb: '', password: '', email: '', numberPhone: '', gender: '', address: '', birthday: '' });
    const [id, setId] = React.useState(0);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [reset, setReset] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAddNewUser = async () => {
        if (
            newUser?.fullName.length < 1
            || newUser?.mscb.length < 1
            || newUser?.email.length < 1
            || newUser?.numberPhone.length < 1
            || newUser?.gender.length < 1
            || newUser?.address.length < 1
            || newUser?.birthday.length < 1
        ) {
            return toast.error("Vui lòng điền đầy đủ thông tin!", { position: "bottom-right", autoClose: 1000 });
        }
        const res = await addNewUser(newUser);
        if (res.status === 200) {
            setOpenAdd(false);
            setNewUser({ fullName: '', mscb: '', password: '', email: '', numberPhone: '', gender: '', address: '', birthday: '' });
            return toast.success("Thêm thành công!", { position: "bottom-right", autoClose: 1000 });
        } else
            return toast.error("Tài khoản đã tồn tại!", { position: "bottom-right", autoClose: 1000 });
    };

    const deleteOneManager = async () => {
        const res = await deleteOne(id);
        if (res?.status === 200) {
            setOpenDelete(false);
            setId(0);
            setReset(true);
            return toast.success('Xóa thành công!', { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    const fetchApiUpdateInformation = async (id) => {
        const res = await getOne(id);
        setDataUpdate({
            fullName: res.data?.fullName,
            mscb: res.data?.mscb,
            birthday: res.data?.birthday.split('T')[0],
            address: res.data?.address,
            email: res.data?.email,
            gender: res.data?.gender,
            numberPhone: res.data?.numberPhone,
        });
        setOpenEdit(true);
    }

    const updateApi = async () => {
        const res = await updateOne(id, dataUpdate);
        if (res.status === 200) {
            setOpenEdit(false);
            setId(0);
            return toast.success('Cập nhật thành công!', { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAll();
            setData(res.data);
        };
        fetchApi();
    }, [id, openAdd]);

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
                        <div className='grid grid-cols-1'>
                            <div className='flex mt-2 mx-2 justify-between'>
                                <h2 className='text-2xl font-semibold text-blue-700'>Danh sách quản trị viên</h2>
                                <Button variant='contained' size='large' onClick={() => setOpenAdd(true)}>
                                    Thêm
                                </Button>
                            </div>
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
                                        <TableCell align='center' className='border-r-2 '>Họ và tên</TableCell>
                                        <TableCell align='center' className='border-r-2'>Mã số cán bộ</TableCell>
                                        <TableCell align='center' className='border-r-2'>Địa chỉ email</TableCell>
                                        <TableCell align='center' className='border-r-2 '>Số điện thoại</TableCell>
                                        <TableCell align='center' className='border-r-2'>Giới tính</TableCell>
                                        <TableCell align='center' className='border-r-2'>Địa chỉ</TableCell>
                                        <TableCell align='center' className='border-r-2'>Ngày sinh</TableCell>
                                        <TableCell align='center' className='border-r-2'>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? data?.map((e) => (
                                        <TableRow
                                            key={e.id}
                                        >
                                            <TableCell align='center' className='border-r-2' >{e.fullName}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.mscb}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.email}</TableCell>
                                            <TableCell align='center' className='border-r-2' >{e.numberPhone}</TableCell>
                                            <TableCell align='center' className='border-r-2' >{e.address}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.gender}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{new Date(e.birthday).toLocaleDateString('en-GB')}</TableCell>
                                            <TableCell align='center' >
                                                <Tooltip title="Xóa" placement='top' onClick={() => { setOpenDelete(true); setId(e.id); }}>
                                                    <IconButton sx={{ color: "red" }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Sửa" placement='top' onClick={() => { fetchApiUpdateInformation(e.id); setId(e.id); }}>
                                                    <IconButton sx={{ color: "green" }}>
                                                        <EditIcon />
                                                    </IconButton>
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
                    </div>
                    <Dialog
                        open={openAdd}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title" color='blue'>
                            Thêm tài khoản quản lý
                        </DialogTitle>
                        <DialogContent>
                            <div className='my-2'>
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Họ và tên"
                                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Mã số cán bộ"
                                    onChange={(e) => setNewUser({ ...newUser, mscb: e.target.value })}
                                />
                                 <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Mật khẩu"
                                    type='password'
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Địa chỉ email"
                                    type='email'
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Số điện thoại"
                                    onChange={(e) => setNewUser({ ...newUser, numberPhone: e.target.value })}
                                />
                            </div>
                            <div className='my-2'>
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Địa chỉ"
                                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Giới tính"
                                    onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    type='date'
                                    label="Ngày sinh"
                                    onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })}
                                    defaultValue={newUser?.birthday}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => setOpenAdd(false)}>
                                Đóng lại
                            </Button>
                            <Button autoFocus onClick={handleAddNewUser}>
                                Lưu lại
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openEdit}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title" color='blue'>
                            Sửa thông tin
                        </DialogTitle>
                        <DialogContent>
                            <div className='my-2'>
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Họ và tên"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, fullName: e.target.value })}
                                    defaultValue={dataUpdate?.fullName}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Mã số cán bộ"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, mscb: e.target.value })}
                                    defaultValue={dataUpdate?.mscb}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Địa chỉ email"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, email: e.target.value })}
                                    defaultValue={dataUpdate?.email}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Số điện thoại"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, numberPhone: e.target.value })}
                                    defaultValue={dataUpdate?.numberPhone}
                                />
                            </div>
                            <div className='my-2'>
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Địa chỉ"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, address: e.target.value })}
                                    defaultValue={dataUpdate?.address}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    label="Giới tính"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, gender: e.target.value })}
                                    defaultValue={dataUpdate?.gender}
                                />
                                <TextField
                                    sx={{ marginBottom: 1 }}
                                    fullWidth
                                    type='date'
                                    label="Ngày sinh"
                                    onChange={(e) => setDataUpdate({ ...dataUpdate, birthday: e.target.value })}
                                    defaultValue={dataUpdate?.birthday}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={() => setOpenEdit(false)}>
                                Đóng lại
                            </Button>
                            <Button autoFocus onClick={() => updateApi()}>
                                Lưu lại
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" color='red'>
                            {"Bạn có muốn xóa người dùng này?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sau khi xóa tất cả các thông tin liên quan điều sẽ biến mất!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDelete(false)}>Đóng lại</Button>
                            <Button onClick={() => deleteOneManager()} autoFocus>
                                Lưu lại
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default AdminManagerDashboard;