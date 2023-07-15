import classNames from "classnames/bind";
import style from '../Detailproduct.module.scss'


import Priceproduct from "./Priceproduct";
import truck from '~/Images/truck.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Store from "./Store";
import { useNavigate, useParams } from "react-router-dom";
import { URL_IMG } from "~/api";
import { useDispatch, useSelector } from "react-redux";
import { inforproducts, infouser } from "~/reudx/selectors";
import { addProduct } from "~/pages/Storeproduct/StoreSlice";
// import { cookie } from "~/regex";
const cx = classNames.bind(style)
function Product() {
    const dispath = useDispatch()
    const inforOfProducts = useSelector(inforproducts)
    const inforuser = useSelector(infouser)
    const [quantity, setquantity] = useState(1);
    const [infor, setinfor] = useState({})

    const handleminus = () => {
        if (quantity === 1) {

            return setquantity(1);
        }
        return setquantity(quantity - 1)
    }
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        if (id === 'undefined') {
            return navigate('/');
        }
        for (let index = 0; index < inforOfProducts.length; index++) {
            if (inforOfProducts[index]._id === id) {
                setinfor(inforOfProducts[index])
                break;
            }
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inforOfProducts, id]) 


    const handlergetStore = () => {
        if (!localStorage.id) {
            return navigate('/account');
        }
        // if (!cookie(document.cookie)) {
        //     return navigate('/account');
        // }
        dispath(addProduct({
            userid: inforuser.infor._id,
            productID: id,
            quantity: quantity
        }));
        setIsAnimationVisible(false);
        setTimeout(() => {
            setIsAnimationVisible(true);

        }, 1000)

    }


    const [isAnimationVisible, setIsAnimationVisible] = useState(true);
    
    const classname = cx({
        'animation-buyProduct': true,
        hideAnimation: isAnimationVisible
    })
 
    return (<div className={cx('container-product')}>
        <div className={cx('custom-image')}>
            <img src={`${URL_IMG}/${infor.picture}`} alt="img" />
        </div>
        <div className={cx('infor-book')}>
            <div >Tác giả: {infor.author}</div>
            <h4 ><b>{infor.productName}</b></h4> 
            <div >Đã bán 5000+ | {infor.feedback}
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" size="14" color="#fdd836" height="14" width="14" xmlns="http://www.w3.org/2000/svg"
                    style={{ color: `rgb(253, 216, 54)` }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            </div>
            <div className={cx('container-contentbook')}>
                <div className={cx('left')}>
                    <Priceproduct infor={infor} />
                    <div className={cx('location')}>
                        Giao đến:
                        <b><u>H. Sông Hinh, TT. Hai Riêng, Phú Yên</u></b>
                        - <b style={{ color: '#0b74e5' }}>Đổi địa chỉ</b>
                    </div>
                    <div className={cx('ship')}>
                        <div>
                            <img src={truck} alt="ship" />
                            <span><b>Thứ 6, ngày 23/06</b></span>
                        </div>
                        <div>
                            Vận chuyển: 22.000đ
                        </div>
                    </div>
                    <div>
                        <div>Số Lượng</div>
                        <div className={cx("wrap-btnchangquantity")}>
                            <div className={cx('minus')} onClick={handleminus}><FontAwesomeIcon icon={faMinus} /></div>
                            <div className={cx('number')}>
                                {quantity}
                            </div>
                            <div className={cx('minus')} onClick={() => setquantity(quantity + 1)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('btnbuy')}>
                            <button onClick={handlergetStore}>
                                Chọn mua
                            </button>
                            <div className={classname} >
                                <img src={truck} alt="trash"/>
                            </div>
                        </div>
                    </div>
                </div>
                <Store />
            </div>
        </div>

    </div>);
}

export default Product;