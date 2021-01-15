import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import userApi from 'api/userApi';
import 'features/cart/payment';
import { Form, Input, message } from 'antd';
import "./index.scss";

Register.propTypes = {

};

function Register(props) {
    const history = useHistory();
    // const [user, setUser] = useState({
    //     email: '',
    //     username: '',
    //     password: ''
    // });
    // const handleChangeInput = e => {
    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value });
    // }
    // const handleRegisterSubmit = async e => {
    //     e.preventDefault();
    //     try {
    //         const userdata = await userApi.Register({ ...user });
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
            const userdata = await userApi.Register({ ...values });
            localStorage.setItem('AccessToken', userdata.AccessToken);
            message.loading("Register...", 1).then(() => message.success("Đăng Ký Thành Công!"));
            history.push('/');
        }
        catch (err) {
            message.error(err.response.data.message);
        }
    };
    return (
        <div className="register-page">
            {/* <form onSubmit={handleRegisterSubmit}>
                <input name="email" type="email" placeholder="Email" value={user.email} required onChange={handleChangeInput} />
                <input name="username" type="text" placeholder="User Name" value={user.username} required onChange={handleChangeInput} />
                <input name="password" type="password" placeholder="Password" value={user.password} required onChange={handleChangeInput} autoComplete="on" />
                <div className="register-page__row">
                    <button>Register</button>
                    <Link to='/user/login'>Login</Link>
                </div>
            </form> */}
            <div className="register-page__container__location">
                <ul className="register-page__container__location__list">
                    <li className="register-page__container__location__list__lc">
                        <Link to="/">
                            Trang Chủ
                                </Link>
                    </li>
                    <li className="register-page__container__location__list__lc">
                        <Link to="user/register">
                            Đăng Ký
                            </Link>
                    </li>
                </ul>
            </div>
            <div className="register-page__container__box" >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <div className="form-title">
                        Đăng Ký
                        </div>
                    <Form.Item
                        label="Name"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Name is required!"
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Name..." />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "Email is not a valid email!"
                            },
                            {
                                required: true,
                                message: "Email is required!"
                            }
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
                                message: "Name is required!"
                            }, {
                                min: 6,
                                message: "Password too short!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Password..." />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password..." />
                    </Form.Item>

                    <div className="formdn-footer">
                        <button type="submit" className="formdn-footer__buttondn">
                            Đăng Ký
                            </button>
                        <Link to="/user/login" className="formdn-footer__buttondk">
                            Đăng Nhập
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;