import style from '~/pages/Detailproduct/Detailproduct.module.scss'
import classNames from "classnames/bind";

import picprice from '~/Images/picprice.png'
import newpic from '~/Images/dontknow.gif'

const cx = classNames.bind(style)
function    Priceproduct({infor}) {
    var realprice = infor.price * (100 - infor.discount) / 100
    if (realprice > 1000) {
        realprice = `${Math.floor(realprice / 1000)}.000`
    }
    return (
        <div className={cx('container-price')}>
            <div className={cx('price-product')}>
                <h2>
                    {realprice} <u>đ</u>
                </h2>
                <h6>{infor.price} <u>đ</u></h6>
                <div className='h6'>-{infor.discount}%</div>
            </div>
            <div className={cx('container-discount')}>
                <div className={cx('discount')}> 
                    <img src={picprice} alt='price' />
                    <div>
                        Thưởng 0,49 ASA (≈ 103đ)
                    </div>
                </div>
                <div>
                    <img src={newpic} alt='new'/>
                </div>
            </div>
        </div>);
}

export default Priceproduct;