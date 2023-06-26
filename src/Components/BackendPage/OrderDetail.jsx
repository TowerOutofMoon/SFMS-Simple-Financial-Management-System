import {Button, Card, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {queryAllOrders, queryAllUsers} from "../../actions/backendManageActions";

const currentTime = new Date();
const year = currentTime.getFullYear();
const month = currentTime.getMonth() + 1;
const day = currentTime.getDate();

const columns = [
    {dataIndex: 'oId', key: 'oId', title: '订单编号',},
    {dataIndex: 'cName', key: 'cName', title: '订单用户'},
    {dataIndex: 'pName', key: 'pName', title: '购买产品'},
    {dataIndex: 'time', key: 'time', title: '交易时间'},
    {dataIndex: 'money', key: 'money', title: '交易金额'},
    {
        title: '操作', dataIndex: 'action', key: 'action', width: 200,
        render: (text, record) => (
            <Button className={'card-header-button'} type={'primary'}
                    style={{backgroundColor: 'darkorange', fontWeight: 700, width: 120}}>
                <SearchOutlined/><span>查看详情</span>
            </Button>)
    }]

const displayOrders = [
    {oId: 0, cName: '黄天羽1', pName: '产品1', time: `${year}-${month}-${day}`, money: 1000},
    {oId: 1, cName: '黄天羽2', pName: '产品2', time: `${year}-${month}-${day}`, money: 1200},
    {oId: 2, cName: '黄天羽3', pName: '产品3', time: `${year}-${month}-${day}`, money: 1300},
    {oId: 3, cName: '黄天羽4', pName: '产品4', time: `${year}-${month}-${day}`, money: 1500},
    {oId: 4, cName: '黄天羽5', pName: '产品5', time: `${year}-${month}-${day}`, money: 2000},
    {oId: 5, cName: '黄天羽6', pName: '产品6', time: `${year}-${month}-${day}`, money: 1100},
]

const OrderDetail = () => {

    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        queryAllOrders().then(res => {
            setOrderData(res.data)
        })
    }, []);

    return (
        <>
            <Card title={<h1 style={{color: '#097918', fontSize: 18}}>订单明细</h1>}
                  style={{width: '100%'}}>
                <Table
                    dataSource={orderData}
                    columns={columns}
                    pagination={{defaultPageSize: 4}}
                    bordered/>
            </Card>
        </>
    )
}
export default OrderDetail