import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Button, Grid, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, Pagination } from '@mui/material';
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
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


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
function createData(maPhong, maToaNha, loaiPhong, phongNam, trangThai, sucChua, soChoOThucTe, daO, conTrong, gia, phongNauAn) {
    return { maPhong, maToaNha, loaiPhong, phongNam, trangThai, sucChua, soChoOThucTe, daO, conTrong, gia, phongNauAn };
}

const rows = [
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),
    createData("B105", "B1", "Phòng 8 người ở", "Nam", "Đang sử dụng", 8, 8, 6, 2, "170.000", "Có thể"),


];
const building = [
    {
        "khu": "A",
        "data": [
            {
                "id": 1,
                "toaNha": "B1",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 2,
                "toaNha": "B2",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 3,
                "toaNha": "B3",
                "soPhong": "120",
                "phongTrong": "50"
            }, {
                "id": 4,
                "toaNha": "B4",
                "soPhong": "120",
                "phongTrong": "50"
            },
            {
                "id": 5,
                "toaNha": "B1",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 6,
                "toaNha": "B2",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 7,
                "toaNha": "B3",
                "soPhong": "120",
                "phongTrong": "50"
            }, {
                "id": 8,
                "toaNha": "B4",
                "soPhong": "120",
                "phongTrong": "50"
            },
            {
                "id": 9,
                "toaNha": "B1",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 10,
                "toaNha": "B2",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 11,
                "toaNha": "B3",
                "soPhong": "120",
                "phongTrong": "50"
            }, {
                "id": 12,
                "toaNha": "B4",
                "soPhong": "120",
                "phongTrong": "50"
            },
        ]
    },
    {
        "khu": "B",
        "data": [
            {
                "id": 1,
                "toaNha": "B1",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 2,
                "toaNha": "B2",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 3,
                "toaNha": "B3",
                "soPhong": "1220",
                "phongTrong": "150"
            },
            {
                "id": 4,
                "toaNha": "B4",
                "soPhong": "120",
                "phongTrong": "50"
            },
        ]
    },
    {
        "khu": "C",
        "data": [
            {
                "id": 1,
                "toaNha": "B1",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 2,
                "toaNha": "B2",
                "soPhong": "120",
                "phongTrong": "150"
            },
            {
                "id": 3,
                "toaNha": "B3",
                "soPhong": "120",
                "phongTrong": "50"
            },
            {
                "id": 4,
                "toaNha": "B4",
                "soPhong": "120",
                "phongTrong": "50"
            },]
    },
];
const RoomManagerDashboard = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [personName, setPersonName] = React.useState('');
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAddRoom, setOpenAddRoom] = React.useState(false);
    const [openDetail, setOpenDetail] = React.useState(false);

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                        <h2>
                            Bộ lọc
                        </h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 mt-2'>
                            <div className='flex my-2'>
                                <TextField
                                    select
                                    label="Chọn tòa nhà"
                                    value={personName}
                                    onChange={handleChange}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Button variant='contained' size='large' sx={{ paddingY: 2, marginLeft: 2, maxHeight: 54 }}>
                                    Lọc
                                </Button>
                            </div>
                            <div className='flex mt-2 mx-2'>
                                <TextField
                                    label="Tìm kiếm phòng"
                                    fullWidth
                                    sx={{ maxWidth: 300 }}
                                />
                                <Button onClick={() => setOpenAddRoom(true)} variant='outlined' color='success' size='small' sx={{ paddingY: 2, marginLeft: 2, maxHeight: 54 }}>
                                    Thêm phòng
                                </Button>
                            </div>
                            <Dialog open={openAddRoom} onClose={() => setOpenAddRoom(false)}>
                                <DialogTitle color="blue">Thêm mới phòng </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Khu vực"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Xoa"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenAddRoom(false)}>Hủy</Button>
                                    <Button onClick={() => setOpenAddRoom(false)}>Thêm mới</Button>
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
                                        <TableCell align='center' className='border-r-2'>Loại phòng</TableCell>
                                        <TableCell align='center' className='border-r-2'>Số chỗ ở thực tế</TableCell>
                                        <TableCell align='center' className='border-r-2'>Đã ở</TableCell>
                                        <TableCell align='center' className='border-r-2'>Còn trống</TableCell>
                                        <TableCell align='center' className='border-r-2'>Phòng nấu ăn</TableCell>
                                        <TableCell align='center' className='border-r-2'>Đơn giá</TableCell>
                                        <TableCell >{' '}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}

                                        >
                                            <TableCell align='center' className='border-r-2' >{row.maPhong}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{row.loaiPhong}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{row.soChoOThucTe}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{row.daO}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{row.conTrong}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{row.phongNauAn}</TableCell>
                                            <TableCell align='center' className='border-r-2'>{row.gia}</TableCell>
                                            <TableCell align='center' >
                                                <Button onClick={() => setOpenDelete(true)} variant="outlined" color='error' size='small' sx={{ marginX: 1 }} startIcon={<DeleteIcon />}>
                                                    Xóa
                                                </Button>
                                                <Button onClick={() => setOpenEdit(true)} variant="outlined" color='success' size='small' sx={{ marginX: 1 }} startIcon={<DeleteIcon />}>
                                                    Sửa
                                                </Button>
                                                <Button onClick={() => setOpenDetail(true)} variant="outlined" color='primary' size='small' startIcon={<RemoveRedEyeIcon />}>
                                                    Xem
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination count={10} color="primary" />
                        </Stack>
                    </div>
                </div>
                <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
                    <DialogTitle color="blue">Chi tiết phòng</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Khu vực"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Xoa"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDetail(false)}>Hủy</Button>
                        <Button onClick={() => setOpenDetail(false)}>Thêm mới</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                    <DialogTitle>Thêm mới tòa nhà </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Khu vực"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Xoa"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDelete(false)}>Hủy</Button>
                        <Button onClick={() => setOpenDelete(false)}>Thêm mới</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                    <DialogTitle>Thêm mới tòa nhà </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Khu vực"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Edit"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
                        <Button onClick={() => setOpenEdit(false)}>Thêm mới</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>

    );
}


export default RoomManagerDashboard;