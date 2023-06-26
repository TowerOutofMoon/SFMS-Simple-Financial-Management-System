import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {List, Card, Button, Tag} from "antd";
import {ArrowLeftOutlined, MoneyCollectTwoTone, ShoppingCartOutlined} from "@ant-design/icons";

const Cart = () => {
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state);

    const handleRemove = (item) => {
        console.log(item)
        console.log(cartItems)
        const updatedCart = cartItems.filter((product) => product.name !== item.name);
        setCartItems(updatedCart);
    };

    const handlePurchase = (item) => {
        const updatedCart = cartItems.map((product) => {
            if (product.name === item.name) {
                return { ...product, purchased: true };
            }
            return product;
        });
        setCartItems(updatedCart);
    };

    return (
        <div style={{width: '100%', height: '100%', backgroundColor: '#eee', padding: 50}}>
            <Link to={'/frontend/product'} style={{margin: 10, fontWeight: 700}}><ArrowLeftOutlined/>返回</Link>
            <h2 style={{margin: 20}}><ShoppingCartOutlined/> 购物车</h2>
            <List
                grid={{column: 1, gutter: 8}}
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.name}
                              style={{marginTop: 16, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", fontSize: 16}}
                              extra={item.purchased && (<Tag color="green" style={{ marginTop: '10px' }}>已购买</Tag>)}
                        >
                            <p>价格：<MoneyCollectTwoTone/>{item.price}</p>
                            <p>利率：{item.rate}%</p>
                            <p>生效时间： {item.time}年</p>
                            <div style={{height: 100, overflow: "auto"}}>
                                <p>产品描述：</p>
                                <p style={{color: '#bbb'}}>{item.description}</p>
                                <Tag closable color={'#87d068'}>安全</Tag>
                                <Tag closable color={'#f50'}>稳定</Tag>
                                <Tag closable color={'#cd201f'}>放心</Tag>
                            </div>
                            <Button style={{backgroundColor: '#68de91', float: 'right'}}
                                    className={"card-header-button"} onClick={() => handlePurchase(item)}>购买
                            </Button>
                            <Button type="primary" className={"card-header-button"}
                                    style={{backgroundColor: '#963e3e', float: 'right'}}
                                    onClick={() => handleRemove(item)}
                            >
                                删除
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Cart;