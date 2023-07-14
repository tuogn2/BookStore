import style from '~/pages/Detailproduct/Detailproduct.module.scss'
import classNames from "classnames/bind";
import { memo, useState } from 'react';

import avt from '~/Images/avtstore.jpg'
import ofical from '~/Images/ofical.png'
import protect from '~/Images/protect.png'
import like from '~/Images/like.png'
import back from '~/Images/back.png'
import { faPlus, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(style)
 
function Store() {
    const [folow, setfolow] = useState(false)
    const classNames = cx({
        'shop': true,
        folowed: folow
    })

    return (
        <div className={cx('right')}>
            <div className={cx('wrap-inforstore')}>
                <img className={cx('avt')} src={avt} alt='avt' />
                <div>
                    <div><b>BookStore</b></div>
                    <img src={ofical} alt='offical' />
                </div>
            </div>
            <div className={cx('wrap-shop')}>
                <div className={cx('shop')}>
                    <div>
                        <FontAwesomeIcon icon={faShop} />
                    </div>
                    <span >
                        Shop
                    </span>
                </div>
                <div className={classNames} onClick={() => setfolow(!folow)}>
                    <div>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <span >
                        Theo dõi
                    </span>
                </div>

            </div>
            <div className={cx('container-contents')}>
                <div className={cx("wrap-infordetailshop")}>
                    <div className={cx('protect')}>
                        <img src={protect} alt='protect' />
                    </div>
                    <div className={cx('content')}>
                        Hoàn tiền
                        111%
                        nếu hàng giả
                    </div>
                </div>
                <div className={cx("wrap-infordetailshop")}>
                    <div className={cx('protect')}>
                        <img src={like} alt='like' />
                    </div>
                    <div className={cx('content')}>
                        Mở hộp
                        kiểm tra
                        nhận hàng
                    </div>
                </div>
                <div className={cx("wrap-infordetailshop")}>
                    <div className={cx('protect')}>
                        <img src={back} alt='back' />
                    </div>
                    <div className={cx('content')}>
                        Đổi trả trong
                        30 ngày
                        nếu sp lỗi.
                    </div>
                </div>
            </div>
        </div>);
}

export default memo(Store);