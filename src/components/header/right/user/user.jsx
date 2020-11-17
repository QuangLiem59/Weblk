import React from 'react';
import './user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

User.propTypes = {

};

function User(props) {
    return (
        <div className="user">
            <button className="user__bt" type="button"> <FontAwesomeIcon icon={faUser} />  </button>

        </div>
    );
}

export default User;