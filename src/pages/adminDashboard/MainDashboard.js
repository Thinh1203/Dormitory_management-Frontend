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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {building?.map((e, index) => (
                <Tab label={`Khu ${e.khu}`} key={index} {...a11yProps(index)} />
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
                  {e.data?.map((element) => (
                    <Grid item xs={12} sm={6} lg={3}>
                      <div className='rounded-md p-2 bg-cyan-700 text-center text-white'>
                        <Typography>Toa nha: {element.toaNha}</Typography>
                        <Typography>So phong: {element.soPhong}</Typography>
                        <Typography>Con trong: {element.phongTrong}</Typography>
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
              label="Mã tòa nhà"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleClose}>Thêm mới</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>

  );
}
