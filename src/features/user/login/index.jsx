import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import userApi from 'api/userApi';
import 'features/cart/payment';
import { Form, Input, message } from 'antd';
import './index.scss';
import { useDispatch } from 'react-redux';
import { getUserInfor } from 'features/cart/userslice';

Login.propTypes = {

};

function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const [user, setUser] = useState({
    //     email: '',
    //     password: ''
    // });
    // const handleChangeInput = e => {
    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value });
    // }
    // const handleLoginSubmit = async e => {
    //     e.preventDefault();
    //     try {
    //         const userdata = await userApi.LogIn({ ...user });
    //         localStorage.setItem('AccessToken', userdata.AccessToken);
    //         history.push('/');

    //     } catch (err) {
    //         alert(err.response.data.message);
    //     }
    // }


    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const onFinish = async (values) => {
        try {
            const userdata = await userApi.LogIn({ ...values });
            localStorage.setItem('AccessToken', userdata.AccessToken);
            await dispatch(getUserInfor());
            message.loading("Sign In...", 1).then(() => message.success("Đăng Nhập Thành Công!"))
            history.push('/');
        }
        catch (err) {
            message.error("Tài Khoản Hoặc Mật Khẩu Không Chính Xác!");
        }
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    };
    return (
        <div className="login-page">
            <div className="login-page__container" >
                <div className="login-page__container__location">
                    <ul className="login-page__container__location__list">
                        <li className="login-page__container__location__list__lc">
                            <Link to="/">
                                Trang Chủ
                                </Link>
                        </li>
                        <li className="login-page__container__location__list__lc">
                            <Link to="user/login">
                                Đăng Nhập
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <form onSubmit={handleLoginSubmit}>
                    <input name="email" type="email" placeholder="Email" value={user.email} required onChange={handleChangeInput} />
                    <input name="password" type="password" placeholder="Password" value={user.password} required onChange={handleChangeInput} autoComplete="on" />
                    <div className="login-page__row">
                        <button>Login</button>
                        <Link to='/user/register'>Register</Link>
                    </div>
                </form> */}
                <div className="login-page__container__box" >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        validateMessages={validateMessages}
                        onFinish={onFinish}
                    >
                        <div className="form-title">
                            Đăng Nhập
                        </div>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    required: true
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Email..." />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,

                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Password..." />
                        </Form.Item>

                        <div className="formdn-footer">
                            <button type="submit" className="formdn-footer__buttondn">
                                Đăng Nhập
                            </button>
                            <Link to="/user/register" className="formdn-footer__buttondk">
                                Đăng Ký
                        </Link>
                        </div>

                    </Form>
                </div>
            </div>
        </div >
    );
}

export default Login;