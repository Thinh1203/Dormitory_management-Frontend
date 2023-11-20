import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../../components/admindashboard/Navigator';
import PropTypes from 'prop-types';
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs } from '@mui/material';
import { a11yProps, CustomTabPanel } from '../../utils/createTheme';
import { deleteBuilding, getAllBuilding, getArea, getOne, newBuilding, updateOne } from '../../api/Building.api';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


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

export default function MainDashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);
  const [id, setId] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [area, setArea] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [addBuilding, setAddBuilding] = React.useState({ area: "", areaCode: "" });
  const [dataUpdate, setDataUpdate] = React.useState({});
  const [filter, setFilter] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const deleteOneBuilding = async () => {
    const res = await deleteBuilding(id);
    if (res?.status === 200) {
      setOpenDelete(false);
      setId(0);
      setRefresh(true);
      return toast.success('Xóa thành công!', { position: "bottom-right", autoClose: 1000 });
    } else {
      return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
    }
  };

  const addNewBuilding = async () => {
    const res = await newBuilding(addBuilding);
    if (res?.status === 200) {
      setOpen(false);
      setRefresh(true);
      return toast.success("Thêm mới thành công!", { position: "bottom-right", autoClose: 1000 });
    } else {
      return toast.error("Tòa nhà đã tồn tại!", { position: "bottom-right", autoClose: 1000 });
    }
  };

  const handleChange = (newValue, area) => {
    setValue(newValue);
    setFilter(area);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getArea();
      setArea(res.data)
    };
    fetchData();
  }, []);

  const fetchApiUpdateBuilding = async (id) => {
    const res = await getOne(id);
    setDataUpdate({
      area: res.data?.area,
      areaCode: res.data?.areaCode,
    });
    setOpenEdit(true);
  }

  const updateApi = async () => {
    const res = await updateOne(id, dataUpdate);
    if (res?.status === 200) {
      setOpenEdit(false);
      setId(0);
      return toast.success('Cập nhật thành công!', { position: "bottom-right", autoClose: 1000 });
    } else {
      return toast.error('Mã tòa nhà đã tồn tại!', { position: "bottom-right", autoClose: 1000 });
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBuilding(filter);
      setData(res.data)
    };
    fetchData();
  }, [filter, id, refresh]);


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
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(event, newValue) => handleChange(newValue, area[newValue].area)} aria-label="basic tabs example">
              {area?.map((e, index) => (
                <Tab label={`Khu ${e.area}`} key={index} {...a11yProps(index)} />
              ))}
            </Tabs>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '8px',
              }}
            >
              <Button variant="contained" color="success" onClick={handleClickOpen}>
                Thêm
              </Button>
            </Box>
          </Box>
          {building?.map((e, index) => (
            <React.Fragment key={index}>

              {/* // <React.Fragment key={element.id}> */}
              <CustomTabPanel value={value} index={index}>
                <Grid container spacing={2}>
                  {data?.list?.map((element) => (
                    <Grid item xs={12} sm={6} lg={3}>
                      <div className='rounded-md p-2 bg-cyan-700 text-center text-white grid grid-cols-3'>
                        <div className='col-span-2'>
                          <Typography>Mã tòa nhà: {element.areaCode}</Typography>
                          <Typography>Tổng số phòng: {element.room.length}</Typography>
                          <Typography>Số phòng còn chỗ: {element.roomCountByArea}</Typography>
                        </div>
                        <div>
                          <Button
                            sx={{ marginBottom: 1 }}
                            size='small'
                            variant="contained"
                            color="primary"
                            onClick={() => { fetchApiUpdateBuilding(element.id); setId(element.id); }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size='small'
                            variant="contained"
                            color="secondary"
                            onClick={() => { setOpenDelete(true); setId(element.id); }}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </CustomTabPanel>
              {/* // </React.Fragment> */}

            </React.Fragment>
          ))}
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle color='blue'>Thêm mới tòa nhà </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginY: 1 }}
              fullWidth
              label="Khu Vực"
              onChange={(e) => setAddBuilding({ ...addBuilding, area: e.target.value })}
            // defaultValue={dataUpdate?.area}
            />
            <TextField
              sx={{ marginY: 1 }}
              fullWidth
              label="Mã số tòa nhà"
              onChange={(e) => setAddBuilding({ ...addBuilding, areaCode: e.target.value })}
            // defaultValue={dataUpdate?.areaCode}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={() => addNewBuilding()}>Thêm mới</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEdit}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" color='blue'>
            Chỉnh sửa thông tin tòa nhà
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginY: 1 }}
              fullWidth
              label="Khu Vực"
              onChange={(e) => setDataUpdate({ ...dataUpdate, area: e.target.value })}
              defaultValue={dataUpdate?.area}
            />
            <TextField
              sx={{ marginY: 1 }}
              fullWidth
              label="Mã số tòa nhà"
              onChange={(e) => setDataUpdate({ ...dataUpdate, areaCode: e.target.value })}
              defaultValue={dataUpdate?.areaCode}
            />
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
            {"Bạn có muốn xóa tòa nhà này?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sau khi xóa tất cả các thông tin liên quan điều sẽ biến mất!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Đóng lại</Button>
            <Button onClick={() => deleteOneBuilding()} autoFocus>
              Lưu lại
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>

  );
}
