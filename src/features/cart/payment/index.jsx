import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Form, Input, message, Select } from 'antd';
import 'antd/dist/antd.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrder, getListOrder } from '../orderslice';

Payment.propTypes = {
    userprofile: PropTypes.object,
};

Payment.defaultProp = {
    userprofile: {}
}

function Payment(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userprofile } = props;
    console.log(userprofile);

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
            await dispatch(addOrder({ "numberphone": values.numberphone, "cart": userprofile.cart, "address": values.address }))
            await dispatch(getListOrder());
            message.loading("Payment...", 1).then(() => message.success("Đặt Hàng Thành Công!"))
            history.push('/cart/orderhistory');
        }
        catch (err) {
            message.error("Đặt Hàng Thất Bại!");
        }
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Select.Option value="94">+94</Select.Option>
                <Select.Option value="95">+95</Select.Option>
            </Select>
        </Form.Item>
    );
    const [fields, setFields] = useState([
        {
            name: ['username'],
            value: userprofile.username || '',
        },
        {
            name: ['email'],
            value: userprofile.email || '',
        },
        {
            name: ['prefix'],
            value: '94',
        },
    ]);
    return (
        <div className="Payment">
            <div className="Payment__box">
                <Form
                    {...layout}
                    name="Payment"
                    fields={fields}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <div className="Payment__box__title">
                        Thanh Toán
                    </div>
                    <Form.Item
                        label="Name"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Username is required!"
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
                        label="Number Phone"
                        name="numberphone"
                        rules={[
                            {
                                required: true,
                                message: "Number Phone is required!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                            placeholder="Number Phone..." />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Address is required!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="Address..." />
                    </Form.Item>
                    <div className="Payment__box__footer">
                        <button type="submit" className="Payment__box__footer__order">
                            Thanh Toán
                            </button>
                        <label htmlFor="paypal" className="Payment__box__footer__close">
                            Trở Về
                        </label>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Payment;