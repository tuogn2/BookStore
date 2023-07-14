import style from '../auth.module.scss'
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import authSlice from '../authSlice';
import { useState } from 'react';
import { URL } from '../../../api/index.js'
import { useNavigate } from 'react-router-dom';
import inforuserSlice from '../inforSlice';
import { regexpass, regexuser } from '~/regex';

const cx = classNames.bind(style);
function Signin() {
    const dispath = useDispatch()
    const [user, setuser] = useState('')
    const [pass, setpass] = useState('')
    const [repeap, setrepeap] = useState('')
    const navigate = useNavigate()

    const [notifiuser, setnotifiuser] = useState('')
    const [notifipass, setnotifipass] = useState('')
    const [notifirepeap, setnotifirepeap] = useState('')
    const handlearowlogin = () => {
        return dispath(authSlice.actions.arowlogin())
    }
    const handleuser = (e) => {
        setuser(e.target.value)
    }

    const handlepass = (e) => {
        setpass(e.target.value)
    }
    const handlerepeap = (e) => {
        setrepeap(e.target.value)
    }


 
  
    const handleclicksignin = () => {
        if (regexuser(user) === false) {
            setnotifiuser('Tên phải lớn hơn 10 kí tự')
            return;
        } else {
            if (user.length > 0) {
                setnotifiuser('')
            }
        }

        if (regexpass(pass) === false) {
            setnotifipass('Pass phải lớn hơn 8 kí tự')
            return
        } else {
            if (pass.length > 0) {
                setnotifipass('')
            }
        }
        if (pass !== repeap) {
            return setnotifirepeap('No match')
        } else {
            setnotifirepeap('')
        }
        fetch(`${URL}/user/createuser`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: pass
            })
        })
            .then(res => {
                if (res.status === 400) {
                    throw new Error('Đã tạo rồi!!')
                }
                return res.json() 
            })
            .then(value => {
                localStorage.setItem('id', `${value._id}`)
                dispath(inforuserSlice.actions.login(value))
                return navigate('/')
            })
            .catch(err => {
                if (err.message === 'Đã tạo rồi!!') {
                     setnotifiuser(`${err.message}`)
                }
            })

    }
    return (
        <div className={cx('formlogin')}>
            <div className={cx('title')}>Sign in </div>
            <div className={`container ${cx('content')}`}>
                Books ignite minds, broaden horizons. They transport, inspire, enlighten. In their pages,
                worlds unfold, dreams take flight. Explore, discover, escape, within.                    </div>
            <div className={cx('input')}>
                <label htmlFor='usernamelogout' >
                </label>
                <input type="text" id="usernamelogout" onChange={handleuser} placeholder="Enter user name" />
                <p className={cx('notifi')}>{notifiuser}</p>

            </div>
            <div className={cx('input')}>
                <label htmlFor='passlogout'>
                </label>
                <input type="password" id='passlogout' onChange={handlepass} placeholder="Enter password" />
                <p className={cx('notifi')}>{notifipass}</p>

            </div>
            <div className={cx('input')}>
                <label htmlFor='repeappass'>
                </label>
                <input type="password" id='repeappass' onChange={handlerepeap} placeholder="Repeap password" />
                <p className={cx('notifi')}>{notifirepeap}</p>

            </div>

            <div className={cx('button')}>
                <div className="btn btn-primary" onClick={handleclicksignin} >
                    Sign in
                </div>
            </div>
            <div className={cx('more-options')}>
                <div className={cx('arowlogin')} onClick={handlearowlogin}>Đăng Nhập -></div>
            </div>
        </div>);
}

export default Signin;