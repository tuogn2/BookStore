import style from './Detailproduct.module.scss'
import classNames from 'classnames/bind';
import Product from './product';
import Anotherproduct from './Anotherproduct';
import Footer from '~/component/Layout/componet/Footer';


const cx = classNames.bind(style)
function Detailproduct() {
    return (
        <div className={cx('container-detail')}>
            <Product />
            <Anotherproduct />
            <Footer />
        </div>);
} 

export default Detailproduct;