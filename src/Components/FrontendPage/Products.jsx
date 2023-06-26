import React, {useEffect, useState} from "react";
import {Card, Button, Menu, Row, Col, Divider} from "antd";
import {Link} from "react-router-dom";
import {queryAllFinanceProducts, queryAllFunds, queryAllInsurance} from "../../actions/frontendManageActions";

const products = [
    {
        name: "Product 1",
        price: 10000,
        rate: 5.1,
        time: 3,
        description: "Product 1 description",
        category: "finance_product",
    },
    {
        name: "Product 2",
        price: 10000,
        rate: 5.1,
        time: 3,
        description: "Product 2 description",
        category: "fund",
    },
    {
        name: "Product 3",
        price: 15000,
        rate: 1.1,
        time: 3,
        description: "Product 3 description",
        category: "insurance",
    },
    {
        name: "Product 3",
        price: 25000,
        rate: 1.1,
        time: 3,
        description: "Product 1 description",
        category: "insurance",
    },
    {
        name: "Product 4",
        price: 22000,
        rate: 3.1,
        time: 3,
        description: "Product 4 description",
        category: "insurance",
    },
    {
        name: "Product 5",
        price: 150000,
        rate: 2.1,
        time: 0.5,
        description: "Product 5 description",
        category: "insurance",
    },
];

const testProducts = [
    {
        f_name: "Product 7",
        f_type: "融资型",
        f_amount: 20000,
        f_rate: 6.0,
        f_risk: "中风险",
        f_time: 1,
        description: "Product 7 description",
        category: "fund",
    },
    {
        f_name: "Product 8",
        f_type: "融资型",
        f_amount: 20000,
        f_rate: 6.0,
        f_risk: "中风险",
        f_time: 1,
        description: "Product 8 description",
        category: "fund",
    },
    {
        fp_name: "Product 9",
        fp_amount: 10000,
        fp_rate: 5.1,
        fp_time: 3,
        description: "Product 9 description",
        category: "finance_product",
    },
    {
        fp_name: "Product 10",
        fp_amount: 10000,
        fp_rate: 5.1,
        fp_time: 3,
        description: "Product 10 description",
        category: "finance_product",
    },
    {
        fp_name: "Product 11",
        fp_amount: 10000,
        fp_rate: 5.1,
        fp_time: 3,
        description: "Product 11 description",
        category: "finance_product",
    },
]

const financeCard = (product) => {
    return (
        <>
            <h3>{product.fp_name}</h3>
            <p>理财金额：￥{product.fp_amount}</p>
            <p>产品利率：{product.fp_rate}%</p>
            <p>生效期限：{product.fp_time}年</p>
        </>
    )
}

const fundCard = (product) => {
    return (
        <>
            <h3>{product.f_name}</h3>
            <p>基金类型：{product.f_type}</p>
            <p>风险等级：{product.f_risk}</p>
            <p>基金金额：￥{product.f_amount}</p>
            <p>产品利率：{product.f_rate}%</p>
            <p>生效期限：{product.f_time}年</p>
        </>
    )
}

const insuranceCard = (product) => {
    return (
        <>
            <h3>{product.i_name}</h3>
            <p>保险项目：{product.i_project}</p>
            <p>保险金额：￥{product.i_amount}</p>
            <p>适用人群：{product.i_crowd}</p>
            <p>生效期限：{product.i_time}年</p>
        </>
    )
}

const Products = () => {
    const [cart, setCart] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("finance_product");
    const [productData, setProductData] = useState([])

    useEffect(() => {
        queryAllFinanceProducts().then(res => {
            setProductData(res.data)
        })
    }, [])

    const addToCart = (product) => {
        if (!cart.includes(product)) setCart([...cart, product]);
        console.log(cart)
    };

    const handleCategoryChange = (e) => {
        const menuKey = e.key
        setCurrentCategory(menuKey);
        switch (menuKey) {
            case 'finance_product':
                queryAllFinanceProducts().then(res => {
                    setProductData(res.data)
                })
                break;
            case 'fund':
                queryAllFunds().then(res => {
                    setProductData(res.data)
                })
                break;
            case 'insurance':
                queryAllInsurance().then(res => {
                    setProductData(res.data)
                })
                break;
        }
    };

    const calculateCardSize = () => {
        const numCards = productData.length;
        console.log(numCards)
        if (numCards === 1) {
            return {span: 24, pull: 0};
        } else if (numCards === 2) {
            return {span: 12, pull: 0};
        } else if (numCards >= 3) {
            return {span: 6, pull: 0};
        }
    };

    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            backgroundColor: "#050525", height: "120vh", width: '100%'
        }}>
            <Menu onClick={handleCategoryChange} selectedKeys={[currentCategory]}
                  mode="horizontal" style={{backgroundColor: "transparent", color: "#fff", fontWeight: 700}}>
                <Menu.Item key="finance_product">
                    <Link>理财产品</Link>
                </Menu.Item>
                <Menu.Item key="fund">
                    <Link>基金</Link>
                </Menu.Item>
                <Menu.Item key="insurance">
                    <Link>保险</Link>
                </Menu.Item>
            </Menu>
            <Divider style={{backgroundColor: "#fff", fontWeight: "bold"}}/>
            <h2 style={{margin: 15, color: '#e1e6ec'}}>产品列表</h2>
            <Row gutter={16}>
                {productData.map((product, index) => (
                    <Col key={index} {...calculateCardSize()}>
                        <Card style={{marginBottom: 16, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"}}>
                            {currentCategory === 'finance_product' && financeCard(product)}
                            {currentCategory === 'fund' && fundCard(product)}
                            {currentCategory === 'insurance' && insuranceCard(product)}
                            <div style={{height: 100, overflow: "auto"}}>
                                <p>产品描述：</p>
                                <p>{product.description}</p>
                            </div>
                            <Button onClick={() => addToCart(product)} style={{marginTop: 10}}>加入购物车</Button>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/*<Divider style={{backgroundColor: "#fff", fontWeight: "bold"}}/>*/}
            <Link to='/frontend/cart' state={products}>
                <Button type="primary">查看购物车</Button>
            </Link>
        </div>)
};

export default Products