import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import "./mobilesearch.scss";

MobileSearch.propTypes = {

};

function MobileSearch(props) {
    // const inputR = useRef(null);
    const initialValues = {
        values: ""
    }
    const [searchClass, setSearchClass] = useState(false);
    return (
        <Formik initialValues={initialValues}>
            {formikProps => {
                const { values, touched, errors } = formikProps;
                return (
                    <Form action="/" className="mobilesearchform">
                        <label htmlFor="right__mobilesearch__cb" className="mobilesearchform__back"><FontAwesomeIcon icon={faArrowLeft} /></label>
                        <input className="mobilesearchform__search-input" type="search" name="svalue" placeholder="Gõ để tìm kiếm ..." />
                        <button className="mobilesearchform__sm" type="submit" > <FontAwesomeIcon icon={faSearch} />  </button>
                    </Form>
                )
            }}
        </Formik>

    );
}

export default MobileSearch;