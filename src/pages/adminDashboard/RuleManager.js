import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Button, Tooltip, TextField, Dialog, DialogActions, DialogContent, IconButton, DialogTitle, Divider, Stack, Pagination, DialogContentText, Slide, Autocomplete } from '@mui/material';
import { CustomTabPanel } from '../../utils/createTheme';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import { addNew, getAllRule, getOneRule } from '../../api/rule.api';
import { getList } from '../../api/student.api';


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
const RuleManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [details, setDetails] = React.useState([]);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [newStudent, setNewStudent] = React.useState({ id: 0, contentViolation: '', discipline: '' });
    const [listData, setListData] = React.useState([{}]);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAdd = async () => {
        const res = await addNew(newStudent);
        if (res?.status === 200) {
            setOpen(false);
            return toast.success('Thêm thành công!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    const fetchApiDetail = async (id) => {
        const res = await getOneRule(id);
        setDetails(res.data);
    };
    React.useEffect(() => {
        const getAllList = async () => {
            const res = await getList();
            setListData(res.data);
        };
        getAllList();
    }, []);

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllRule(currentPage, search);
            setData(res.data);
        };
        fetchApi();
    }, [currentPage, search, open]);

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

                        <div className='grid grid-cols-1 sm:grid-cols-2'>
                            <div className='flex my-2 mx-2'>
                                <h2 className='text-2xl font-semibold text-blue-700'>Danh sách sinh viên vi phạm</h2>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <TextField
                                    onChange={(e) => setSearch(e.target.value)}
                                    label="Tìm kiếm sinh viên"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                />
                                <Button onClick={() => setOpen(true)} variant='contained' color='success' size='small' sx={{ paddingY: 2, marginLeft: 2, maxHeight: 54 }}>
                                    Thêm mới
                                </Button>
                                <Dialog
                                    open={open}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title" className='text-blue-600'>
                                        Thêm sinh viên vi phạm
                                    </DialogTitle>
                                    <DialogContent sx={{ maxWidth: 350 }}>
                                        <Autocomplete
                                            options={listData}
                                            getOptionLabel={(listData) => listData.fullName}
                                            style={{ maxWidth: 300, marginTop: 5 }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Tìm kiếm sinh viên" variant="outlined" />
                                            )}
                                            onChange={(e, selectedOption) => setNewStudent({ ...newStudent, id: selectedOption ? selectedOption.id : 0 })}
                                        />
                                        <TextField
                                            label="Nội dung vi phạm"
                                            value={newStudent?.contentViolation}
                                            onChange={(e) => setNewStudent({ ...newStudent, contentViolation: e.target.value })}
                                            style={{ maxWidth: 300, marginTop: 7 }}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Hình thức kỷ luật"
                                            value={newStudent?.discipline}
                                            onChange={(e) => setNewStudent({ ...newStudent, discipline: e.target.value })}
                                            style={{ maxWidth: 300, marginTop: 7 }}
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => { setOpen(false); setNewStudent({ id: 0, contentViolation: '', discipline: '' }); }}>Đóng lại</Button>
                                        <Button onClick={() => handleAdd()} autoFocus>
                                            Lưu lại
                                        </Button>
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
                                    {data ? data?.data?.map((e, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell align='center' className='border-r-2' >{e.student.fullName}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.student.mssv}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.student.email}</TableCell>
                                            <TableCell align='center' className='border-r-2' >{e.student.numberPhone}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{e.student.gender}</TableCell>

                                            <TableCell align='center' >
                                                <Tooltip title="Xem chi tiết" placement='top' onClick={() => { fetchApiDetail(e.student.id); setOpenDetails(true); }}>
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
                        <DialogTitle color="blue">Thông tin vi phạm</DialogTitle>
                        <DialogContent>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' className='border-r-2 '>STT</TableCell>
                                            <TableCell align='center' className='border-r-2'>Nội dung vi phạm</TableCell>
                                            <TableCell align='center' className='border-r-2'>Hình thức kỷ luật</TableCell>
                                            <TableCell align='center' className='border-r-2'>Ngày vi phạm</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {details ? details?.map((e, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell align='center' className='border-r-2' >{index + 1}</TableCell>
                                                <TableCell align='center' className='border-r-2'>{e.contentViolation}</TableCell>
                                                <TableCell align='center' className='border-r-2'>{e.discipline}</TableCell>
                                                <TableCell align='center' className='border-r-2'>
                                                    {new Date(e?.createdAt).toLocaleString('en-GB', {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        second: 'numeric',
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={3} align="center" component="th" scope="row" style={{ padding: "4px", color: "red", fontSize: "20px" }}>
                                                    Không có dữ liệu
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDetails(false)}>Đóng lại</Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </Box>
        </ThemeProvider>

    );
}


export default RuleManager;