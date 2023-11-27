import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Tooltip, IconButton, DialogContent, DialogContentText, DialogActions, Grid, Typography, CardMedia, CardContent, CardActionArea, Card, Divider, Pagination, Stack, Button, TextField, CardActions, MenuItem } from "@mui/material";
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
import { addNewSchoolYear, deleteOneYear, getAllSchoolYear, getOneYear, updateOneYear } from '../../api/room.api';
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
const SchoolYearManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [data, setData] = React.useState([]);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [addData, setAddData] = React.useState({ year: '', semester: '' });
    const [dataUpdate, setDataUpdate] = React.useState({});
    const [id, setId] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAdd = async () => {
        const res = await addNewSchoolYear(addData);
        if (res?.status === 200) {
            setOpenAdd(false);
            return toast.success("Đã thêm mới!", { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
        }
    };

    const handleDelete = async () => {
        const res = await deleteOneYear(id);
        if (res?.status === 200) {
            setOpenDelete(false);
            setId(0);
            return toast.success('Xóa thành công!', { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    const fetchApiUpdateInformation = async (idSemester) => {
        const res = await getOneYear(idSemester);
        setDataUpdate({
            year: res?.data?.year,
            semester: res?.data?.semester
        });
        setOpen(true);
    }

    const handleUpdate = async () => {
        const res = await updateOneYear(id, dataUpdate);
        if (res?.status === 200) {
            setOpen(false);
            setId(0);
            return toast.success('Cập nhật thành công!', { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
        }
    }

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllSchoolYear();
            setData(res.data)
        };
        fetchApi();
    }, [openAdd, openDelete, open]);


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
                                <h2 className='text-2xl font-semibold text-blue-700'>Quản lý học kỳ - năm học</h2>
                                <Button variant='contained' size='large' onClick={() => setOpenAdd(true)}>
                                    Thêm mới
                                </Button>
                            </div>
                            <Dialog
                                open={openAdd}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" color='blue'>
                                    Thêm năm học mới
                                </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        sx={{ marginY: 2 }}
                                        fullWidth
                                        id="outlined-basic"
                                        label="Năm học"
                                        variant="outlined"
                                        onChange={(e) => setAddData({ ...addData, year: e.target.value })}
                                    />
                                    <DialogContentText id="alert-dialog-description">
                                        <TextField
                                            select
                                            label="Học kỳ"
                                            // value={filter.areaCode}
                                            onChange={(e) => setAddData({ ...addData, semester: e.target.value })}
                                            sx={{ maxWidth: 300 }}
                                            fullWidth
                                        >
                                            <MenuItem value={1}>
                                                Học kỳ 1
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                Học kỳ 2
                                            </MenuItem>
                                        </TextField>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" onClick={() => setOpenAdd(false)}>Đóng lại</Button>
                                    <Button variant="contained" onClick={() => handleAdd()}>Lưu lại</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className='border-r-2'>STT</TableCell>
                                        <TableCell align="center" className='border-r-2'>Năm học</TableCell>
                                        <TableCell align="center" className='border-r-2'>Học kỳ</TableCell>
                                        <TableCell align="center" className='border-r-2'>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                        >
                                            <TableCell align="center" className='border-r-2'>{index + 1}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{row.year}</TableCell>
                                            <TableCell align="center" className='border-r-2'>{row.semester}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Xóa" placement='top' onClick={() => { setId(row?.id); setOpenDelete(true); }}>
                                                    <IconButton sx={{ color: "red" }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Sửa" placement='top' onClick={() => { fetchApiUpdateInformation(row?.id); setId(row?.id); }}>
                                                    <IconButton sx={{ color: "green" }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Dialog
                        open={open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" color='blue'>
                            Chỉnh sửa
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                sx={{ marginY: 2 }}
                                fullWidth
                                id="outlined-basic"
                                label="Năm học"
                                variant="outlined"
                                value={dataUpdate?.year}
                                onChange={(e) => setDataUpdate({ ...dataUpdate, year: e.target.value })}
                            />
                            <DialogContentText id="alert-dialog-description">
                                <TextField
                                    select
                                    label="Học kỳ"
                                    value={dataUpdate?.semester}
                                    onChange={(e) => setAddData({ ...dataUpdate, semester: e.target.value })}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                >
                                    <MenuItem value={1}>
                                        Học kỳ 1
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        Học kỳ 2
                                    </MenuItem>
                                </TextField>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={() => { setOpen(false); setId(0); }}>Đóng lại</Button>
                            <Button variant="contained" onClick={() => handleUpdate()}>Lưu lại</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" color='red'>
                            Bạn có muốn xóa?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sau khi xóa các thông tin liên quan sẽ biến mất!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={() => setOpenDelete(false)}>Đóng lại</Button>
                            <Button variant="contained" onClick={() => handleDelete()}>Lưu lại</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default SchoolYearManager;