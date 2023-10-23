import { Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const IntroducePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="bg-gray-200">
            <Header />
            <Grid style={{ flex: 1 }}>
                <Container maxWidth="lg">
                    <div className="p-2 rounded-md shadow-md bg-white">
                        <h2 className="bg-blue-100 text-blue-600 font-semibold text-md px-4 py-2 underline">Một số thông tin chung về chỗ ở của sinh viên tại ký túc xá</h2>
                        <Grid container p={2}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1" align="justify" mx={1}>
                                    Ký túc xá địa chỉ tin cậy cho sinh viên an tâm sinh hoạt, học tập và rèn luyện. Với sức chứa 8.780 Sinh viên, là nơi rất thuận tiện trong việc ăn ở, sinh hoạt và học tập tại Trường. KTX có hàng rào bao quanh, có lực lượng bảo vệ chuyên nghiệp 24/24.
                                    Tất cả sinh viên &#x2768;SV&#x2769; có nhu cầu ở KTX đều được bố trí vào ở ngay sau khi nộp hồ sơ nhập học.
                                    <p>
                                        Những tiện ích dành cho SV nội trú:
                                    </p>
                                    <p>
                                        -  Wifi tốc độ kết nối là 14Mbps/ 14Mbps &#x2768;download/upload&#x2769;, miễn phí gởi xe đạp.
                                    </p>

                                    <p>
                                        - Các khu KTX đều có hệ thống siêu thị mini, căng-tin, nhà xe. Căn tin, nhà ăn: Phục vụ SV với nhiều mức giá cho SV lựa chọn tùy theo nhu cầu, bảo đảm về dinh dưỡng và tuyệt đối về vệ sinh, an toàn thực phẩm với nhiều mức giá cho SV lựa chọn tùy khả năng và nhu cầu.
                                    </p>

                                    <p>
                                        - Được tham gia các câu lạc bộ học thuật, các hoạt động văn hóa, văn nghệ, thể dục thể thao, rèn luyện kỹ năng mềm.
                                    </p>
                                    <p>
                                        - Khu vui chơi, luyện tập TDTT cho SV.
                                    </p>
                                    <p>
                                        - Ngoài ra còn các dịch vụ khác phục vụ nhu cầu ăn, ở và sinh hoạt của SV.
                                    </p>
                                    <p>
                                        KTX có loại phòng <strong>được phép nấu ăn</strong>, với sức chứa tối thiểu 03 SV.
                                    </p>
                                    <p>
                                        Phí KTX từ 170.000 - 350.000 đồng/SV/tháng &#x2768;Chưa bao gồm phí điện, nước&#x2769;. SV có thể lựa chọn thích hợp theo nhu cầu và điều kiện kinh tế.
                                    </p>
                                    <p>
                                        - SV trả tiền điện, nước theo chỉ số sử dụng thực tế. Mức tính giá điện, nước theo giá tiêu dùng hộ gia đình.
                                    </p>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1" align="justify" mx={1}>

                                    <p>
                                        * SV diện chính sách – xã hội, SV có hoàn cảnh khó khăn:
                                    </p>

                                    <p>
                                        + Loại bố trí 08 SV/phòng &#x2768;04 giường tầng&#x2769;. Đây là đối tượng phục vụ chính của KTX. Nhà trường đảm bảo đáp ứng đầy đủ các nhu cầu chỗ ở nội trú của SV thuộc đối tượng này.

                                    </p>
                                    * SV ở theo nhu cầu &#x2768;ứng với các mức phí khác nhau, nếu KTX còn chỗ&#x2769;:

                                    <p>
                                        <strong>
                                            - Khu A:
                                        </strong>
                                    </p>

                                    <p>
                                        + Loại bố trí 03 SV/phòng &#x2768;được phép nấu ăn&#x2769;
                                    </p>
                                    <p>
                                        + Loại bố trí 04 SV/phòng &#x2768;được phép nấu ăn&#x2769;
                                    </p>

                                    <p>
                                        + Loại bố trí 05 SV/phòng &#x2768;được phép nấu ăn&#x2769;

                                    </p>
                                    <p>
                                        + Loại bố trí 06 SV/phòng &#x2768;được phép nấu ăn&#x2769;
                                    </p>

                                    <p>
                                        + Loại bố trí 08 SV/phòng &#x2768;được phép nấu ăn&#x2769;
                                    </p>

                                    <p>
                                        <strong>
                                            - Khu B:
                                        </strong>
                                    </p>
                                    <p>
                                        + Loại bố trí 02 SV/phòng &#x2768;02 giường tầng&#x2769;
                                    </p>
                                    <p>
                                        + Loại bố trí 03 SV/phòng &#x2768;03 giường tầng&#x2769;
                                    </p>
                                    <p>
                                        + Loại bố trí 04 SV/phòng &#x2768;04 giường tầng&#x2769;
                                    </p>
                                    <p>
                                        + Loại bố trí 05 SV/phòng &#x2768;05 giường tầng&#x2769;
                                    </p>
                                    <p>
                                        + Loại bố trí 06 SV/phòng &#x2768;06 giường tầng&#x2769;
                                    </p>
                                    <p>
                                        + Loại bố trí 08 SV/phòng &#x2768;08 giường tầng&#x2769;
                                    </p>
                                    <p>- Nếu gửi xe gắn máy hoặc môtô phải nộp thêm khoản phí phụ thu giữ xe theo quy định.</p>


                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Grid>
            <Footer />
        </div>
    );
}

export default IntroducePage;