import { Container, Grid, Box, InputLabel, MenuItem, FormControl, Select, Chip, OutlinedInput, Button, TextField } from "@mui/material";
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
import { getAllList } from "../api/device.api";
import { checkStudentRoom } from "../api/registrationForm.api";
import { addNewForm, getOneForm, getUserRepair } from "../api/repairForm.api";
import { toast } from "react-toastify";


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
    const [listRepair, setListRepair] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [check, setCheck] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [listForm, setListForm] = React.useState([]);
    const [detailForm, setDetailForm] = React.useState({});
    const [checkFormData, setCheckFormData] = React.useState(false);
    const [checkUserInRoom, setCheckStudentInRoom] = React.useState(false);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setListRepair(value);
    };

    const handleSubmit = async () => {

        if (listRepair.length < 1)
            return toast.error('Vui lòng điền đủ thông tin!', { position: "bottom-right", autoClose: 1000 });
        const res = await addNewForm(listRepair);
        if (res?.status === 200) {
            setOpenAdd(false);
            return toast.success('Đăng ký thành công!', { position: "bottom-right", autoClose: 1000 });
        } else {
            return toast.error('Có lỗi xảy ra!', { position: "bottom-right", autoClose: 1000 });
        }
    };

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllList();
            setData(res.data);

        };
        fetchApi();
    }, [openAdd]);

    React.useEffect(() => {
        const checkFormRepair = async () => {
            const res = await getUserRepair();
            if (res?.data === undefined) {
                setCheck(true);
            }
            setCheckFormData(true);
            setListForm(res.data)
        };
        checkFormRepair();
    }, []);

    React.useEffect(() => {
        const checkStudentInRoom = async () => {
            const res = await checkStudentRoom();
            if (res?.status === 200) {
                setCheckStudentInRoom(true);
            }
        };
        checkStudentInRoom();
    }, []);

    const handleDetail = async (id) => {
        const res = await getOneForm(id);
        setDetailForm(res.data);
        setOpen(true);
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
                            <Button disabled={!check || !checkUserInRoom} variant="contained" size="small" onClick={() => setOpenAdd(true)} sx={{ marginX: 1 }}>
                                Đăng ký
                            </Button>
                            {/* {list.length > 0 && (<Button variant="contained" size="small" color="error" onClick={handleClickOpen} disabled={!checkStudentInRoom}>
                                Hủy đăng ký
                            </Button>)} */}
                            <Dialog
                                open={openAdd}
                                TransitionComponent={Transition}
                                keepMounted
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle className="text-blue-600 font-medium"> Đăng ký sửa chữa các thiết bị đã chọn?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => setOpenAdd(false)}>Hủy</Button>
                                    <Button onClick={() => handleSubmit()}>Đồng ý</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <FormControl sx={{ m: 1, width: "90%" }}>
                            <InputLabel id="demo-multiple-chip-label">Danh sách thiết bị</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={listRepair}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Danh sách thiết bị" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={data?.find(name => name.id === value).repairCode} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {data?.map((e) => (
                                    <MenuItem
                                        key={e.id}
                                        value={e.id}
                                        style={getStyles(e, listRepair, theme)}
                                    >
                                        {e.repairCode} - {e.repairDetail}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <table className="w-5/6 my-5 mx-auto text-left text-gray-500 dark:text-gray-400 table-auto">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr className="bg-cyan-700 text-white text-xs lg:text-sm text-md text-center font-semibold">
                                {/* <th scope="col" className="px-6 py-3 border-r-2">
                                    
                                </th> */}
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    Thời gian đăng ký
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    Trạng thái xử lý
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2">
                                    Hành động
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {!check ? (
                                <tr className="text-xs lg:text-sm text-md text-center">
                                    <td scope="col" className="px-6 py-3 border-2">
                                        {new Date(listForm?.createdAt).toLocaleString('en-GB', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td scope="col" className="px-6 py-3 border-2">
                                        {listForm?.status ? '' : 'Đang xử lý'}
                                    </td>
                                    <td scope="col" className="px-6 py-3 border-2">
                                        <Button size="small" onClick={() => handleDetail(listForm?.id)}>xem chi tiết</Button>
                                    </td>
                                </tr>
                            ) : (
                                <tr className="text-sm lg:text-lg text-center">
                                    <td colSpan="4" className="text-red-600 font-medium">Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </Grid>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className='text-blue-600 font-medium'>
                        Chi tiết đơn đăng ký
                    </DialogTitle>
                    <DialogContent>

                        <div className='grid grid-cols-2 gap-2'>
                            {
                                detailForm ? detailForm[0]?.listofdevices?.map((e) => (
                                    <React.Fragment>
                                        <div className='mt-2'>
                                            <TextField
                                                label="Mã sửa chữa"
                                                value={e?.repairCode}
                                                sx={{ maxWidth: 300 }}
                                                fullWidth
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <TextField
                                                label="Chi tiết sửa chữa"
                                                value={e?.repairDetail}
                                                sx={{ maxWidth: 300 }}
                                                fullWidth
                                            />
                                        </div>
                                    </React.Fragment>
                                )) : ''
                            }
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='mt-2'>
                                <TextField
                                    label="Thời gian đăng ký"
                                    value={checkFormData ? new Date(detailForm[0]?.repairrequestform.createdAt).toLocaleDateString('en-GB'): ''}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                />
                            </div>
                            <div className='mt-2'>
                                <TextField
                                    label="Thời gian xử lý"
                                    value={(checkFormData && detailForm[0]?.repairrequestform.status) ? new Date(detailForm[0]?.repairrequestform.updatedAt).toLocaleDateString('en-GB') : 'Chưa xử lý'}
                                    sx={{ maxWidth: 300 }}
                                    fullWidth
                                />
                            </div>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} autoFocus>Đóng lại</Button>

                    </DialogActions>
                </Dialog>
            </Container>
            <Footer />
        </div>
    );
}

export default RepairDevicePage;
