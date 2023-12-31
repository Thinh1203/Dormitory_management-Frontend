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
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { getAllForm, getOneDetail, updateOne } from '../../api/registrationForm.api';
import { toast } from 'react-toastify';

const names = [
    {
        id: 0,
        title: 'Chờ duyệt'
    },
    {
        id: 1,
        title: 'Đã duyệt'
    },
    {
        id: 2,
        title: 'Đã từ chối'
    }
];


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];

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



const RegisterFormManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState(3);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [detailForm, setDetailForm] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const fetchInformationForm = async (id) => {
        const res = await getOneDetail(id);

        setDetailForm({
            createAt: res.data?.registrationForm?.createdAt,
            updateAt: res.data?.registrationForm?.updatedAt,
            registrationTime: res.data?.registrationForm?.registrationTime,
            wish: res.data?.registrationForm?.wish,
            areaCode: res.data?.room?.building?.areaCode,
            roomCode: res.data?.room?.roomCode,
            status: res.data?.room?.status,
            fee: res.data?.room?.price,
            semester: res.data?.schoolyear?.semester,
            year: res.data?.schoolyear?.year
        });
        setOpen(true);
    }

    const updateStatusForm = async (id, status) => {
        const res = await updateOne(id, status);
        if (res?.status === 200) {
            setId(id);
            return toast.success('Đã duyệt đơn!', { position: "bottom-right", autoClose: 1000 });
        }
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getAllForm(currentPage, filter, search);
            setData(res.data);
        };
        fetchData();
    }, [currentPage, filter, search, id]);
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
                        <div className='grid grid-cols-1 sm:grid-cols-2 mt-2'>
                            <div className='flex my-2'>
                                <TextField
                                    select
                                    label="Trạng thái đơn"
                                    value={(filter !== 3) ? filter : ''}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    {names.map((e) => (
                                        <MenuItem key={e.id} value={e.id} >
                                            {e.title}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Tooltip title="Bỏ lọc" placement="top" >
                                    <Button onClick={() => { setFilter(3); setCurrentPage(1); }} variant='contained' size='large' sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}>
                                        <FilterAltOffIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <TextField
                                    label="Nhập tên sinh viên, mã số"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <caption>Danh sách đơn đăng ký</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className='border-r-2'>Họ và tên</TableCell>
                                        <TableCell align="center" className='border-r-2'>Mã số sinh viên</TableCell>
                                        <TableCell align="center" className='border-r-2'>Giới tính</TableCell>
                                        <TableCell align="center" className='border-r-2'>Mã phòng</TableCell>
                                        <TableCell align="center" className='border-r-2'>Mã khu vực</TableCell>
                                        <TableCell align="center" className='border-r-2'>Phòng nam/nữ</TableCell>
                                        <TableCell align="center" className='border-r-2'>Còn trống</TableCell>
                                        <TableCell align="center" className='border-r-2'>Trạng thái đơn</TableCell>
                                        <TableCell align="center" className='border-r-2'>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? data?.data?.map((e) => (
                                        <TableRow key={e.id}>
                                            <TableCell align="center" className='border-r-2'>{e.student.fullName}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.student.mssv}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.student.gender}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.room.roomCode}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.room.building.areaCode}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.room.roomMale}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.room.empty}</TableCell>
                                            <TableCell align="center" className='border-r-2'>
                                                {e.registrationStatus === 0
                                                    ? (<span className='text-blue-600 font-medium'>Chưa duyệt</span>)
                                                    : e.registrationStatus === 2
                                                        ? (<span className='text-red-600 font-medium'>Đã từ chối</span>)
                                                        : (<span className='text-green-600 font-medium'>Đã duyệt</span>)
                                                } </TableCell>
                                            <TableCell align="left" className='border-r-2'>
                                                <Button
                                                    variant='contained'
                                                    color='success'
                                                    size='small'
                                                    sx={{ marginX: 1 }}
                                                    disabled={(e.registrationStatus === 1 || e.registrationStatus === 2) && true}
                                                    onClick={() => updateStatusForm(e?.id, { registrationStatus: 1 })}
                                                >
                                                    Duyệt
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='error'
                                                    size='small'
                                                    disabled={(e.registrationStatus === 1 || e.registrationStatus === 2) && true}
                                                    onClick={() => updateStatusForm(e?.id, { registrationStatus: 2 })}
                                                >
                                                    Từ chối
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='small'
                                                    sx={{ marginX: 1 }}
                                                    onClick={() => fetchInformationForm(e.id)}
                                                >
                                                    Chi tiết
                                                </Button>
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
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination count={Math.ceil(data?.total / data?.data_per_page)}
                                page={currentPage}
                                // rowsPerPage={data?.data_per_page}
                                color="primary"
                                onChange={handleChangePage} />
                        </Stack>
                        <Dialog open={open} >
                            <DialogTitle color="blue">Chi tiết đơn đăng ký</DialogTitle>
                            <DialogContent>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='my-2'>
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Mã khu vực"
                                            defaultValue={detailForm?.areaCode}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Mã phòng"
                                            defaultValue={detailForm?.roomCode}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Trạng thái phòng"
                                            defaultValue={detailForm?.status ? 'Đang sử dụng' : 'Bảo trì'}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Thời gian đăng ký"
                                            defaultValue={new Date(detailForm?.createAt).toLocaleString('en-GB', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                            })}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Năm học"
                                            defaultValue={detailForm?.year}
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Thời gian duyệt"
                                            defaultValue={
                                                (detailForm?.registrationStatus === 0)
                                                    ? 'Chưa duyệt' :
                                                    new Date(detailForm?.updateAt).toLocaleString('en-GB', {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        second: 'numeric',
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Nguyện vọng"
                                            defaultValue={(detailForm?.wish !== null) ? detailForm?.wish : ''}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Thời gian ở / tháng"
                                            defaultValue={detailForm?.registrationTime}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Tổng phí phòng"
                                            defaultValue={(detailForm?.fee * detailForm?.registrationTime).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            label="Học kỳ"
                                            defaultValue={detailForm?.semester}
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>Đóng lại</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>


            </Box>
        </ThemeProvider>

    );
}


export default RegisterFormManager;