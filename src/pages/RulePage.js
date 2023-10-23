import { Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
const RulePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="bg-gray-200">
            <Header />
            <Grid style={{ flex: 1 }}>
                <Container maxWidth="lg">
                    <div className="p-2 rounded-md shadow-md bg-white">
                        <h2 className="bg-blue-100 text-blue-600 font-semibold text-md px-4 py-2 underline">MỘT SỐ NỘI QUY KHI ĐĂNG KÝ NỘI TRÚ</h2>
                        <Grid container p={2}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1" align="justify" mx={1}>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 1. Đối tượng áp dụng
                                        </h4>
                                        <p>
                                            Nội quy này áp dụng cho tất cả sinh viên các hệ đào tạo tại Trường, học viên sau
                                            đại học &#x2768;<i>gọi chung là SV</i>&#x2769; được xét duyệt vào ở Ký túc xá &#x2768;<i>KTX</i>&#x2769;
                                            sau khi thực hiện đầy đủ các thủ tục theo quy định. &#x2768;<i>Đối với SV nước ngoài và các đối tượng khác sẽ có quy định riêng</i>&#x2769;.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 2. Một số quy định chung
                                        </h4>
                                        <p>
                                            1. SV muốn vào ở nội trú tại KTX phải làm các thủ tục và nộp tiền thuê chỗ ở
                                            &#x2768;<i> sau đây gọi là phí KTX </i>&#x2769; theo quy định.
                                            Riêng SV bố trí ở tại KTX-B, còn phải ký Hợp đồng thuê chỗ ở với
                                            Trung tâm Phục vụ sinh viên.

                                        </p>
                                        <p>
                                            <strong>
                                                2. Việc đăng ký nội trú và sắp xếp chỗ ở được tiến hành vào đầu mỗi năm học
                                                và có giá trị trong năm học. Năm học tiếp theo, nếu có nhu cầu ở nội trú, SV phải
                                                thực hiện lại các thủ tục và được sắp xếp lại chỗ ở mới.
                                            </strong>
                                        </p>
                                        <p>
                                            3. SV phải tuân theo sự quản lý, điều động, sắp xếp chỗ ở của TT. PVSV; Nếu có
                                            nhu cầu thay đổi chỗ ở phải được sự đồng ý của TT. PVSV.
                                        </p>
                                        <p>
                                            4. Phí KTX nộp theo học kỳ &#x2768;<i> vào đầu mỗi học kỳ. </i>&#x2769; Quá thời gian quy định, nếu
                                            SV không nộp phí KTX, xem như SV không có nhu cầu ở, hệ thống sẽ hủy bỏ chỗ ở
                                            SV đã bố trí. SV trả chỗ trước thời hạn sẽ được hoàn phí KTX thời gian còn lại &#x2768;<i> thực
                                                hiện đúng các thủ tục hoàn phí theo quy định </i>&#x2769;.

                                        </p>
                                        <p>
                                            5. SV được cấp Phiếu Đăng ký nội trú. Phiếu ĐKNT dùng để kiểm soát
                                            SV tại phòng ở và xuất trình cho bộ phận chức năng khi có yêu cầu. Phiếu ĐKNT sử
                                            dụng có thời hạn trong khu vực KTX.

                                        </p>
                                        <p>
                                            6. Khi phụ huynh hoặc người thân đến thăm có nhu cầu lưu lại qua đêm, SV phải
                                            đăng ký với Văn phòng TT. PVSV hoặc Tổ Bảo vệ KTX, sẽ được bố trí ở khu vực
                                            riêng.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 3. Quy định về sinh hoạt
                                        </h4>
                                        <p>
                                            1. SV nội trú khi ra vào khu vực KTX phải mang <strong>Thẻ Sinh viên</strong> và đúng giờ quy
                                            định.
                                        </p>
                                        <p>
                                            2. Không làm ồn ào gây ảnh hưởng đến người khác trong giờ nghỉ &#x2768;<i>Buổi trưa từ
                                                12 giờ đến 13 giờ; Buổi tối từ 23 giờ đến 5 giờ sáng hôm sau</i>&#x2769;.
                                        </p>
                                        <p>
                                            3. Không được qua khu vực KTX SV khác giới; Không tiếp khách trong phòng ở
                                            &#x2768;<i>kể cả SV nội trú ở phòng khác</i>&#x2769;.
                                        </p>
                                        <p>
                                            4. Không hút thuốc trong phòng ở và khu vực công cộng.
                                        </p>
                                        <p>
                                            5. Không treo màn che &#x2768;<i>ri-đô</i>&#x2769;quanh giường ngủ; Quần áo, đồ dùng cá nhân,
                                            sách vở phải sắp xếp gọn gàng, ngăn nắp.
                                        </p>
                                        <p>
                                            6. Không chơi thể thao trong khuôn viên KTX, trừ những khu vực được quy định.
                                        </p>
                                        <p>
                                            7. Không tổ chức và uống rượu, bia trong KTX.
                                        </p>
                                        <p>
                                            8. Không được nấu ăn trong phòng ở và khu vực KTX  &#x2768;<i>Trừ các dãy nhà có thiết
                                                kế và lắp đặt trang thiết bị cho phép nấu ăn tại KTX-A </i>&#x2769; Không để thức ăn, thực phẩm
                                            vào tủ đựng đồ.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 4. Quy định về sử dụng phòng ở
                                        </h4>
                                        <p>
                                            1. Không được di chuyển giường, tủ và các vật dụng trang bị trong phòng; Không
                                            được tự ý sửa chữa, cải tạo phòng ở hay làm thay đổi kết cấu của thiết kế công trình.
                                        </p>
                                        <p>
                                            2. Không được trang bị, lắp đặt thêm thiết bị cá nhân như: kệ sách, tủ, các vật
                                            dụng khác… làm ảnh hưởng đến không gian chung trong phòng; Không được viết, vẽ,
                                            dán giấy lên tường.

                                        </p>
                                        <p>
                                            3. SV có trách nhiệm bảo quản tài sản chung trong phòng ở và KTX. Khi có hư
                                            hỏng, phải báo cáo với TT. PVSV để được sửa chữa; SV phải chịu trách nhiệm đền bù
                                            về những hư hỏng, mất mát do mình gây ra đối với trang thiết bị trong phòng ở và của
                                            KTX.

                                        </p>
                                        <p>
                                            <strong>4. SV tự bảo quản tư trang, đồ đạc và tài sản cá nhân.</strong> Khuyến cáo không mang
                                            vào và cất giữ tại phòng ở tài sản có giá trị khác không liên quan đến việc phục vụ cho
                                            công tác học tập và sinh hoạt để tránh mất cắp.

                                        </p>
                                        <p>
                                            5. Không được tự ý sử dụng, làm hỏng các thiết bị chữa cháy hoặc mở khóa báo
                                            động khi không có cháy nổ xảy ra trong khu vực.

                                        </p>
                                        <p>
                                            6. Thực hiện đúng các quy định về sử dụng internet &#x2768; <i> WIFI </i> &#x2769;.

                                        </p>
                                        <p>
                                            7. Cho phép SV sử dụng các thiết bị điện:
                                            - Máy tính, máy in phục vụ cho công việc học tập;
                                            - Bàn ủi điện, ấm nấu nước dùng điện công suất nhỏ &#x2768; <i> dưới 1.000 W </i> &#x2769;
                                            - Quạt điện để bàn, bóng đèn;
                                            - Các phương tiện điện tử khác phục vụ cho học tập có công suất nhỏ.

                                        </p>
                                        <p>
                                            8. Khi hết hạn ở KTX, SV có trách nhiệm bàn giao chỗ ở và các tài sản thuộc
                                            KTX đúng thời gian, vệ sinh phòng ở và khôi phục lại như hiện trạng ban đầu. Nếu
                                            quá thời hạn, SV không thực hiện trả phòng, TT. PVSV sẽ tiến hành lập Biên bản thu
                                            hồi phòng, tài sản của SV còn trong phòng, TT. PVSV sẽ không chịu trách nhiệm về
                                            mất mát và hư hỏng.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 5. Công tác vệ sinh môi trường, cảnh quan
                                        </h4>
                                        <p>
                                            1. SV có trách nhiệm tham gia vệ sinh và sắp xếp ngăn nắp trong phòng ở, tổng
                                            vệ sinh trong khu vực xung quanh dãy nhà, khu vực cầu thang các dãy nhà cao tầng.
                                        </p>
                                        <p>
                                            2. Để rác đúng nơi quy định.
                                        </p>
                                        <p>
                                            3. Tích cực tham gia chăm sóc cảnh quan môi trường trong khu vực KTX, tham
                                            gia các đợt tổng vệ sinh KTX do TT. PVSV tổ chức.
                                        </p>
                                        <p>
                                            4. Không được đặt bát hương thờ cúng trong phòng ở và trong khu vực KTX;
                                            Không nuôi cá, vật nuôi trong phòng ở và khu vực KTX; Không trồng các loại thực
                                            vật, cây kiểng, hoa trong phòng ở và hành lang các dãy nhà.
                                        </p>
                                    </div>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1" align="justify" mx={1}>

                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 6. Công tác giữ gìn an ninh trật tự
                                        </h4>
                                        <p>
                                            1. Phải nêu cao tinh thần trách nhiệm trong công tác giữ gìn an ninh trật tự
                                            , an toàn xã hội; Luôn đề cao cảnh giác, phát hiện và báo cáo kịp thời kẻ xấu
                                            trà trộn gây rối, trộm cắp trong khu vực KTX
                                        </p>
                                        <p>
                                            2. Nghiêm cấm các hành vi sau:
                                        </p>
                                        <p>
                                            - Tham gia biểu tình, tự ý tụ tập đông người; Kích động, lôi kéo người khác biểu
                                            tình, viết truyền đơn, áp-phích trái pháp luật
                                        </p>
                                        <p>
                                            - Chứa chấp, buôn bán vũ khí và hàng cấm theo quy định của nhà nước
                                        </p>
                                        <p>
                                            - Tàng trữ, lưu hành, truy cập, sử dụng sản phẩm văn hóa đồi trụy hoặc tham gia
                                            các hoạt động mê tín dị đoan, hoạt động tôn giáo trái phép
                                        </p>
                                        <p>
                                            - Buôn bán, vận chuyển, tàng trữ, sử dụng và lôi kéo người khác sử dụng ma túy
                                        </p>
                                        <p>
                                            - Tổ chức hoặc tham gia đánh bạc, mại dâm dưới mọi hình thức
                                        </p>
                                        <p>
                                            - Chứa chấp, che giấu hàng lậu, tội phạm
                                        </p>
                                        <p>
                                            - Đánh nhau, tổ chức hoặc tham gia đánh nhau gây mất ANTT
                                        </p>
                                        <p>
                                            - Lấy cắp tài sản, chứa chấp, tiêu thụ tài sản do người khác lấy cắp mà có; </p>
                                        <p>
                                            3. SV cần trực tiếp phản ánh hoặc đề xuất với TT. PVSV các vấn đề liên quan
                                            nhằm xây dựng KTX; Luôn đề cao cảnh giác để không bị kẻ xấu lợi dụng; Không vận
                                            động hoặc tham gia ký đơn tập thể.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 7. Quy định về sử dụng nhà xe KTX
                                        </h4>
                                        <p>
                                            1. Nhà xe KTX chủ yếu để phục vụ SV nội trú. SV gởi xe đạp được miễn phí; Xe
                                            mô tô, xe đạp điện nộp phí theo quy định &#x2768;<i> SV không nộp phí gởi xe thì trả theo mức
                                                phí vãng lai sau mỗi lần gởi &#x2769; </i>.
                                        </p>
                                        <p>
                                            2. Mỗi SV chỉ đăng ký gởi 1 phương tiện &#x2768;<i> xe đạp, hoặc mô tô, hoặc xe đạp điện  </i>&#x2769;
                                            để được hưởng ưu đãi như ở khoản 1 - Điều 7 Nội quy này. Nếu mỗi SV gởi hơn 1
                                            phương tiện thì từ phương tiện thứ 2 trở đi, SV phải nộp theo mức phí vãng lại.
                                        </p>
                                        <p>
                                            3. Nhà xe phục vụ giữ xe cho SV theo học kỳ. Thời gian nghỉ Tết Nguyên đán và
                                            thời gian nghỉ Hè, SV phải lấy xe ra khỏi nhà xe để thực hiện công tác vệ sinh, bảo trì,
                                            sắp xếp nhà xe. SV có nhu cầu gởi lại xe trong thời gian này thì làm thủ tục và nộp phí
                                            theo quy định.
                                        </p>
                                        <p>
                                            4. Sau mỗi năm học, các xe vô chủ, xe gởi quá thời hạn TT. PVSV sẽ đề xuất nhà
                                            trường xử lý &#x2768;<i>thanh lý</i>&#x2769;. Thẻ giữ xe, phiếu giữ xe quá hạn sau mỗi học kỳ xem như
                                            không còn giá trị, nhà xe không chịu trách nhiệm về hư hỏng, mất mát. Các trường
                                            hợp lấy xe quá thời hạn, SV phải chi trả phí vãng lai thời gian lấy trễ.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 8. Quy định về sử dụng điện, nước và chi trả phí điện, nước
                                        </h4>
                                        <p>
                                            1. Mỗi phòng ở SV được lắp đặt đồng hồ đo chỉ số điện và nước &#x2768;<i>trừ các dãy nhà
                                                có cấu trúc đặc biệt&#x2769;</i>. Hàng tháng, SV chi trả phí điện, nước theo chỉ số sử dụng thực
                                            tế. Đầu mỗi học kỳ, đại diện SV tại phòng ở sẽ ký Biên bản xác nhận chỉ số điện, nước
                                            của phòng ở &#x2768;<i>ghi nhận chỉ số đầu học kỳ </i>&#x2769;, làm cơ sở theo dõi và đối soát số liệu cuối
                                            học kỳ.
                                        </p>
                                        <p>
                                            kỳ.
                                            2. Hàng tháng &#x2768;<i>thời điểm cụ thể ngày giờ do Giám thị thông báo</i>&#x2769;, đại diện SV
                                            phòng ở ghi chỉ số điện nước vào bảng theo dõi, Giám thị ghi nhận để tính chi phí SV
                                            phải chi trả hàng tháng. Trường hợp SV chậm trễ trong công tác ghi chỉ số hàng tháng,
                                            Giám thị sẽ áp chỉ số bình quân hàng tháng để tạm tính.
                                        </p>
                                        <p>
                                            3. SV có trách nhiệm chi trả phí điện, nước hàng tháng đúng thời gian quy định.
                                        </p>
                                        <p>
                                            4. Khi phát hiện hư hỏng đồng hồ đo điện, nước hoặc nghi ngờ đồng hồ đo không
                                            chính xác, SV phải báo ngay cho TT. PVSV để sửa chữa hoặc thay thế kịp thời. Các
                                            trường hợp hư hỏng SV không báo sửa chữa &#x2768; <i>hoặc thay thế</i>&#x2769; sẽ phải chi trả chi phí sử
                                            dụng do thất thoát nếu có.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            Điều 9. Khen thưởng, kỷ luật
                                        </h4>
                                        <p>
                                            1. Tập thể, cá nhân SV thực hiện tốt nội quy, có thành tích trong các hoạt động tự
                                            quản, an ninh xung kích, các hoạt động văn hóa văn nghệ, TDTT, vệ sinh môi trường,
                                            các hoạt động vì lợi ích cộng đồng, xây dựng KTX… sẽ được xem xét khen thưởng.
                                        </p>
                                        <p>
                                            2. Tập thể, cá nhân SV vi phạm, tùy mức độ sẽ bị xử lý kỷ luật theo Phụ lục Nội
                                            dung vi phạm và khung xử lý kỷ luật ban hành kèm theo Nội quy này.
                                        </p>
                                    </div>
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

export default RulePage;