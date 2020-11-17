import React, { useRef, useState } from 'react';
import './search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';

Search.propTypes = {

};

function Search(props) {
    const inputR = useRef(null);
    const initialValues = {
        values: ""
    }
    const [searchClass, setSearchClass] = useState(false);
    const showSb = () => {
        setSearchClass(true);
        inputR.current.focus();

    }
    const hideSb = () => {
        setSearchClass(false);
    }
    return (
        <Formik initialValues={initialValues}>
            {formikProps => {
                const { values, touched, errors } = formikProps;
                return (
                    <Form action="/" className="searchform">
                        <input className={searchClass ? "search-input" : 'hide-search'} ref={inputR} onBlur={hideSb} type="search" name="svalue" placeholder="Gõ để tìm kiếm ..." />
                        <button className="searchform__sm" type="submit" onClick={showSb}> <FontAwesomeIcon icon={faSearch} />  </button>
                    </Form>
                )
            }}
        </Formik>

    );
}

export default Search;