
import classNames from "classnames/bind";
import style from './home.module.scss'
import Banner from "~/component/Layout/componet/Banner";
import Footer from "~/component/Layout/componet/Footer";
import Pagination from "~/component/Layout/componet/Pagination";
import {  useSelector } from "react-redux";
import { inforproducts } from "~/reudx/selectors";
import SiteBarHome from "./SiteBarHome";




const cx = classNames.bind(style)
function Home() {
    // const [products, setproducts] = useState([{}])
    // useEffect(() => {
        // fetch(`${URL}/product`)
        //     .then(res => res.json())
        //     .then(value => {
        //         return setproducts(value)
        //     })
        //     .catch(err => console.log(err))
    // }, [])
    const products = useSelector(inforproducts)
   
    return (
        <div className={cx('wrap-home')}>
            <div className={cx('options')}>
                <div className="h4">
                    Nổi bật
                </div>
                
                    <SiteBarHome/>
            </div>
            <div className={cx('products')}>
                <Banner />
                <div className={cx('wrap-products')}>
                    <Pagination products={products} />
                </div>
                <Footer />
            </div> 
        </div>);
}

export default Home;