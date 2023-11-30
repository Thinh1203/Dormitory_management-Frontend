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
import { toast } from 'react-toastify';
import { getListRepairForm, getOneForm, updateOneForm } from '../../api/repairForm.api';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { exportFile } from '../../api/registrationForm.api';

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



const RepairFormManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [filter, setFilter] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [detailForm, setDetailForm] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const updateStatusForm = async (id, data) => {
        const res = await updateOneForm(id, data);
        if (res?.status === 200) {
            setId(0);
            return toast.success('Đã duyệt đơn!', { position: "bottom-right", autoClose: 1000 });
        }
    };
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const handleDetail = async (id) => {
        const res = await getOneForm(id);
        setDetailForm(res.data);
        setOpen(true);
    };

    const downloadFile = async () => {
        try {
            const response = await exportFile();

            if (response.data instanceof ArrayBuffer) {
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'exported_data.xlsx';
                link.click();

                window.URL.revokeObjectURL(link.href);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getListRepairForm(currentPage, filter);
            setData(res.data);
        };
        fetchData();
    }, [currentPage, filter, id]);
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
                                    value={(filter === '') ? '' : filter}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <MenuItem value={true} >
                                        Đã xử lý
                                    </MenuItem>
                                    <MenuItem value={false} >
                                        Chưa xử lý
                                    </MenuItem>
                                </TextField>

                                <Tooltip title="Bỏ lọc" placement="top" >
                                    <Button onClick={() => { setFilter(''); setCurrentPage(1); }} variant='contained' size='large' sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}>
                                        <FilterAltOffIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <Button onClick={() => downloadFile()} component="label" size='small' color='secondary' variant="contained" startIcon={<SystemUpdateAltIcon />}>
                                    Export file
                                </Button>
                            </div>
                        </div>

                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">

                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className='border-r-2'>Họ và tên</TableCell>
                                        <TableCell align="center" className='border-r-2'>Mã số sinh viên</TableCell>
                                        <TableCell align="center" className='border-r-2'>Giới tính</TableCell>
                                        <TableCell align="center" className='border-r-2'>Mã phòng</TableCell>
                                        <TableCell align="center" className='border-r-2'>Mã khu vực</TableCell>
                                        <TableCell align="center" className='border-r-2'>Phòng nam/nữ</TableCell>
                                        <TableCell align="center" className='border-r-2'>Trạng thái</TableCell>
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
                                            <TableCell align="center" className='border-r-2'>
                                                {e.status
                                                    ? (<span className='text-green-600 font-medium'>Đã xử lý</span>)
                                                    : (<span className='text-red-600 font-medium'>Chưa xử lý</span>)
                                                } </TableCell>
                                            <TableCell align="center" className='border-r-2'>
                                                <Button
                                                    variant='contained'
                                                    color='success'
                                                    size='small'
                                                    sx={{ marginX: 1 }}
                                                    disabled={e.status}
                                                    onClick={() => { updateStatusForm(e?.id, { status: true }); setId(e?.id); }}
                                                >
                                                    Duyệt
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='small'
                                                    onClick={() => handleDetail(e.id)}
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
                    </div>
                    <Dialog
                        open={open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" className='text-blue-600 font-medium'>
                            Chi tiết đơn đăng ký
                        </DialogTitle>
                        <DialogContent>

                            <div className='grid grid-cols-2 gap-2'>
                                {
                                    detailForm ? detailForm[0]?.listofdevices?.map((e) => (
                                        <React.Fragment>
                                            <div className='mt-2'>
                                                <TextField
                                                    label="Mã sửa chữa"
                                                    value={e?.repairCode}
                                                    sx={{ maxWidth: 300 }}
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                <TextField
                                                    label="Chi tiết sửa chữa"
                                                    value={e?.repairDetail}
                                                    sx={{ maxWidth: 300 }}
                                                    fullWidth
                                                />
                                            </div>
                                        </React.Fragment>
                                    )) : ''
                                }
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='mt-2'>
                                    <TextField
                                        label="Thời gian đăng ký"
                                        value={new Date(detailForm[0]?.repairrequestform.createdAt).toLocaleDateString('en-GB')}
                                        sx={{ maxWidth: 300 }}
                                        fullWidth
                                    />
                                </div>
                                <div className='mt-2'>
                                    <TextField
                                        label="Thời gian xử lý"
                                        value={detailForm[0]?.repairrequestform.status ? new Date(detailForm[0]?.repairrequestform.updatedAt).toLocaleDateString('en-GB') : 'Chưa xử lý'}
                                        sx={{ maxWidth: 300 }}
                                        fullWidth
                                    />
                                </div>
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} autoFocus>Đóng lại</Button>

                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default RepairFormManager;