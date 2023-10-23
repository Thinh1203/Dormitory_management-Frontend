import { Container, Grid, Box, InputLabel, MenuItem, FormControl, Select, Chip, OutlinedInput, Button } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Transition } from "../utils/createTheme";

const names = [
    {
        "id": 1,
        "masuachua": "CSVC_1",
        "tensuachua": "Hư cửa lùa",
    },
    {
        "id": 2,
        "masuachua": "CSVC_2",
        "tensuachua": "Kẹt cửa",
    },
    {
        "id": 3,
        "masuachua": "CSVC_3",
        "tensuachua": "Rớt bản lề hố rác",
    },
    {
        "id": 4,
        "masuachua": "CSVC_4",
        "tensuachua": "Hư tay khóa cửa sổ",
    },
    {
        "id": 5,
        "masuachua": "CSVC_5",
        "tensuachua": "Hư khóa cửa chính",
    },
    {
        "id": 6,
        "masuachua": "CSVC_6",
        "tensuachua": "Hư bản lề cửa chính",
    },
    {
        "id": 7,
        "masuachua": "CSVC_7",
        "tensuachua": "Hư bản lề cửa nhà tắmh",
    },
    {
        "id": 8,
        "masuachua": "CSVC_8",
        "tensuachua": "Rớt la phong",
    },
    {
        "id": 9,
        "masuachua": "CSVC_9",
        "tensuachua": "Nhà dột",
    },
    {
        "id": 10,
        "masuachua": "CSVC_10",
        "tensuachua": "Bể gạch nền",
    }
];

const list = [
    {
        "id": 1,
        "masuachua": "csvc_1",
        "tensuachua": "Hư cửa lùa",
        "ngay": "22/12/2001",
        "status": false,
    }, {
        "id": 2,
        "masuachua": "csvc_1",
        "tensuachua": "Hư cửa lùa",
        "ngay": "22/12/2001",
        "status": false,
    },
    {
        "id": 3,
        "masuachua": "csvc_1",
        "tensuachua": "Hư cửa lùa",
        "ngay": "22/12/2001",
        "status": false,
    },
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name.id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const RepairDevicePage = () => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container sx={{ flex: 1 }} maxWidth="md">
                <Grid sx={{ paddingY: 3 }} className="rounded-md shadow-lg my-2 bg-gray-100" >
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                        <div className="flex">
                            <h2 className="px-6 text-blue-500 text-md lg:text-lg  font-semibold underline">
                                Đăng ký sửa chữa CSVC
                            </h2>
                            <Button variant="contained" size="small" onClick={handleClickOpen} sx={{marginX: 1}}>
                                Đăng ký
                            </Button>
                            {list.length > 0 && (<Button variant="contained" size="small" color="error" onClick={handleClickOpen}>
                                Hủy đăng ký
                            </Button>)}
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Đồng ý đăng ký sửa chữa?"}</DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Đồng ý</Button>
                                    <Button onClick={handleClose}>Hủy</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <FormControl sx={{ m: 1, width: "90%" }}>
                            <InputLabel id="demo-multiple-chip-label">Danh sách thiết bị</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Danh sách thiết bị" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={names.find(name => name.id === value).tensuachua} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem
                                        key={name.id}
                                        value={name.id}
                                        style={getStyles(name, personName, theme)}
                                    >
                                        {name.masuachua} - {name.tensuachua}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <table className="w-5/6 my-5 mx-auto text-left text-gray-500 dark:text-gray-400 table-auto">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr className="bg-cyan-700 text-white text-xs lg:text-sm text-md text-center font-semibold">
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    Loại sửa chữa
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    Thời gian đăng ký
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    Trạng thái xử lý
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {list.length > 0 ? list?.map((e, index) => (
                                <tr className="text-xs lg:text-sm text-md text-center" key={index}>
                                    <td scope="col" className="px-6 py-3 border-2">
                                        {index + 1}
                                    </td>
                                    <td scope="col" className="px-6 py-3 border-2">
                                        {e.tensuachua}
                                    </td>
                                    <td scope="col" className="px-6 py-3 border-2">
                                        {e.ngay}
                                    </td>
                                    <td scope="col" className="px-6 py-3 border-2">
                                        {!e.status && "Chưa xử lý"}
                                    </td>
                                </tr>
                            )) : "Không có dữ liệu"}
                        </tbody>
                    </table>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default RepairDevicePage;
