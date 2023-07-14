import { useRef, useState } from "react";
import { URL_IMG } from "~/api";


import classNames from "classnames/bind";
import style from './Lazyimage.module.scss'
const cx = classNames.bind(style)
function Layzyimage({ picture, plahoderSrc,contaicss }) {
    const [isloading, setloading] = useState(true)
    const plahoderRef = useRef(null)
    const hident = cx({
        hident: isloading,
        show: !isloading
    })

    //mới đầu khi đang loading thì state là true thì css sẽ có giá trị ẩn thì hình dự phòng sẽ chạy và hình chính sẽ 
    //mất vì class ăn giá trị ẩn khi loading xong thì loading là false thì usestate re render lại 
    //và loading có giá trị là false
    return (<>
        {isloading && <img
            src={plahoderSrc}
            alt='loading' 
            className={contaicss}
            ref={plahoderRef} />}
        <img
            src={`${URL_IMG}/${picture}`}
            className={hident}
            onLoad={() => setloading(false)}
            alt="loading"
        />
    </>);
}

export default Layzyimage;