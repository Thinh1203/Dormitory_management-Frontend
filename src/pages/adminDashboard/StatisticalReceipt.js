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
import { getAllReceipt, updateOne } from '../../api/receipt.api';
import { listMonth } from '../../utils/data';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { getAllSchoolYear } from '../../api/room.api';


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



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



const StatisticalManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState({
        month: '',
        schoolyearId: '',
        paymentStatus: '',
    });
    const [currentPage, setCurrentPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [listSchoolYear, setListSchoolYear] = React.useState([]);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const updateOneReceipt = async (id, data) => {
        const res = await updateOne(id, data);
        if(res?.status === 200) {
            setId(id);
            return toast.success('Đã thanh toán!', { position: "bottom-right", autoClose: 1000 });
        }
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllSchoolYear();
            setListSchoolYear(res.data)
        };
        fetchApi(); 
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getAllReceipt(currentPage, filter, search);
            setData(res.data);
            console.log(res.data);
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
                        <div className='grid grid-cols-1 sm:grid-cols-3 mt-2'>
                            <div className='flex mt-2 mx-2 justify-start'>
                                <h2 className='font-semibold text-2xl text-blue-600 mt-2'> Thống kê tiền điện nước </h2>
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
                                <Tooltip title="Bỏ lọc" placement="top" onClick={() => setFilter({
                                    month: '',
                                    schoolyearId: '',
                                    paymentStatus: '',
                                })}>
                                    <Button variant='contained' size='large' sx={{ paddingY: 2, marginLeft: 1, maxHeight: 54 }}>
                                        <FilterAltOffIcon />
                                    </Button>
                                </Tooltip>

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
                                        <TableCell align="center" className='border-r-2'>Tiền điện</TableCell>
                                        <TableCell align="center" className='border-r-2'>Tiền nước</TableCell>
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
                                            <TableCell align="center" className='border-r-2'>{e.receipt.totalElectricityBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{e.receipt.totalWaterBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'}</TableCell>
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
                                                <Button
                                                    variant='outlined'
                                                    size='small'
                                                    disabled={e.receipt.paymentStatus}
                                                    onClick={() => updateOneReceipt(e.receipt.id, { paymentStatus: true })}
                                                >
                                                    Xác nhận
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
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default StatisticalManager;