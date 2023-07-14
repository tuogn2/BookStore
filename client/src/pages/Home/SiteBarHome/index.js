import face from '~/Images/face.png'
import google from '~/Images/google.png'
import instar from '~/Images/instagram.png'
import twitter from '~/Images/twitter.png'
import tiktok from '~/Images/tiktok.png'

import classNames from "classnames/bind";
import style from '../home.module.scss'
import { memo } from 'react';
const cx = classNames.bind(style)
function SiteBarHome() {
    return (
        <div>
            <a href='https://www.facebook.com/Tuogn' target='_blank' rel="noreferrer">
                <div className={cx("wrap-option")}>
                    <div>
                        <img src={face} alt='face'/>
                    </div>
                    <span>FaceBook</span>
                </div>
            </a>
            <button className={cx("wrap-option")} disabled>
                <div>
                    <img src={google} alt='google' />
                </div>
                <span>Google</span>
            </button>
            <button className={cx("wrap-option")} disabled>
                <div>
                    <img src={instar} alt='instar' />
                </div>
                <span>Instagram</span>
            </button>
            <button className={cx("wrap-option")} disabled>
                <div>
                    <img src={twitter} alt='twitter' />
                </div>
                <span>Twitter</span>
            </button>
            <button className={cx("wrap-option")} disabled>
                <div>
                    <img src={tiktok} alt='tiktok'/>
                </div>
                <span>Tiktok</span>
            </button>
        </div>
    );
}

export default memo(SiteBarHome);