import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Typography, CardMedia, CardContent, CardActionArea, Card, Divider, Pagination, Stack, Button, TextField, CardActions } from "@mui/material";
import { CustomTabPanel } from '../../utils/createTheme';
import { toast } from 'react-toastify';
import { addNewEvent, deleteOne, getAllNotification, getOneNotification, updateOne } from '../../api/notification.api';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 500px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 4px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

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
const EventManager = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [event, setEvent] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [oneEvent, setOneEvent] = React.useState({ topic: '', content: '' });
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [newEvent, setNewEvent] = React.useState({ topic: '', content: '' });
    const [openDelete, setOpenDelete] = React.useState(false);
    const [id, setId] = React.useState(0);

    const handleClickOpen = async (id) => {
        const res = await getOneNotification(id);
        setOneEvent({
            topic: res?.data.topic,
            content: res?.data.content
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOneEvent({ topic: '', content: '' });
        setId(0);
        setOpen(false);
    };
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllNotification(currentPage);
            setEvent(res.data);
        }
        fetchApi();
    }, [currentPage, open, openAdd, openDelete]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAddNew = async () => {
        const res = await addNewEvent(newEvent);
        if (res?.status === 200) {
            setEvent({ topic: '', content: '' });
            setOpenAdd(false);
            return toast.success("Thêm mới thành công!", { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
        }
    };

    const updateEvent = async () => {
        const res = await updateOne(id, oneEvent);
        if (res?.status === 200) {
            setOpen(false);
            return toast.success("Cập nhật thành công!", { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
        }
    };

    const deleteOneEvent = async () => {
        const res = await deleteOne(id);
        if (res?.status === 200) {
            setId(0);
            setCurrentPage(1);
            setOpenDelete(false);
            return toast.success("Đã xóa thông báo!", { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error("Có lỗi xảy ra!", { position: "bottom-right", autoClose: 1000 });
        }
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
                    <div className='bg-white p-5 mx-5 rounded-md'>
                        <div className='grid grid-cols-1'>
                            <div className='flex mt-2 mx-2 justify-between'>
                                <h2 className='text-2xl font-semibold text-blue-700'>Danh sách thông báo</h2>
                                <Button variant='contained' size='large' onClick={() => setOpenAdd(true)}>
                                    Thêm thông báo
                                </Button>
                            </div>
                            <Dialog
                                open={openAdd}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title" color='blue'>
                                    Thêm thông báo mới
                                </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        sx={{ marginY: 2 }}
                                        fullWidth
                                        id="outlined-basic"
                                        label="Tiêu đề"
                                        variant="outlined"
                                        onChange={(e) => setNewEvent({ ...newEvent, topic: e.target.value })}
                                    />
                                    <DialogContentText id="alert-dialog-description">
                                        <Textarea
                                            maxRows={6}
                                            onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })}
                                            aria-label="maximum height"
                                            placeholder="Nội dung"
                                        />
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" onClick={() => setOpenAdd(false)}>Đóng lại</Button>
                                    <Button variant="contained" onClick={() => handleAddNew()}>Lưu lại</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                    <div className='mx-5'>
                        <Divider />
                    </div>
                    <div className=' bg-white mx-5'>
                        <Grid container p={2}>
                            {
                                event?.data?.map((e) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} padding={2} key={e?.id}>
                                        <Card sx={{ maxWidth: 345, height: '100%' }}>
                                            <CardActions>
                                                <Button startIcon={<EditIcon />} size="small" color='success' variant='contained' onClick={() => { handleClickOpen(e?.id); setId(e?.id); }}>Chỉnh sửa</Button>
                                                <Button startIcon={<DeleteIcon />} size="small" color='error' variant='contained' onClick={() => { setOpenDelete(true); setId(e?.id); }}>Xóa</Button>
                                            </CardActions>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="http://benhvientravinh.com.vn/upload/1002175/20230410/hinh-anh-thong-bao_9488c6da2d.png"
                                                    alt="green iguana"
                                                />
                                                <Divider />
                                                <CardContent>
                                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ display: "flex" }}>
                                                        <EventAvailableIcon color="error" fontSize="small" /> <Typography fontSize={15} marginLeft={2} color={"GrayText"}>{(new Date(e?.createdAt).toLocaleDateString('en-GB'))}</Typography>
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={"bold"} color="text.error">
                                                        {e?.topic}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Stack spacing={2} padding={2} className='flex justify-center items-center'>
                            <Pagination
                                // count={10}
                                count={Math.ceil(event?.total / event?.data_per_page)}
                                page={currentPage}
                                // // rowsPerPage={data?.data_per_page}
                                color="primary"
                                onChange={handleChangePage}
                            />
                        </Stack>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" color='blue'>
                            Chỉnh sửa thông báo
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                sx={{ marginY: 2 }}
                                fullWidth
                                id="outlined-basic"
                                label="Tiêu đề"
                                variant="outlined"
                                defaultValue={oneEvent?.topic}
                                onChange={(e) => setOneEvent({ ...oneEvent, topic: e.target.value })}
                            />
                            <DialogContentText id="alert-dialog-description">
                                <Textarea
                                    maxRows={6}
                                    onChange={(e) => setOneEvent({ ...oneEvent, content: e.target.value })}
                                    aria-label="maximum height"
                                    placeholder="Maximum 6 rows"
                                    defaultValue={oneEvent?.content}
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose}>Đóng lại</Button>
                            <Button variant="contained" onClick={() => updateEvent()}>Lưu lại</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" color='red'>
                            Bạn có muốn xóa thông báo này?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Sau khi xóa các thông tin liên quan đến thông báo sẽ biến mất!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={() => setOpenDelete(false)}>Đóng lại</Button>
                            <Button variant="contained" onClick={deleteOneEvent}>Lưu lại</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </ThemeProvider>

    );
}


export default EventManager;