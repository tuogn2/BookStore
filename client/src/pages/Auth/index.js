import loginimg from '../../Images/login.jpg'

import classNames from 'classnames/bind';
import style from './auth.module.scss'
import Signin from './Signin';
import Login from './Login';
import {useSelector} from 'react-redux'
import { auth } from '../../reudx/selectors';
const cx = classNames.bind(style);
function Auth() {
    const authcheck =  useSelector(auth)
   
    return ( 
        <div className={cx('container-loginfrom')}>
            <div className={cx('wraperform')}>
                <img className={cx('img')} src={loginimg} alt="img" />
                {authcheck?<Login/>:<Signin/>}
            </div>
        </div>
    );
}

export default Auth;