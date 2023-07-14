import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './search.module.scss'
import className from 'classnames/bind'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { inforproducts } from '~/reudx/selectors';

import React from 'react';
import Tippy from '@tippyjs/react/headless';
import ShowSearch from './ShowSearch';
import { regexSearch } from '~/regex';

const cx = className.bind(style)
function Search() {
    const inforProduct = useSelector(inforproducts)
    const [txt, settxt] = useState('')
    const [showResult, setshowResult] = useState(false)

    const handleSerach = (e) => {
        settxt(e.target.value)
    }

    const handlerClick = () => {
        settxt('')
    }
    const CheckSameThing = () => {
        if (txt.length === 0) {
            return null;
        }
        let check = 0;
        const searchResults = [];
        for (let index = 0; index < inforProduct.length; index++) {
            const product = inforProduct[index];
            if (check >= 7) {
                break;
            }
            if (regexSearch(txt, product.productName)) {
                check++;
                searchResults.push(<ShowSearch product={product} key={index} handlerClick={handlerClick} />);
            }
        }
        return searchResults;
    };

    return (
        <>
            <Tippy
                visible={showResult && txt.length > 0}
                interactive
                placement='bottom-start'
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <div className={cx("wrap-resualt")}>
                            <CheckSameThing />
                        </div>
                    </div>
                )}
                onClickOutside={() => setshowResult(false)}
 
            >
                <div className={cx('search')}>
                    <FontAwesomeIcon icon={faSearch} style={{ color: '#808089', paddingLeft: 10 }} />
                    <input placeholder='Rẻ mỗi ngày, không chỉ một ngày' value={txt} onFocus={() => setshowResult(true)} onChange={handleSerach} />
                    <div className={`btn ${cx('btn-search')}`} >
                        Tìm kiếm
                    </div>
                </div>
            </Tippy>
        </>
    );
}

export default (Search);