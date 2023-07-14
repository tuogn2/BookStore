import { useEffect } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Miniproduct from "~/component/Layout/componet/Miniproduct";
import { inforproducts } from "~/reudx/selectors";
import { getproducts } from "../productsSlice";

import classNames from "classnames/bind";
import style from '../Detailproduct.module.scss'

const cx =classNames.bind(style)
function Anotherproduct() {
    const dispatch = useDispatch()
    const products = useSelector(inforproducts)
    useEffect(()=>{
        if(!products[0]){
            dispatch(getproducts())
        }
    },[products])
    return ( <div className={cx('wrap-miniproducts')}>
        {products.map((product,index)=>{
            return <Miniproduct key={index} product={product} />
        })}
    </div> );
}

export default memo(Anotherproduct);