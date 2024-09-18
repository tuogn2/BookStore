
import Signin from "./Signin";
import Login from "./Login";
import { useSelector } from "react-redux";
import { auth } from "../../reudx/selectors";
function Auth() {
  const authcheck = useSelector(auth);

  return (
    <>{authcheck ? <Login /> : <Signin />}</>

    // <div className={cx('container-loginfrom')}>
    //     <div className={cx('wraperform')}>
    //         <img className={cx('img')} src={loginimg} alt="img" />
    //
    //     </div>
    // </div>
  );
}

export default Auth;
