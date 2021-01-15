import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import userApi from 'api/userApi';
import './index.scss'
import { Link, useHistory } from 'react-router-dom';
import PartLoading from 'components/partloading';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { getUserInfor, logout } from 'features/cart/userslice';
import { unwrapResult } from '@reduxjs/toolkit';

UserProfile.propTypes = {

};

function UserProfile(props) {
    const [userProfile, setUserProfile] = useState({});
    const [userData, setUserData] = useState([]);
    const [activeEdit, setActiveEdit] = useState(false);
    const [statusChangePassword, setStatusChangePassword] = useState(false);
    const token = localStorage.getItem('AccessToken');
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(getUserInfor()).then(res => {
                    const data = unwrapResult(res);
                    setUserProfile(data.user);
                });
            } catch (err) {
                message.warning(" Current login has expired, please login again!");
                localStorage.removeItem('AccessToken');
                history.push('/user/login');
            }
        }
        fetchData();

    }, [token])

    useEffect(() => {
        userProfile.password && statusChangePassword ?
            setUserData([{ propName: "username", value: userProfile.username }, { propName: "password", value: userProfile.password }])
            :
            setUserData([{ propName: "username", value: userProfile.username }])
    }, [userProfile, statusChangePassword])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserProfile({ ...userProfile, [name]: value });

    }
    const handleEditActive = () => {
        setActiveEdit(!activeEdit);
        setStatusChangePassword(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('AccessToken');
        dispatch(logout());
        history.push('/');
    }
    const handleSetStatusPassword = () => {
        setStatusChangePassword(!statusChangePassword)
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const updatePf = await userApi.UpdateProfile([...userData]);
            message.success(updatePf.message);
            history.push('/user/info');

        } catch (err) {
            message.warning(err.response.data.message);
        }
    }
    return (
        <div className="UserProfile">
            <div className="UserProfile__container">
                <div className="UserProfile__container__location">
                    <ul className="UserProfile__container__location__list">
                        <li className="UserProfile__container__location__list__lc">
                            <Link to="/">
                                Trang Chủ
                                </Link>
                        </li>
                        <li className="UserProfile__container__location__list__lc">
                            <Link to="user/infor">
                                Thông tin khách hàng
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="UserProfile__container__box">
                    <div style={userProfile.email ? { display: 'none' } : { display: "block" }}>
                        <PartLoading />
                    </div>
                    <form className="UserProfile__container__box__form" style={userProfile.email ? { display: 'block' } : { display: "none" }} onSubmit={handleSubmitForm}>
                        <div className="UserProfile__container__box__form__title">
                            Thông tin khách hàng
                        </div>
                        <div className="UserProfile__container__box__form__name">
                            <label>Name : </label>
                            <p style={!activeEdit ? { display: 'block' } : { display: 'none' }}>{userProfile.username || ''}</p>
                            <input type="text" value={userProfile.username || ''} name="username" onChange={(e) => handleInputChange(e)} style={activeEdit ? { display: 'block' } : { display: 'none' }} />
                        </div>
                        <div className="UserProfile__container__box__form__email" style={activeEdit ? { opacity: 0, maxHeight: 0, visibility: "hidden", marginBottom: 0 } : { opacity: 1, maxHeight: "none", visibility: "visible", marginBottom: '5rem' }}>
                            <label>Email :</label>
                            <p >{userProfile.email || ''}</p>
                        </div>
                        <div className="UserProfile__container__box__form__password" style={statusChangePassword ? { opacity: 1, maxHeight: "none", visibility: "visible", marginBottom: '5rem' } : { opacity: 0, maxHeight: 0, visibility: "hidden", marginBottom: 0 }}>
                            <label>Password :</label>
                            <input type="password" value={userProfile.password || ''} name="password" onChange={(e) => handleInputChange(e)} />
                        </div>
                        <button type="button" className="UserProfile__container__box__form__btc" onClick={handleSetStatusPassword} onChange={(e) => handleInputChange(e)} style={activeEdit ? { display: 'block' } : { display: 'none' }}>Đổi mật khẩu</button>
                        <div className="UserProfile__container__box__form__button">
                            <div className="UserProfile__container__box__form__button__footer" style={activeEdit ? { opacity: 0, maxHeight: 0, visibility: "hidden" } : { opacity: 1, maxHeight: "none", visibility: "visible" }}>
                                <label className="UserProfile__container__box__form__button__footer__active-edit" onClick={handleEditActive} >Edit Profile</label>
                                <Link to="/cart/orderhistory" className="UserProfile__container__box__form__button__footer__order">List Order</Link>
                                <label className="UserProfile__container__box__form__button__footer__logout" onClick={handleLogout} >Logout</label>
                            </div>

                            <div className="UserProfile__container__box__form__button__edit" style={activeEdit ? { opacity: 1, maxHeight: "none", visibility: "visible" } : { opacity: 0, maxHeight: 0, visibility: "hidden" }}>
                                <button className="UserProfile__container__box__form__button__edit__sm">Edit</button>
                                <label onClick={handleEditActive} className="UserProfile__container__box__form__button__edit__close">Close</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;