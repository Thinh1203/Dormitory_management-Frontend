import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PhonelinkOffIcon from '@mui/icons-material/PhonelinkOff';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { item, itemCategory } from '../../utils/createTheme';
import Collapse from '@mui/material/Collapse';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
const Navigator = (props) => {
  const { ...other } = props;
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          <span>
            <i>
              <span className='font-serif text-3xl font-bold text-yellow-300'>Dor</span>
              <span className='font-serif text-2xl font-semibold text-blue-700'>mi</span>
              <span className='font-serif text-2xl font-semibold text-orange-500'>to</span>
              <span className='font-serif text-2xl font-semibold text-pink-700'>ry</span>
            </i>
          </span>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>ADMIN DASHBOARD</ListItemText>
        </ListItem>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding>
            <ListItemButton sx={item} component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <DomainAddIcon />
              </ListItemIcon>
              <ListItemText>Quản lý tòa nhà</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding>
            <ListItemButton sx={item} component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <BedroomChildIcon />
              </ListItemIcon>
              <ListItemText>Quản lý phòng</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding>
            <ListItemButton sx={item} component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Quản lý sinh viên</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding>
            <ListItemButton sx={item} component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText>Quản lý admin</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding>
            <ListItemButton sx={item} component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <PhonelinkOffIcon />
              </ListItemIcon>
              <ListItemText>Báo hỏng thiết bị</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding onClick={handleToggle}>
            <ListItemButton sx={item}>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText>Quản lý hóa đơn</ListItemText>
              <ListItemIcon>
                {!open ? (<ArrowDropDownIcon />) : (<ArrowDropUpIcon />)}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ bgcolor: '#1D2C40' }}>
            <ListItem disablePadding sx={{ marginLeft: 1 }}>
              <ListItemButton sx={item} component={Link} to="/admin/dashboard">
                <ListItemIcon>
                  <MoreVertIcon />
                </ListItemIcon>
                <ListItemText>Quản lý điện nước</ListItemText>
              </ListItemButton>
            </ListItem>
          </Box>
          <Box sx={{ bgcolor: '#1D2C40' }}>
            <ListItem disablePadding sx={{ marginLeft: 1 }}>
              <ListItemButton sx={item} component={Link} to="/admin/dashboard">
                <ListItemIcon>
                  <PriceCheckIcon />
                </ListItemIcon>
                <ListItemText>Quản lý tiền phòng</ListItemText>
              </ListItemButton>
            </ListItem>
          </Box>
        </Collapse>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding>
            <ListItemButton sx={item} component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText>Quản lý thông báo</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </Drawer>
  );
}

export default Navigator;