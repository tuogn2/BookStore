import { URL, URL_IMG } from '~/api';
import style from '../Storeproduct.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CartSlice from '../CartSlice';
import storeSlice from '../StoreSlice';
import { Link } from 'react-router-dom';



const cx = classNames.bind(style)
function Inforproduct({ product, handlerChangAllClack }) {
    const dispatch = useDispatch()
    var realprice = product.product.price * (100 - product.product.discount) / 100

    const [quantity, setquantity] = useState(product.quantitys)

    var total = realprice * quantity;
    const finaltotal = total.toLocaleString("vi-VN")
    const defaultTotal = realprice.toLocaleString("vi-VN")

    const handlerClickOneProduct = () => {
        dispatch(CartSlice.actions.CheckAProduct({
            id: product.product._id,
            isCheck: !product.isCheck
        }))
        handlerChangAllClack()

    }

    const HandlerDeleteProduct = () => {
        fetch(`${URL}/store/deleteproduct`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: localStorage.id,
                ProductID: product.product._id
            })
        })
            .then(res => {
                return res.json()
            })
            .then(value => {
                return;
            })
            .catch(err => console.log(err))
        dispatch(CartSlice.actions.DeleteProduct(product.product._id))
        dispatch(storeSlice.actions.DeleteAItem(product.product._id))
    }

    const handlerAddAquantity = () => {
        setquantity(quantity + 1)
        // dispatch(storeSlice.actions.AddAQuantity(product.product._id))
        dispatch(CartSlice.actions.AddQuantity(product.product._id))
    }
    const handlerMinusQuantity = () => {
        if (quantity <= 1) {
            return;
        }
        setquantity(quantity - 1)
        dispatch(CartSlice.actions.MinusQuantity(product.product._id))
    }
    return (
        <div className={cx('prodductclick')}>
            <div className={cx('check-image')}>
                <input type='checkbox' checked={product.isCheck} onChange={handlerClickOneProduct} />
                <Link to={`/detailproduct/${product.product._id}`}>
                    <div className={cx('costom-product')}>
                        <div className={cx('image')}>
                            {product && <img src={`${URL_IMG}/${product.product.picture}`} alt='product'/>}
                        </div>
                        <div className={cx('title')}>
                            {product.product.productName} - {product.product.author}
                        </div>
                    </div>
                </Link>
            </div>      
            <div className={cx('price')}>
                <b>
                    {defaultTotal}<u>Đ</u>
                </b>
                <h6 >{product.product.price}<u>Đ</u></h6>
            </div>
            <div className={cx('quantity')}>
                <div onClick={handlerMinusQuantity}>
                    <FontAwesomeIcon icon={faSubtract} />
                </div>
                <span> 
                    {quantity}
                </span>
                <div onClick={handlerAddAquantity}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            <div className={cx('price-real')} style={{ marginLeft: 20 }}>
                <b>
                    {finaltotal}<u>Đ</u>
                </b>
            </div>
            <div className={cx("trash")} onClick={HandlerDeleteProduct}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>);
}

export default Inforproduct;