import style from './Sitebar.module.scss'
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buttonoption from "../Buttonoption";
import {
   faBell, faCartShopping, faCreditCard, faEye,
   faHeart, faLocationDot, faNoteSticky, faStarHalfStroke, faUser
} from "@fortawesome/free-solid-svg-icons";

import avatar from '~/Images/avatar.png'
import { useDispatch } from 'react-redux';
import inforSlice from '../../../../pages/Auth/inforSlice';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import storeSlice from '~/pages/Storeproduct/StoreSlice';

const cx = classNames.bind(style)
function Sitebar() {
   const SitebarOption = [
      {
         icon: <FontAwesomeIcon icon={faUser} />,
         content: 'Thông tin cá nhân', active: true
      },
      {
         icon: <FontAwesomeIcon icon={faBell} />,
         content: 'Thông báo của tôi', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faNoteSticky} />,
         content: 'Quản lý đơn hàng', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faLocationDot} />,
         content: 'Số địa chỉ', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faCreditCard} />,
         content: 'Thông tin thanh toán', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faEye} />,
         content: 'Sản phẩm đã xem', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faHeart} />,
         content: 'Sản phẩm yêu thích', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faCartShopping} />,
         content: 'Sản phẩm mua sau', active: false
      },
      {
         icon: <FontAwesomeIcon icon={faStarHalfStroke} />,
         content: 'Nhận xét của tôi', active: false
      },
   ]
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleclicklogout =()=>{
      dispatch(storeSlice.actions.clearStore())
      dispatch(inforSlice.actions.logout())
      return navigate('/account')
   }
   return (
      <div>
         <div className={cx('container-title')}>
            <div>
               <img src={avatar} alt='avatar'/>
            </div>
            <div className={cx('')}>
               Tài khoản của
               <h5>Tài khoản Facebook</h5>
            </div>
         </div>
         <div className={cx('containet-sitebar')}>
            {SitebarOption.map((option,index) => {
               return <Buttonoption key={index} content={option.content} icon={option.icon} active={option.active} />
            })} 
         </div>

         <div className={cx('btn-logout')} onClick={handleclicklogout}>
               Log out
         </div>
      </div>
   );
}

export default memo(Sitebar);