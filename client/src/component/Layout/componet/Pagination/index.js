import { useState } from "react";
import Miniproduct from "../Miniproduct";


import style from './pagination.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(style)
function Pagination({ products }) {
    const totalproduct = products.length // tổng số sách
    const perpage = 12 // mỗi trang có bao nhiêu sách
    const quantity = Math.ceil(totalproduct / perpage) // cóa bao nhiêu trang
    const [fillters, setfillters] = useState(1) // hiện đang ở trang nào
    var start = (fillters-1)*perpage // đắt đầu trong mãng 
    var end = fillters*perpage // kết thúc mãng muốn lấy 
    const Productpagination = ()=>{
        var Check =[]
        //phai thêm điều kiện i < tổng số sách vì nếu quá thì chọc vào mãng ko được
        for (let i =start ;i < end && i < totalproduct;i++) {
           Check.push( <Miniproduct key={i} product={products[i]} />)
        }
        return Check;
    } 
    
    return (
        <>
           
            <Productpagination/>
            <div className={cx('wrap-pagination')}>
                <button className="btn btn-primary" disabled={fillters===1 ?true:false} onClick={()=>setfillters(fillters-1) }>prev</button>
                {Array.from({ length: quantity }, (_, index) => {
                    var bool = fillters === index+1?true:false
                    var cssButton = cx({
                        button: true,
                        checked:bool
                    })

                    return <div key={index} onClick={()=>setfillters(index + 1)}  className={cssButton}>{index + 1}</div>
                }
                )}
                <button className="btn btn-primary" disabled={fillters===6 ?true:false} onClick={()=>setfillters(fillters+1) }>next</button>
            </div>
        </>);
}

export default Pagination;