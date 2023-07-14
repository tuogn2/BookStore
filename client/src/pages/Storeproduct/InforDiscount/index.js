import style from '../Storeproduct.module.scss'
import classNames from 'classnames/bind';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTicket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style)
function InforDiscount() {

    return (
        <div style={{ padding: 10 }} className={cx('container-discounts')} >
            <div className={cx("wrap-discount")}>
                <span>
                    Tiki Khuyến Mãi
                </span> 
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    có thể chọn 2
                    <div className={cx('more-infor')}> 
                        <FontAwesomeIcon icon={faExclamation} />
                    </div>
                </div>
            </div>
            <div className={cx('click-onclick')}>
                <div>
                    <FontAwesomeIcon icon={faTicket} />
                </div>
                <span >
                    Chọn hoặc nhập Khuyến mãi khác
                </span>
            </div>
        </div>);
}

export default InforDiscount;