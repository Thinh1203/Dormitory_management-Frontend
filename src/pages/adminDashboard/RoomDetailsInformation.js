import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { TextField, Divider, Slide } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CustomTabPanel } from '../../utils/createTheme';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { addUser, deleteOne, getAllSchoolYear, getInformationDetailsRoom } from '../../api/room.api';
import MoreIcon from '@mui/icons-material/More';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { getList } from '../../api/student.api';
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
const RoomDetailsInformation = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [check, setCheck] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [informationStudent, setInformationStudent] = React.useState({});
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const { state } = useLocation();
    const [id, setId] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [listData, setListData] = React.useState([{}]);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [schoolYear, setSchoolYear] = React.useState([]);

    const [addNewStudent, setAddNewStudent] = React.useState({
        paymentStatus: '',
        roomId: state.id,
        studentId: 0,
        schoolyearId: 0,
        time: 0
    });

    const DetailsInformation = async (data) => {
        setOpen(true);
        setInformationStudent(data);
    }

    const handleAdd = async () => {
        if (addNewStudent.roomId === 0 || addNewStudent.studentId === 0 || addNewStudent.schoolyearId === 0 || addNewStudent.time === 0)
            return toast.error('Vui lòng điền đủ thông tin!', { position: "bottom-right", autoClose: 1000 });
        const res = await addUser(addNewStudent);
        if (res?.status === 200) {
            setOpen2(false);
            return toast.success('Thêm thành công!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const deleteOneStudent = async () => {
        const res = await deleteOne(id);
        if (res?.status === 200) {
            setOpenDelete(false);
            setId(0);
            return toast.success('Xóa thành công!', { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getInformationDetailsRoom(state.id);
            if (res?.status && res?.status === 200) {
                setCheck(true);
                setData(res.data);
            }
        };
        fetchApi();
    }, [open2, openDelete]);

    React.useEffect(() => {
        const getSchoolYear = async () => {
            const res = await getAllSchoolYear();
            setSchoolYear(res.data);
        }
        getSchoolYear();
    }, []);


    React.useEffect(() => {
        const getAllList = async () => {
            const res = await getList();
            setListData(res.data);
        };
        getAllList();
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
                    <div className='bg-white mx-5 py-2 rounded-sm'>
                        <div className='flex mt-2 mx-2 justify-between'>
                            <h2 className='text-2xl font-semibold text-blue-700 mx-2'>Chi tiết phòng</h2>
                            <Button onClick={() => setOpen2(true)} variant='contained' color='success' size='small' sx={{ paddingY: 2, marginLeft: 2, maxHeight: 54 }}>
                                Thêm sinh viên
                            </Button>
                            <Dialog
                                open={open2}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" className='text-blue-600'>
                                    Thêm sinh viên mới
                                </DialogTitle>
                                <DialogContent sx={{ maxWidth: 350 }}>
                                    <Autocomplete
                                        options={listData}
                                        getOptionLabel={(listData) => listData.fullName}
                                        style={{ maxWidth: 300, marginTop: 5 }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Tìm kiếm sinh viên" variant="outlined" />
                                        )}
                                        onChange={(e, selectedOption) => setAddNewStudent({ ...addNewStudent, studentId: selectedOption ? selectedOption.id : 0 })}
                                    />
                                    <TextField
                                        label="Thời gian đăng ký/tháng"
                                        type='number'
                                        value={(addNewStudent?.time === 0) ? '' : addNewStudent?.time}
                                        onChange={(e) => setAddNewStudent({ ...addNewStudent, time: e.target.value })}
                                        style={{ maxWidth: 300, marginTop: 7 }}
                                        fullWidth
                                    />

                                    <FormControl sx={{ minWidth: 120, marginTop: 1 }} fullWidth>
                                        <InputLabel id="demo-controlled-open-select-label">Năm học</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            value={(addNewStudent?.schoolyearId === 0) ? '' : addNewStudent?.schoolyearId}
                                            label="Năm học"
                                            onChange={(e) => setAddNewStudent({ ...addNewStudent, schoolyearId: e.target.value })}
                                        >
                                            {
                                                schoolYear?.map((e) => (
                                                    <MenuItem value={e.id} key={e.id}>
                                                        Năm học {e.year} - Học kỳ {e.semester}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ minWidth: 120, marginTop: 1 }} fullWidth>
                                        <InputLabel id="demo-controlled-open-select-label">Phí phòng</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            value={addNewStudent?.paymentStatus}
                                            label="Phí phòng"
                                            onChange={(e) => setAddNewStudent({ ...addNewStudent, paymentStatus: e.target.value })}
                                        >
                                            <MenuItem value={true}>
                                                Đã thanh toán
                                            </MenuItem>
                                            <MenuItem value={false}>
                                                Chưa thanh toán
                                            </MenuItem>
                                        </Select>
                                    </FormControl>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpen2(false)}>Đóng lại</Button>
                                    <Button onClick={() => handleAdd()} autoFocus>
                                        Lưu lại
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <div className='grid grid-cols-4 gap-4 px-2 py-2'>
                            {
                                check ? data?.map((e) => (
                                    <div key={e.id}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <div>
                                                <img className='max-h-44 w-full' src={'http://localhost:8088/' + e.student?.avatar} />
                                            </div>
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" color="blue" component="div">
                                                    {e.student?.fullName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Mã số sinh viên: {e.student?.mssv}
                                                </Typography>
                                                {/* <Typography variant="body2" color="text.secondary">
                                                    Địa chỉ email: {e.student?.email}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Giới tính: {e.student?.gender}
                                                </Typography> */}
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={() => { setId(e.id); setOpenDelete(true); }} variant="outlined" color='error' startIcon={<DeleteIcon />}>
                                                    Xóa
                                                </Button>
                                                <Button onClick={() => DetailsInformation(e)} variant="outlined" color='primary' startIcon={<MoreIcon />}>
                                                    Chi tiết
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                )) : (
                                    <div className='col-span-4 flex justify-center'>
                                        <p className='text-red-600 font-medium text-xl'>Phòng còn trống</p>
                                    </div>
                                )
                            }
                        </div>
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
                                    Sinh viên sẽ bị đưa ra khỏi phòng!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDelete(false)}>Đóng lại</Button>
                                <Button onClick={() => deleteOneStudent()} autoFocus>
                                    Lưu lại
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            // fullScreen={fullScreen}
                            open={open}
                            // onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                Thông tin sinh viên
                            </DialogTitle>
                            <DialogContent>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='my-2'>
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Họ và tên"
                                            defaultValue={informationStudent?.student?.fullName}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Mã số sinh viên"
                                            defaultValue={informationStudent?.student?.mssv}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Địa chỉ email"
                                            defaultValue={informationStudent?.student?.email}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Số điện thoại"
                                            defaultValue={informationStudent?.student?.numberPhone}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Lớp"
                                            defaultValue={informationStudent?.student?.classs}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Chuyên ngành"
                                            defaultValue={informationStudent?.student?.major}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Khóa"
                                            defaultValue={informationStudent?.student?.course}
                                        />
                                    </div>
                                    <div className='my-2'>
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Địa chỉ"
                                            defaultValue={informationStudent?.student?.address}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Số căn cước"
                                            defaultValue={informationStudent?.student?.identificationNumber}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Giới tính"
                                            defaultValue={informationStudent?.student?.gender}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Ngày sinh"
                                            defaultValue={new Date(informationStudent?.student?.birthday).toLocaleDateString('en-GB')}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Người giám hộ"
                                            defaultValue={informationStudent?.student?.relativeName}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Mối quan hệ"
                                            defaultValue={informationStudent?.student?.relationship}
                                        />
                                        <TextField
                                            sx={{ marginBottom: 1 }}
                                            fullWidth
                                            disabled
                                            label="Số điện thoại"
                                            defaultValue={informationStudent?.student?.relativeNumberPhone}
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setOpen(false)}>
                                    Đóng lại
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default RoomDetailsInformation;