import { Link } from "react-router-dom";
import Header from "../componet/Header";
import Sitebar from "../componet/Sitebar";
import style from './Profilelayout.module.scss'
import classNames from "classnames/bind";
import Footer from "../componet/Footer";


const cx = classNames.bind(style)
function ProfileLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('wrapper-link')}>
                    <Link to='/'><p className={cx("linkhome")}>Trang chủ</p></Link>
                     >Thông tin tài khoản
                </div>
                <div className={cx('wrapper-content')}  >

                    <Sitebar />
                    {children}
                </div>
            </div> 
            <div>
                <Footer />

            </div>

        </>);
}

export default ProfileLayout;