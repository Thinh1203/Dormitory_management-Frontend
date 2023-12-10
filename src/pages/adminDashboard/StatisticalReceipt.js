import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Box, Divider } from '@mui/material';
import { CustomTabPanel } from '../../utils/createTheme';
import { statistical } from '../../api/receipt.api';
import { getAllSchoolYear } from '../../api/room.api';
import BarChart from '../../components/admindashboard/BarChart';



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



const StatisticalManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [schoolyearId, setSchoolyearId] = React.useState(1);
    const [listSchoolYear, setListSchoolYear] = React.useState([]);
    const [data, setData] = React.useState({ labels: [], datasets: [] });
    const [check, setCheck] = React.useState(false);
    const [total, setTotal] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
            const res = await statistical(schoolyearId);
            if (res?.status === 200) {
                setData({
                    labels: res?.data?.groupedData?.map((e) => e.month),
                    datasets: [{
                        label: "Sơ đồ thống kê doanh thu tiền điện nước theo năm học - học kỳ",
                        data: res?.data?.groupedData?.map((e) => e.total),
                        backgroundColor: [
                            "rgb(75,192,192,1)",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                            "#C71585",
                            "#800080"
                        ],
                        borderColor: "black",
                        borderWidth: 2
                    }]
                });
                setTotal(res.data.totalAmountReceived);
                setCheck(true);
                return;
            } else {
                setCheck(false);
                return
            }
        };
        fetchData();
    }, [schoolyearId]);

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
                            <div className='flex mt-2 mx-2 justify-start'>
                                <h2 className='font-semibold text-2xl mt-2 text-green-600 '> Tổng thu: </h2> <span className='mt-3 text-xl ml-2'>{check ? total.toLocaleString('en-US') + 'đ' : '0đ'}</span>
                            </div>
                            <div className='flex mt-2 mx-2 justify-end'>
                                <TextField
                                    select
                                    label="Năm học - học kỳ"
                                    value={(schoolyearId !== '') ? schoolyearId : ''}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                    onChange={(e) => setSchoolyearId(e.target.value)}
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

                        </div>

                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        {check ? (<BarChart charData={data} />) : (<p className='text-2xl text-red-600 font-semibold flex justify-center'>Không có dữ liệu</p>)}
                    </div>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default StatisticalManager;