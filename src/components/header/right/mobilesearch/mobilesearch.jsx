import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import "./mobilesearch.scss";
import { useHistory } from 'react-router-dom';

MobileSearch.propTypes = {

};

function MobileSearch() {
    const history = useHistory();
    const [values, setValues] = useState('');

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
        <form className="mobilesearchform" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="right__mobilesearch__cb" className="mobilesearchform__back"><FontAwesomeIcon icon={faArrowLeft} /></label>
            <input className="mobilesearchform__search-input" type="search" name="search" onChange={(e) => handleSetValues(e)} value={values} placeholder="Gõ để tìm kiếm ..." />
            <button className="mobilesearchform__sm" type="submit" > <FontAwesomeIcon icon={faSearch} />  </button>
        </form>
    );
}

export default MobileSearch;