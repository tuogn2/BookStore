import { Link } from 'react-router-dom';

import logo from '../../../../Images/logo.png'

import style from './header.module.scss'
import className from 'classnames/bind'
import Search from '../Search';

import Options from '../Options';
import { memo, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getproducts } from '~/pages/Detailproduct/productsSlice';



const cx = className.bind(style)
function Header() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getproducts())
    
    },[dispatch])
    return ( 
        <div className={cx('containet-header')}>
            <div className={cx('logo')}>
                <Link to={`/`}>
                    <img src={logo} alt='logo' />
                </Link>
            </div>
            <Search />
            <Options />
        </div>);
}

export default memo(Header);