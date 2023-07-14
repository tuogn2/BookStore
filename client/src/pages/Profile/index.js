import { useState } from 'react';
import style from './profile.module.scss'
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';


import avt from '~/Images/avt.png'
import { infouser } from '~/reudx/selectors';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import goolge from '~/Images/google.png'
import facebook from '~/Images/face.png'
const cx = classNames.bind(style)
function Profile() {
    const infor = useSelector(infouser)
    const [user, setuser] = useState({})
    useEffect(() => {
        setuser(infor.infor)
    }, [infor.infor])
    return (
        <div className={cx('container-profile')}>
            <div className={cx('title')}>
                <p>
                    Thông tin cá nhân
                </p>
            </div>
            <div className={`container ${cx('wraper-content')}`}>
                <div className={cx('infro-user')}>
                    <div className={cx('infor')}>
                        Thông tin cá nhân
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className={cx('wrapper-avatar')}> 
                            <img src={avt} alt='avt'  />
                        </div>
                        <div className={cx('name-nickname')}>
                            <div className={cx('name')}>
                                <div style={{ marginRight: 10, width: 110 }}>
                                    ID
                                </div>
                                <input className={cx('input')} type='text' value={user._id ? user._id : 'No ID'} disabled />
                            </div>
                            <div className={cx('name')}>
                                <div style={{ marginRight: 10, width: 110 }}>
                                    Họ & Tên
                                </div>
                                <input className={cx('input')} type='text' value={user.name ? user.name : 'No name'} disabled />
                            </div>
                        </div>
                    </div>
                    <div className={cx('birđay')}>
                        <div style={{ marginRight: 50, width: 80 }}>
                            Ngày Sinh
                        </div>
                        <select>
                            <option>Ngày</option>
                            {(() => {
                                let day = [];
                                for (let index = 1; index < 31; index++) {
                                    day.push(<option key={index}>{index}</option>);
                                }
                                return day;
                            })()}
                        </select>
                        <select>
                            <option>Tháng</option>
                            {(() => {
                                let month = [];
                                for (let index = 1; index < 12; index++) {
                                    month.push(<option key={index}>{index}</option>);
                                }
                                return month;
                            })()}
                        </select>
                        <select>
                            <option>Năm</option>
                            {(() => {
                                let month = [];
                                for (let index = 2023; index >= 1990; index--) {
                                    month.push(<option key={index}>{index}</option>);
                                }
                                return month;
                            })()}
                        </select>

                    </div>
                    <div className={cx('sex')}>
                        <div style={{ marginRight: 50, width: 80 }}>
                            Giới tính
                        </div>
                        <div className={cx('radio-gender')}>
                            <div>
                                <input type='radio'defaultChecked name='gender' value={`male`} />
                                <span>
                                    Nam
                                </span>
                            </div>
                            <div>
                                <input type='radio' name='gender' value={`female`} />
                                <span>
                                    Nữ
                                </span>
                            </div>
                            <div>
                                <input type='radio' name='gender' value={`orther`} />
                                <span>
                                    Khác
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sex')}>
                        <div style={{ marginRight: 50, width: 80, marginBottom: 10 }}>
                            Quốc tịch
                        </div>
                        <div className={cx('radio-gender')}>
                            <input value={`Viet Nam`} disabled />
                        </div>
                    </div>
                    <div className={cx('container-btn')}>
                        <div className='btn btn-primary disabled' >
                            Lưu thay đổi
                        </div>
                    </div>
                </div>
                
                <div className={cx('connect')}>
                    <div className={cx('infor')}>
                        Số điện thoại và email
                    </div>
                    <div className={cx('wrap-update')}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 10 }}>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div>
                                <div>
                                    Số điện thoại
                                </div>
                                <div>
                                    0976474170
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn')} disabled>
                            Cập nhập
                        </div>
                    </div>
                    <div className={cx('wrap-update')}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 10 }}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div>
                                <div>
                                    Địa chỉ email
                                </div>
                                <div>
                                    dctuong021203@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn')} disabled>
                            Cập nhập
                        </div>
                    </div>
                    <div className={cx('infor')}>
                        Liên kết mạng xã hội
                    </div>
                    <div className={cx('wrap-update')}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 10 }}>
                                <img style={{ width: 20 }} alt='face' src={facebook} />
                            </div>
                            <div>
                                Facebook
                            </div>
                        </div>
                        <div className={cx('btn')} disabled>
                            Cập nhập
                        </div>
                    </div>
                    <div className={cx('wrap-update')}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 10 }}>
                                <img style={{ width: 20 }} alt='goolge' src={goolge} />
                            </div>
                            <div>
                                Goolge
                            </div>
                        </div>
                        <div className={cx('btn')} disabled>
                            Cập nhập
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Profile;