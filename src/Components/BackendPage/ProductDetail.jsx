import {Card, Table, Input, Button, Form, Modal, Tag, InputNumber, Select} from 'antd'
import React, {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {
    addBankProducts,
    deleteBankProducts,
    queryAllBankProducts, setBankProductOnline,
    updateBankProducts
} from "../../actions/backendManageActions";

const {Option} = Select

const products = [
    {id: 1, name: '一号产品', rate: 0.1, time: 2, isSale: 1},
    {id: 2, name: '二号产品', rate: 0.13, time: 1, isSale: 1},
    {id: 3, name: '三号产品', rate: 0.1, time: 0.5, isSale: 1},
    {id: 4, name: '四号产品', rate: 0.2, time: 1, isSale: 1},
    {id: 5, name: '五号产品', rate: 0.3, time: 2, isSale: 1},
    {id: 6, name: '六号产品', rate: 0.15, time: 1, isSale: 0},
    {id: 7, name: '七号产品', rate: 0.05, time: 2, isSale: 0},
    {id: 8, name: '八号产品', rate: 0.1, time: 1, isSale: 1},
    {id: 9, name: '九号产品', rate: 0.19, time: 3, isSale: 0},
    {id: 10, name: '十号产品', rate: 0.21, time: 1, isSale: 1},
    {id: 11, name: '十一号产品', rate: 0.1, time: 2, isSale: 0},
    {id: 12, name: '十二号产品', rate: 0.03, time: 5, isSale: 1},
]

const tableList = [
    {name: 'name', label: '产品名称'},
    {name: 'rate', label: '利率'},
    {name: 'category', label: '产品类型'},
    {name: 'time', label: '期限'}
]

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber min={0} max={10}/> : <InputNumber/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item style={{margin: 0}} name={dataIndex} initialValue={record[dataIndex]}>
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const ProductDetail = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const [displayProducts, setDisplayProducts] = useState(products)

    const [addForm] = Form.useForm();
    const [addFormValues, setAddFormValues] = useState({});
    const [updateForm] = Form.useForm();

    useEffect(() => {
        queryAllBankProducts().then((res) => {
            console.log(res)
            const allBankProducts = res.data
            const transformProducts = allBankProducts.map(products => ({
                id: products.bp_id,
                name: products.bp_name,
                rate: products.bp_rate,
                time: products.bp_time,
                isSale: products.bp_online === '上线' ? 1 : 0
            }))
            setDisplayProducts(transformProducts)
        })
    }, []);

    const edit = (record) => {
        updateForm.setFieldsValue({
            id: '',
            name: '',
            rate: '',
            time: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        try {
            const row = await updateForm.validateFields();
            const updateProduct = {
                id: id,
                ...row
            }
            console.log(updateProduct)
            const newDisplay = [...displayProducts];
            const index = newDisplay.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newDisplay[index];
                newDisplay.splice(index, 1, {...item, ...row});
                setDisplayProducts(newDisplay);
                setEditingKey('');
                updateBankProducts(updateProduct)
            } else {
                newDisplay.push(row);
                setDisplayProducts(newDisplay);
                setEditingKey('');
                updateBankProducts(updateProduct)
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            dataIndex: 'id',
            key: 'id',
            title: '产品编号',
        },
        {
            dataIndex: 'name',
            key: 'name',
            title: '产品名称',
            editable: true,
        },
        {
            dataIndex: 'rate',
            key: 'rate',
            title: '利率',
            editable: true,
        },
        {
            dataIndex: 'time',
            key: 'time',
            title: '期限',
            editable: true,
        },
        {
            dataIndex: 'isSale',
            key: 'isSale',
            title: '上架状态',
            render: (isSale) => {
                return isSale ? <Tag color="success">已上架</Tag> : <Tag color="error">未上架</Tag>;
            },
        },
        {
            title: <span style={{textAlign: 'center'}}>操作</span>,
            dataIndex: 'action',
            key: 'action',
            width: 400,
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Button type="primary" onClick={() => save(record.id)} className={"card-header-button"}>
              保存
            </Button>
            <Button onClick={cancel} className={"card-header-button"}>取消</Button>
          </span>
                ) : (
                    <span>
            <Button type="primary" onClick={() => edit(record)} className={"card-header-button"}>
              修改
            </Button>
            <Button type="primary" danger onClick={() => deleteProduct(record)} className={"card-header-button"}>
              删除
            </Button>
                        {record.isSale ? (
                            <Button
                                style={{backgroundColor: '#eee', color: '#000'}}
                                onClick={() => underProduct(record)}
                                className={"card-header-button"}
                            >
                                下架
                            </Button>
                        ) : (
                            <Button
                                style={{backgroundColor: '#68de91'}}
                                onClick={() => upProduct(record)}
                                className={"card-header-button"}
                            >
                                上架
                            </Button>
                        )}
          </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'rate' || col.dataIndex === 'time' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const showAddModal = () => {
        setIsAddModalVisible(true)
    }

    const handleAddCancel = () => {
        setIsAddModalVisible(false)
    }

    const handleAddOk = () => {
        addForm
            .validateFields()
            .then((values) => {
                // 生成产品编号
                const maxId = displayProducts.reduce((max, item) => (item.id > max ? item.id : max), 0);
                const newProduct = {
                    id: maxId + 1,
                    isSale: 0,
                    name: values.name,
                    rate: values.rate,
                    time: values.time,
                    category: values.category
                }
                console.log(newProduct)
                addBankProducts(newProduct)
                // 更新数据
                setDisplayProducts([...displayProducts, newProduct]);

                // 关闭添加对话框
                setIsAddModalVisible(false);
            })
            .catch((error) => {
                console.log('表单校验失败', error);
            });
    }

    const underProduct = (record) => {
        const newDisplay = [...displayProducts];
        const index = newDisplay.findIndex((item) => record.id === item.id);
        if (index > -1) {
            newDisplay[index].isSale = 0;
            setDisplayProducts(newDisplay);
            setBankProductOnline({isSale: 0, id: record.id})

        }
    }

    const upProduct = (record) => {
        const newDisplay = [...displayProducts];
        console.log(newDisplay)
        console.log(record)
        const index = newDisplay.findIndex((item) => record.id === item.id);
        if (index > -1) {
            newDisplay[index].isSale = 1;
            console.log(newDisplay)
            setDisplayProducts(newDisplay);
            setBankProductOnline({isSale: 1, id: record.id})
        }
    }

    const deleteProduct = (record) => {
        console.log(record)
        const index = displayProducts.findIndex((item) => record.id === item.id);
        console.log(index)
        if (index > -1) {
            const newDisplay = [...displayProducts.slice(0, index), ...displayProducts.slice(index+1)]
            setDisplayProducts(newDisplay);
        }
        deleteBankProducts(record)
    }

    return (
        <>
            <Card title={<h1 style={{color: '#097918', fontSize: 18}}>产品信息</h1>}
                  extra={<Button type="primary" onClick={showAddModal}><PlusOutlined/>添加</Button>}
                  style={{width: '100%'}}>
                <Form form={updateForm} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={displayProducts.map((item, index) => ({...item, key: index}))}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{pageSize: 4}}
                    />
                </Form>
                <Modal title={<h3 style={{marginBottom: 25}}>添加商品</h3>} visible={isAddModalVisible}
                       onOk={handleAddOk} onCancel={handleAddCancel} centered={true}
                       afterClose={() => {
                           addForm.resetFields();
                           setAddFormValues({});
                       }}
                >
                    <Form labelCol={{span: 4}} form={addForm} initialValues={addFormValues}>
                        {tableList.map(({label, name}) => (
                            <Form.Item key={name} name={name} label={label}>
                                {name === 'category' ? (
                                    <Select>
                                        <Option value="理财产品">理财产品</Option>
                                        <Option value="保险">保险</Option>
                                        <Option value="基金">基金</Option>
                                    </Select>
                                ) : name === 'time' ? (
                                    <InputNumber min={1} max={10} />
                                ) : (
                                    <Input />
                                )}
                            </Form.Item>
                        ))}
                    </Form>
                </Modal>
            </Card>
        </>
    )
}
export default ProductDetail