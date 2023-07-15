import style from './options.modeule.scss'
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCrown, faHome, faSmile } from '@fortawesome/free-solid-svg-icons';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { URL } from '../../../../api';
import { useDispatch } from 'react-redux';
import inforSlice from '../../../../pages/Auth/inforSlice';
import { cookie } from '~/regex';
import {  infouser } from '~/reudx/selectors';




const cx = className.bind(style)
function Options() {
    const infor = useSelector(infouser)
    // const inforStore = useSelector(inforstore)
    // const [Number, setNumber] = useState(0)

    // useEffect(() => {
    //     if (inforStore[0]) {
    //         setNumber(inforStore[0].products.length)
    //     }
    //     if (inforStore.products) {
    //         setNumber(inforStore.products.length)
    //     }
    // },[inforStore])
   
    const dispatch = useDispatch()
    useEffect(() => {
        if (!localStorage.id) {
            return;
        }
        if (!cookie(document.cookie)) {
            return;
        }
        if (Object.keys(infor.infor).length === 0) {
            fetch(`${URL}/user/user/${localStorage.id}`)
                .then(res => {
                    if (res.status === 500) {
                        throw new Error('Lỗi')
                    }
                    return res.json()
                })
                .then(value => {
                    dispatch(inforSlice.actions.login(value))
                    return;
                })
                .catch(err => {
                    if (err.message === 'Lỗi') {
                        dispatch(inforSlice.actions.logout())
                        return;
                    }
                })
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //infor
    const Userbtn = () => {
        let name = infor.infor.name;
        if (name.length > 10) {
            name = name.slice(0, 7)
            name += '...'
        }
        return (
            <NavLink to={`/Profile`}>
                <div className={cx('option')}>
                    <FontAwesomeIcon icon={faSmile} />
                    <p>{name}</p>
                </div>
            </NavLink>
        )
    }

    const navigate = useNavigate()
    const handlerStore =()=>{
        if (!localStorage.id) {
            console.log('1')
            return navigate('/account');
        }
        if (!cookie(document.cookie)) {
            console.log('2')
            console.log(document.cookie)
            return navigate('/account');
        }
        navigate('/store') 
    }
    return (
        <div className={cx('container-orthers')} >
            <div className={cx('container-options')}>
                <NavLink to={`/`}>
                    <div className={cx('option home')}>
                        <FontAwesomeIcon icon={faHome} />
                        <p>Trang chủ</p>
                    </div>
                </NavLink>
                    <div className={cx('option hide')}>
                        <FontAwesomeIcon icon={faCrown} />
                        <p> Astra</p>
                    </div>

                {infor.state ? <Userbtn /> : <NavLink to={`/account`}>
                    <div className={cx('option')}>
                        <FontAwesomeIcon icon={faSmile} />
                        <p>Tài khoản</p>
                    </div>
                </NavLink>}
            </div>
                <div className={cx('store')} onClick={handlerStore}>
                    <FontAwesomeIcon icon={faCartArrowDown} style={{ color: 'blue' }} />
                    {/* <div>{Number}</div> */}

                </div>
        </div>);
}

export default Options;




