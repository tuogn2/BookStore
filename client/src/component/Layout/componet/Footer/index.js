import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Footer.module.scss'
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import logo from '~/Images/logo.png'
import face from '~/Images/face.png'
import goolge from '~/Images/google.png'
import { faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react'; 

const cx = classNames.bind(style)
function Footer() {
    return (<div className={cx('container-footer')}>
        <div>
            <Link to={`/`}>
                <img src={logo} alt='logo' />
            </Link>
        </div>
        <div>
            <div className={cx('infor-creater')}>
                <div>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <p>
                    Đỗ Chí Tường
                </p>
            </div>
            <div className={cx('infor-creater')}>
                <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <p>
                    12 Nguyễn Văn Bảo,Gò Vấp
                </p>
            </div>
            <div className={cx('infor-creater')}>
                <div>
                    <FontAwesomeIcon icon={faPhone} />
                </div>
                <p>
                    0976474170
                </p>
            </div>
        </div>

        <div className={cx("social")}>
            <a href='https://www.facebook.com/Tuogn'>
                <img src={face} alt='facebook' />
                <div>
                    Tường
                </div>
            </a>
            <div className={cx('gmail')}>
                <img src={goolge} alt='gôlge' />
                <div>
                    dctuong021203@gmail.com
                </div>
            </div>
        </div>

    </div>);
}

export default memo(Footer);