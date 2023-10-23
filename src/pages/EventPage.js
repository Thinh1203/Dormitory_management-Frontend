import { Container, Grid, Typography, CardMedia, CardContent, CardActionArea, Card, Divider } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const List = [
    {
        "id": 1,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
    {
        "id": 2,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
    {
        "id": 3,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
    {
        "id": 4,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
    {
        "id": 5,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
    {
        "id": 6,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
    {
        "id": 7,
        "title": "Thông báo đăng ký ở ktx học kỳ 1 năm 2023-2024",
        "date": "22/12/2023"
    },
];

const EventPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="bg-gray-200">
            <Header />
            <Grid style={{ flex: 1 }}>
                <Container maxWidth="lg">
                    <div className="p-2 rounded-md shadow-md bg-white">
                        <h2 className="bg-blue-100 text-blue-600 font-semibold text-md px-4 py-2 underline">TIN TỨC - SỰ KIỆN - THÔNG BÁO</h2>
                        <Grid container p={2}>
                            {
                                List?.map((e, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} padding={2} key={index}> 
                                        <Card sx={{ maxWidth: 345 }} >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image="https://thcsthanhvan.thanhoaiedu.vn/uploads/thcsthanhvan/news/2022_08/hinh-anh-thong-bao.png"
                                                    alt="green iguana"
                                                />
                                                <Divider />
                                                <CardContent>
                                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ display: "flex" }}>
                                                        <EventAvailableIcon color="error" fontSize="small" /> <Typography fontSize={15} marginLeft={2} color={"GrayText"}>{e.date}</Typography>
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={"bold"} color="text.secondary">
                                                        {e.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>

                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                </Container>
            </Grid>
            <Footer />
        </div>
    );
}

export default EventPage;