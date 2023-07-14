import style from './miniproduct.module.scss'
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';


import Layzyimage from '../Lazyimage';
import loading from '~/Images/loading.gif'

const cx = classnames.bind(style) 
function Miniproduct({ product }) {
    var realprice = product.price * (100 - product.discount) / 100
    if (realprice > 1000) {
        realprice = `${Math.floor(realprice / 1000)}.000`
    } 
   
    return (
        <Link to={`/detailproduct/${product._id}`} >
            <div className={cx('wrap-miniproduct')} >
                <Layzyimage picture={product.picture}  plahoderSrc={loading} />
                <div className={cx('product-name')}>
                    {product.productName} - {product.author}
                </div>
                <div className={cx('money-feedback')}>
                    <div className={cx('feedback')}>
                        {product.feedback}<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" size="14" color="#fdd836" height="14" width="14" xmlns="http://www.w3.org/2000/svg"
                            style={{ color: `rgb(253, 216, 54)` }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                    </div>
                    |
                    <div>
                        <div className={cx('price-discount')}>
                            <div className={`${cx('price')} h6`}><b >{realprice}Đ</b></div>
                            -<span>{product.discount}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>);
}

export default Miniproduct;