import React, { useRef, useState } from 'react';
import './search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

Search.propTypes = {

};

function Search() {
    const history = useHistory();
    const inputR = useRef(null);
    const [values, setValues] = useState('');
    const [searchClass, setSearchClass] = useState(false);
    const showSb = () => {
        if (searchClass === false) {
            setSearchClass(true);
            inputR.current.focus();
        }
    }
    const hideSb = () => {
        setSearchClass(false);
    }
    const handleSetValues = (e) => {
        setValues(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values !== '') {
            history.push('/home/category/search/' + values);
        }
    }
    return (
        <form className="searchform" onSubmit={(e) => handleSubmit(e)}>
            <input className={searchClass ? "search-input" : 'hide-search'} ref={inputR} onBlur={hideSb} onChange={(e) => handleSetValues(e)} type="search" name="search" value={values} placeholder="Gõ để tìm kiếm ..." />
            <button className="searchform__sm" type="submit" onClick={showSb}> <FontAwesomeIcon icon={faSearch} />  </button>
        </form>

    );
}

export default Search;