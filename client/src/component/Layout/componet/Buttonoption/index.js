import style from './Buttonoption.module.scss'
import classNames from 'classnames/bind';



const cx = classNames.bind(style)
function Buttonoption({ content, icon, active }) {
    const wrapperIcon = cx({ wrappericon: active }) 
    return (
        <div className={`${cx('containerbutton')} ${wrapperIcon}`}>
            <div className={cx('containericon')}>
                {icon} 
            </div >
            <div >{content}</div>
        </div>
    );
}

export default Buttonoption;