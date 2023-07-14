import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { inforCart, inforproducts, inforstore } from '~/reudx/selectors';
import style from './Storeproduct.module.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Nothingcart from '~/Images/donhaveProduct.png'


import Inforproduct from './Inforproduct';
import InforDiscount from './InforDiscount';
import { useEffect } from 'react';
import CartSlice from './CartSlice';
import storeSlice from './StoreSlice';
import Footer from '~/component/Layout/componet/Footer';
import { URL } from '~/api';
import { Link } from 'react-router-dom';



const cx = classNames.bind(style)
function Storeproduct() {

    const dispatch = useDispatch()
    const [ischecked, setIsChecked] = useState(false)
    const handlerChangAllClack = () => {
        setIsChecked(false)
    }
    const inforStore = useSelector(inforstore)
    const inforProducts = useSelector(inforproducts)
    let inforcheck = []
    useEffect(() => {
        inforProducts.map((product) => {
            if (inforStore[0]) {
                for (let k = 0; k < inforStore[0].products.length; k++) {
                    if (inforStore[0].products[k].productID === product._id) {
                        inforcheck = [...inforcheck, {
                            product: product,
                            quantitys: inforStore[0].products[k].quantity,
                            isCheck: false
                        }]
                        return null
                    }
                }
            }
            return null;
        })
        if (inforcheck.length > 0) {
            dispatch(CartSlice.actions.getCart(inforcheck))
        }
        inforcheck = [];
    }, [inforStore, inforProducts])


    const arrGetCart = useSelector(inforCart)
    let total = 0;
    arrGetCart.map((item) => {
        if (item.isCheck === true) {
            total += item.quantitys * item.product.price * (100 - item.product.discount) / 100
        }
        return null;
    })
    const handlerClickCheckAll = () => {
        setIsChecked(!ischecked) 
        if (!ischecked) {
            dispatch(CartSlice.actions.CheckAllCart())
        } else if (ischecked) {
            dispatch(CartSlice.actions.NotCheckAllCart())
        }
    }
    let finalTotal = total.toLocaleString("vi-VN")

    const handlerDeleteAll = () => {
        fetch(`http://localhost:5000/api/store/deletecart`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: localStorage.id
            })
        })
            .then(res => {
                return res.json()
            })
            .then(value => {
                // console.log(value)
                return null;
            })
            .catch(err => console.log(err))
        dispatch(CartSlice.actions.DeleteCart())
        dispatch(storeSlice.actions.clearStore())
    }

    const handlerBuyProducts = () => {
        arrGetCart.map((item) => {
            if (item.isCheck === true) {
                dispatch(CartSlice.actions.DeleteProduct(item.product._id))
                dispatch(storeSlice.actions.DeleteAItem(item.product._id))
                fetch(`${URL}/store/deleteproduct`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userid: localStorage.id,
                        ProductID: item.product._id
                    })
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(value => {
                        return null;
                    })
                    .catch(err => console.log(err))


            }
            return null;
        })
        return null
    }
    const Nothing = () => {
        return <div className={cx("wrap-nothingStore")}>
            <div className={cx("wrap-img")}>
                <img src={Nothingcart} alt='nothing cart' />
            </div>
            <div className={cx("navigate-home")}>
                <Link to={'/'}>
                    <div className='btn btn-danger btn-lg'>Chọn Mua</div>
                </Link>
            </div>
        </div>
    }
    return (
        <div className={cx('wrap-page')}>
            <div className='h2'>Giỏ hàng</div>
            <div className={cx('wrap-store')}>
                <div className={cx('name-column')}>
                    <div className={cx('infor-store')}>
                        <div className={cx('check-box')}>
                            <input id='checkall' type='checkbox' checked={ischecked} onChange={handlerClickCheckAll} />
                            <label htmlFor='checkall'>Tất cả (n sản phẩm)</label>
                        </div>
                        <div className={cx("real-quantity")} style={{ width: 190 }}>
                            Đơn giá
                        </div>
                        <div style={{ width: 140 }}>Số lượng</div>
                        <div style={{ width: 140 }}>Thành tiền</div>
                        <div className={cx('trash')} onClick={handlerDeleteAll}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <div className={cx('bunker')}>
                        {arrGetCart.length === 0 ? <Nothing /> : arrGetCart.map((product, index) => {
                            return <Inforproduct
                                key={index}
                                product={product}
                                handlerChangAllClack={handlerChangAllClack}
                            />
                        })
                        }
                    </div>
                </div>
                <div className={cx('buying')}>
                    <div className={cx('container-discount')}>
                        <InforDiscount />
                    </div>
                    < div className={cx("wrap-bill")}>
                        <div className={cx('wrap-money')}>
                            <p>Tổng tiền</p>
                            <span>
                                {finalTotal} Đ
                            </span>
                        </div>
                        <div className='btn btn-danger btn-lg d-flex justify-content-center' onClick={handlerBuyProducts}>
                            Mua hàng
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('costom-footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default Storeproduct;