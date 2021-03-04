import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Form, Input, message, Select } from 'antd';
import 'antd/dist/antd.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrder, getListOrder } from '../orderslice';
import AddressData from '../../../data.json';
import TextArea from 'antd/lib/input/TextArea';

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
    const [form] = Form.useForm();

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');


    useEffect(() => {
        form.resetFields(['district']);
        form.resetFields(['commune']);
    }, [city]);
    useEffect(() => {
        form.resetFields(['commune']);
    }, [district]);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const onFinish = async (values) => {
        const { city, district, commune, incubation } = values;
        const address = `${incubation} - ${commune} - ${district} - ${city}`;
        try {
            await dispatch(addOrder({ "numberphone": values.numberphone, "cart": userprofile.cart, "address": address }))
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
    const onChangeCity = (City) => {
        setCity(City);
    };
    const onChangeDistrict = (District) => {
        setDistrict(District);
    }
    return (
        <div className="Payment">
            <div className="Payment__box">
                <Form
                    {...layout}
                    name="Payment"
                    fields={fields}
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <div className="Payment__box__title">
                        Thanh Toán
                    </div>
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
                        name="city"
                        label="Tỉnh/Thành phố"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your province/city !',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Tỉnh/Thành phố"
                            optionFilterProp="children"
                            onChange={onChangeCity}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                AddressData.map((city, index) => (
                                    <Select.Option value={city.name} key={index}>{city.name}</Select.Option>
                                ))
                            }
                        </Select >
                    </Form.Item>

                    <Form.Item
                        name="district"
                        label="Quận/Huyện"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your district !',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Quận/Huyện"
                            optionFilterProp="children"
                            onChange={onChangeDistrict}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                AddressData.map((itemCity) => itemCity.name === city && (
                                    itemCity.huyen.map((huyen, index) => (
                                        <Select.Option value={huyen.name} key={index}>{huyen.name}</Select.Option>
                                    ))
                                ))
                            }
                        </Select >
                    </Form.Item>
                    <Form.Item
                        name="commune"
                        label="Xã/Thị Trấn"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your commune !',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Xã/Thị Trấn"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                AddressData.map(itemCity => itemCity.name === city && (
                                    itemCity.huyen.map(huyen => huyen.name === district && (
                                        huyen.xa.sort().map((xa, index) => (
                                            <Select.Option value={xa.name} key={index}>{xa.name}</Select.Option>
                                        ))
                                    ))
                                ))
                            }
                        </Select >
                    </Form.Item>

                    <Form.Item
                        name="incubation"
                        label="Số Nhà"
                        rules={[
                            {
                                required: true,
                                message: 'Address is require !',
                            }
                        ]}
                    >
                        <TextArea
                            placeholder="địa chỉ cụ thể: ấp, số nhà, tên đường..."
                            rows={2}
                        />
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