import style from '../auth.module.scss'
import classNames from 'classnames/bind';

import { useDispatch, } from 'react-redux'
import authSlice from '../authSlice';
import { useState } from 'react';
import { URL } from '../../../api';
import { useNavigate } from 'react-router-dom';
import inforuserSlice from '../inforSlice';
import { regexpass, regexuser } from '~/regex';

const cx = classNames.bind(style);
function Login() {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [pass, setpass] = useState('')
    const [notifiuser, setnotifiuser] = useState('')
    const [notifipass, setnotifipass] = useState('')
    const handlearowsignin = () => {
        return dispath(authSlice.actions.arowlogout())
    }
    const handleusername = (e) => {
        setusername(e.target.value)
    }

    const handlepass = (e) => {
        setpass(e.target.value)
    }



    const handlelogin = () => {
        if (regexuser(username) === false) {
            setnotifiuser('Tên phải lớn hơn 10 kí tự')
            return;
        } else {
            if (username.length > 0) {
                setnotifiuser('')
            }
        }

        if (regexpass(pass) === false) {
            setnotifipass('Pass phải lớn hơn 8 kí tự')
            return
        } else {
            setnotifipass('') 
        }

        fetch(`${URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: pass
            })
        })
            .then(res => {
                if (res.status === 401) {
                    throw new Error('Username not found')
                }
                if (res.status === 403) {
                    throw new Error('wrong password')
                }
                return res.json()
            })
            .then(value => {
                localStorage.setItem('id', `${value._id}`)
                dispath(inforuserSlice.actions.login(value))
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return navigate('/');
            })
            .catch(err => {
                if (err.message === 'Username not found') {
                    setnotifiuser(err.message)
                }
                if (err.message === 'wrong password') {
                    setnotifipass(err.message)
                }
            })

    }
    return (
        <div className={cx('formlogin')}>
            <div className={cx('title')}>Login </div>
            <div className={`container ${cx('content')}`}>
                Books ignite minds, broaden horizons. They transport, inspire, enlighten. In their pages,
                worlds unfold, dreams take flight. Explore, discover, escape, within.                    </div>
            <div className={cx('input')}>
                <label htmlFor="username">
                </label>
                <input type="text" id="username" onChange={handleusername} placeholder="Enter user name" />
                <p className={cx('notifi')}>{notifiuser}</p>
            </div>
            <div className={cx('input')}>
                <label htmlFor="password">
                </label>
                <input type="password" id='password' onChange={handlepass} placeholder="Enter password" />
                <p className={cx('notifi')}>{notifipass}</p>
            </div>
            <div className={cx('more-options')}>
                <div>
                    <input type='checkbox' id='remember' />
                    <label htmlFor='remember'> Remember</label >
                </div>
                <div className={cx('signin')} onClick={handlearowsignin}>Bạn chưa có tài khoản?</div>
            </div>
            <div className={cx('button')}>
                <div className="btn btn-primary" onClick={handlelogin}>
                    Login
                </div>
            </div>
        </div>
    );
}

export default Login;