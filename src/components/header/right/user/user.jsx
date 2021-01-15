import React from 'react';
import './user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

User.propTypes = {

};

function User() {
    return (
        <div className="user">
            <NavLink className="user__bt" to="/user/login"> <FontAwesomeIcon icon={faUser} />  </NavLink>
        </div>
    );
}

export default User;