import { URL_IMG } from '~/api';
import style from '../search.module.scss'
import className from 'classnames/bind'
import { Link } from 'react-router-dom';

const cx = className.bind(style)
function ShowSearch({ product,handlerClick }) {
    
    return (<Link to={`/detailproduct/${product._id}`}>
        <div className={cx("ShowSearch")} onClick={handlerClick}>
            <div>
                <img src={`${URL_IMG}/${product.picture}`}  alt=' // eslint-disable-next-line react-hooks/exhaustive-deps img'/>
            </div>
            <div>
                {product.productName}
            </div> 
        </div>
    </Link>);
}

export default ShowSearch;