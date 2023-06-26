import React, {useEffect, useState} from 'react';
import {Row, Col, Input, Select, Button, Tooltip, Card, Table, Tag, List} from 'antd';
import {SearchOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {queryAllUsers} from "../../actions/backendManageActions";

let users = [
    {
        key: '1',
        name: '黄天羽',
        age: 21,
        phone: '15850696030',
        credit: '差',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
            {b_number: '0987654321', b_type: '储蓄卡'},
        ],
    },
    {
        key: '2',
        name: '黄天羽',
        age: 20,
        phone: '15850696030',
        credit: '良好',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
            {b_number: '0987654321', b_type: '储蓄卡'},
        ],
    },
    {
        key: '3',
        name: '黄天羽',
        age: 18,
        phone: '15850696030',
        credit: '中等',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
            {b_number: '0987654321', b_type: '储蓄卡'},
        ],
    },
    {
        key: '4',
        name: '蓝天羽',
        age: 29,
        phone: '15850696030',
        credit: '中等',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
            {b_number: '0987654321', b_type: '储蓄卡'},
        ],
    },
    {
        key: '5',
        name: '绿天羽',
        age: 40,
        phone: '15850696030',
        credit: '良好',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
            {b_number: '0987654321', b_type: '储蓄卡'},
        ],
    },
    {
        key: '6',
        name: '黄天雨',
        age: 51,
        phone: '15850696030',
        credit: '中等',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
            {b_number: '0987654321', b_type: '储蓄卡'},
        ],
    },
    {
        key: '7',
        name: '黄天宇',
        age: 18,
        phone: '15850696030',
        credit: '差',
        bankCards: [
            {b_number: '1234567890', b_type: '信用卡'},
        ],
    },
];

const UserDetail = () => {
    const [searchName, setSearchName] = useState('');
    const [searchCredit, setSearchCredit] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [searchAge, setSearchAge] = useState('');
    const [userData, setUserData] = useState([])

    useEffect(() => {
        queryAllUsers().then(res => {
            users = res.data
            setUserData(res.data)
        })
    }, []);

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
        },
        {
            title: '银行卡号',
            dataIndex: 'bankCards',
            render: (bankCards) => {
                let spanVal = 18;
                if (bankCards.length === 2) {
                    spanVal = 9;
                } else if (bankCards.length === 3) {
                    spanVal = 6;
                }
                return (
                    <Row gutter={4}>
                        {bankCards.map((card) => (
                            <Col span={spanVal} key={card.b_number}>
                                <div className={`${card.b_type !== null ? 
                                    card.b_type === '储蓄卡'? 'blue-card':'green-card' : null}`}>
                                    <div>{card.b_type}</div>
                                    <div>{card.b_number}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                );
            },
        },
        {
            title: '信用情况',
            dataIndex: 'credit',
            render: (credit) => {
                let color;
                if (credit === '良好') {
                    color = 'success';
                } else if (credit === '中等') {
                    color = 'warning';
                } else if (credit === '差') {
                    color = 'error';
                }
                return <Tag color={color}>{credit}</Tag>;
            },
        },
    ];

    const handleDelete = () => {
        console.log(selectedRowKeys)
        console.log(users)
        const newUsers = users.filter((item) => !selectedRowKeys.includes(item.key));
        setUserData(newUsers);
        setSelectedRowKeys([]);
    };


    const handleSearch = () => {
        const filteredData = users.filter((item) => {
            let matchName = true;
            let matchCredit = true;
            let matchAge = true;

            if (searchName && !item.name.toLowerCase().startsWith(searchName.toLowerCase())) {
                matchName = false;
            }

            if (searchCredit && item.credit !== searchCredit) {
                matchCredit = false;
            }

            if (searchAge) {
                if (searchAge === "1" && item.age >= 18) {
                    matchAge = false;
                } else if (searchAge === "2" && (item.age < 18 || item.age > 40)) {
                    matchAge = false;
                } else if (searchAge === "3" && item.age <= 40) {
                    matchAge = false;
                }
            }

            return matchName && matchCredit && matchAge;
        });

        setUserData(filteredData);
    };

    const handleReset = () => {
        // 重置搜索条件
        setUserData(users)
        setSearchName("")
        setSearchAge("")
        setSearchCredit("")
    };

    const handleChangeName = (e) => {
        setSearchName(e.target.value);
    };

    const handleChangeCredit = (value) => {
        setSearchCredit(value);
    };

    const handleChangeAge = (value) => {
        setSearchAge(value);
    };

    return (
        <>
            <Row style={{height: 60, backgroundColor: '#F8F8F8', padding: '15px 0 0 15px'}}>
                <Col span={6}>
                    <Input
                        placeholder={'搜索用户'}
                        prefix={<SearchOutlined/>}
                        value={searchName}
                        onChange={handleChangeName}
                    />
                </Col>
                <Col span={4}>
                    <Select
                        style={{width: 220}}
                        onChange={handleChangeCredit}
                        value={searchCredit}
                        options={[
                            {value: '良好', label: '良好'},
                            {value: '中等', label: '中等'},
                            {value: '差', label: '差'},
                        ]}
                        placeholder={'信用状况'}
                    />
                </Col>
                <Col span={4}>
                    <Select
                        style={{width: 220}}
                        onChange={handleChangeAge}
                        value={searchAge}
                        options={[
                            {value: '1', label: '<18'},
                            {value: '2', label: '18~40'},
                            {value: '3', label: '>40'},
                        ]}
                        placeholder={'年龄'}
                    />
                </Col>
                <Col span={5}>
                    <Tooltip title="search">
                        <Button type="primary" icon={<SearchOutlined/>} style={{width: 100}} onClick={handleSearch}>
                            搜索
                        </Button>
                    </Tooltip>
                    <Link style={{marginLeft: 20, fontSize: 14}} onClick={() => handleReset()}>重置</Link>
                </Col>
            </Row>
            <Card
                title={
                    <>
                        <Button className={'card-header-button'} size={'large'} type={'primary'}
                                style={{backgroundColor: 'forestgreen'}}>
                            <PlusOutlined/>添加
                        </Button>
                        <Button className={'card-header-button'} size={'large'} type={'primary'} danger
                                onClick={handleDelete}>
                            <DeleteOutlined/>删除
                        </Button>
                    </>
                }
            >
                <div>
                    <Table
                        rowSelection={{
                            selectedRowKeys,
                            type: 'checkbox',
                            onChange: (selectedRowKeys) => {
                                setSelectedRowKeys(selectedRowKeys);
                            }
                        }}
                        columns={columns}
                        dataSource={userData}
                        pagination={{pageSize: 5}}
                    />
                </div>
            </Card>
        </>
    );
};

export default UserDetail