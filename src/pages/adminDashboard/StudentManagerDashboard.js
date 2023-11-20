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
import EditIcon from '@mui/icons-material/Edit';
import { deleteOne, getAll, getOne, updateInformation } from '../../api/student.api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { toast } from 'react-toastify';


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
const StudentManagerDashboard = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [details, setDetails] = React.useState({});
    const [dataUpdate, setDataUpdate] = React.useState({});
    const [id, setId] = React.useState(0);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [reset, setReset] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));


    const handleClose = () => {
        setOpenDetails(false);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const fetchApiPersonalInformation = async (id) => {
        const res = await getOne(id);
        setDetails(res.data);
    };

    const deleteOneStudent = async () => {
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
            mssv: res.data?.mssv,
            birthday: res.data?.birthday.split('T')[0],
            classs: res.data?.classs,
            address: res.data?.address,
            course: res.data?.course,
            email: res.data?.email,
            gender: res.data?.gender,
            identificationNumber: res.data?.identificationNumber,
            major: res.data?.major,
            numberPhone: res.data?.numberPhone,
            relativeName: res.data?.relativeName,
            relationship: res.data?.relationship,
            relativeNumberPhone: res.data?.relativeNumberPhone
        });
        setOpenEdit(true);
    }

    const updateApi = async () => {
        const res = await updateInformation(id, dataUpdate);
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
            const res = await getAll(currentPage, search);
            setData(res.data);
        };
        fetchApi();
    }, [currentPage, search, reset]);

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
                                <h2 className='text-2xl font-semibold text-blue-700'>Danh sách sinh viên</h2>
                                <TextField
                                    onChange={(e) => setSearch(e.target.value)}
                                    label="Tìm kiếm sinh viên"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                />
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
                                        <TableCell align='center' className='border-r-2'>Mã số sinh viên</TableCell>
                                        <TableCell align='center' className='border-r-2'>Địa chỉ email</TableCell>
                                        <TableCell align='center' className='border-r-2 '>Số điện thoại</TableCell>
                                        <TableCell align='center' className='border-r-2'>Giới tính</TableCell>
                                        <TableCell align='center' className='border-r-2'>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? data?.data?.map((e) => (
                                        <TableRow
                                            key={e.id}
                                        >
                                            <TableCell align='center' className='border-r-2' >{e.fullName}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.mssv}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.email}</TableCell>
                                            <TableCell align='center' className='border-r-2' >{e.numberPhone}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.gender}</TableCell>

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
                                                <Tooltip title="Xem chi tiết" placement='top' onClick={() => { fetchApiPersonalInformation(e.id); setOpenDetails(true); }}>
                                                    <IconButton sx={{ color: "#2196f3" }}>
                                                        <RemoveRedEyeIcon />
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
                        {data && (<Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination
                                count={Math.ceil(data?.total / data?.data_per_page)}
                                page={currentPage}
                                // rowsPerPage={data?.data_per_page}
                                color="primary"
                                onChange={handleChangePage}
                            />
                        </Stack>)}
                    </div>
                    <Dialog open={openDetails} >
                        <DialogTitle color="blue">Thông tin sinh viên</DialogTitle>
                        <DialogContent>
                            <Card sx={{ maxWidth: 500 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        sx={{ maxHeight: 300 }}
                                        image={'http://localhost:8088/' + details?.avatar}
                                        alt={details?.fullName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" color='blueviolet'>
                                            <div className='grid grid-cols-2'>
                                                <div>{details?.fullName}</div>
                                                <div>{details?.mssv}</div>
                                            </div>
                                        </Typography>
                                        <div className='grid grid-cols-2 gap-1'>
                                            <div>
                                                <p>
                                                    <b>Email:</b> {details?.email}
                                                </p>
                                                <p>
                                                    <b>Số điện thoại:</b> {details?.numberPhone}
                                                </p>
                                                <p>
                                                    <b>Địa chỉ:</b> {details?.address}
                                                </p>
                                                <p>
                                                    <b>Giới tính:</b> {details?.gender}
                                                </p>
                                                <p>
                                                    <b>Ngày sinh:</b> {new Date(details?.birthday).toLocaleDateString('en-GB')}
                                                </p>
                                                <p>
                                                    <b> Khóa:</b> {details?.course}
                                                </p>
                                            </div>
                                            <div>
                                                <p>
                                                    <b>Ngành học:</b> {details?.major}
                                                </p>
                                                <p>
                                                    <b>Lớp:</b> {details?.classs}
                                                </p>
                                                <p>
                                                    <b>Số CCCD:</b> {details?.identificationNumber}
                                                </p>
                                                <p>
                                                    <b>Người giám hộ:</b> {details?.relativeName}
                                                </p>
                                                <p>
                                                    <b>Mối quan hệ:</b> {details?.relationship}
                                                </p>
                                                <p>
                                                    <b>Số điện thoại:</b> {details?.relativeNumberPhone}
                                                </p>

                                            </div>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Đóng lại</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        // fullScreen={fullScreen}
                        open={openEdit}
                        // onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title" color='blue'>
                            Thông tin sinh viên
                        </DialogTitle>
                        <DialogContent>
                            <div className='grid grid-cols-2 gap-2'>
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
                                        label="Mã số sinh viên"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, mssv: e.target.value })}
                                        defaultValue={dataUpdate?.mssv}
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
                                    <TextField
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                        label="Lớp"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, classs: e.target.value })}
                                        defaultValue={dataUpdate?.classs}
                                    />
                                    <TextField
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                        label="Chuyên ngành"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, major: e.target.value })}
                                        defaultValue={dataUpdate?.major}
                                    />
                                    <TextField
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                        label="Khóa"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, course: e.target.value })}
                                        defaultValue={dataUpdate?.course}
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
                                        label="Số căn cước"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, identificationNumber: e.target.value })}
                                        defaultValue={dataUpdate?.identificationNumber}
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
                                    <TextField
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                        label="Người giám hộ"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, relativeName: e.target.value })}
                                        defaultValue={dataUpdate?.relativeName}
                                    />
                                    <TextField
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                        label="Mối quan hệ"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, relationship: e.target.value })}
                                        defaultValue={dataUpdate?.relationship}
                                    />
                                    <TextField
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                        label="Số điện thoại"
                                        onChange={(e) => setDataUpdate({ ...dataUpdate, relativeNumberPhone: e.target.value })}
                                        defaultValue={dataUpdate?.relativeNumberPhone}
                                    />
                                </div>
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
                            {"Bạn có muốn xóa sinh viên này?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sau khi xóa tất cả các thông tin liên quan điều sẽ biến mất!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDelete(false)}>Đóng lại</Button>
                            <Button onClick={() => deleteOneStudent()} autoFocus>
                                Lưu lại
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default StudentManagerDashboard;