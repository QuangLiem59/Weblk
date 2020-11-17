import React from 'react';
import './footer.scss';

Footer.propTypes = {

};

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__container__content">
                    <div className="footer__container__content__left">
                        <div className="footer__container__content__left__first">
                            <ul>
                                Thông Tin
                                <li><p>Giới Thiệu</p></li>
                                <li><p>Liên Hệ</p></li>
                                <li><p>Đối Tác</p></li>
                                <li><p>Tuyển Dụng</p></li>
                            </ul>
                        </div>
                        <div className="footer__container__content__left__second">
                            <ul>
                                Chính Sách
                                <li><p>Chính Sách Đổi Hàng</p></li>
                                <li><p>Chính Sách Bảo Hành</p></li>
                                <li><p>Chính Sách Bảo Mật</p></li>
                                <li><p>Chính Sách Hoàn Tiền</p></li>
                            </ul>
                        </div>
                        <div className="footer__container__content__left__third">
                            <ul>
                                FAQ
                                <li><p>Thanh Toán Và Vận Chuyển</p></li>
                                <li><p>Hướng Dẫn Mua Hàng</p></li>
                                <li><p>Kiểm Tra Thông Tin Đơn Hàng</p></li>
                                <li><p>Câu Hỏi Thường Gặp</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__container__content__right">
                        <div className="footer__container__content__right__first">
                            <div className="footer__container__content__right__first__1">
                                <h2>Mua Hàng Trực Tuyến</h2>
                            </div>
                            <div className="footer__container__content__right__first__2">
                                <p>1900 0397-1</p>
                            </div>
                            <div className="footer__container__content__right__first__3">
                                <p>mhtt@abstore.vn</p>
                            </div>
                        </div>
                        <div className="footer__container__content__right__second">
                            <div className="footer__container__content__right__second__1">
                                <h2>Chăm Sóc Khách Hàng</h2>
                            </div>
                            <div className="footer__container__content__right__second__2">
                                <p>1900 0397-2</p>
                            </div>
                            <div className="footer__container__content__right__second__3">
                                <p>cskh@abstore.vn</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;