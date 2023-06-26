import {ArrowDownOutlined, ArrowUpOutlined, PlusOutlined} from '@ant-design/icons';
import {Card, Table, Button} from 'antd'
import {useEffect, useState} from "react";

const cardTitleExtra = (<Button icon={<PlusOutlined/>} type={"primary"}>添加</Button>)
let classLayer

const productDirectory =
    {
        layer0: [{id: 100, category: '金融产品', parentId: [-1], inherentId: [1000, 1001, 1002]},
            {id: 101, category: '基金', parentId: [-1], inherentId: [1003]},
            {id: 102, category: '保险', parentId: [-1], inherentId: [1004]}],
        layer1: [{id: 1000, category: '高风险', parentId: [100], inherentId: [1]},
            {id: 1001, category: '中风险', parentId: [100], inherentId: [2]},
            {id: 1002, category: '低风险', parentId: [100], inherentId: [3, 4, 5, 8, 9, 11, 12]},
            {id: 1003, category: '债券型', parentId: [101], inherentId: [6, 10]},
            {id: 1004, category: '养老保险', parentId: [102], inherentId: [7]}],
        layer2: [{id: 1, name: '产品1', describe: '产品描述', parentId: [1000],},
            {id: 2, name: '产品2', describe: '产品描述', parentId: [1001],},
            {id: 3, name: '产品3', describe: '产品描述', parentId: [1002],},
            {id: 4, name: '产品4', describe: '产品描述', parentId: [1002],},
            {id: 5, name: '产品5', describe: '产品描述', parentId: [1002],},
            {id: 6, name: '产品6', describe: '产品描述', parentId: [1003],},
            {id: 7, name: '产品7', describe: '产品描述', parentId: [1002],},
            {id: 8, name: '产品8', describe: '产品描述', parentId: [1002],},
            {id: 9, name: '产品9', describe: '产品描述', parentId: [1002],},
            {id: 10, name: '产品10', describe: '产品描述', parentId: [1003],},
            {id: 11, name: '产品11', describe: '产品描述', parentId: [1002],},
            {id: 12, name: '产品12', describe: '产品描述', parentId: [1002],},

        ]
    }

const lastLayer = Object.entries(productDirectory).length - 1

const CategoryDetail = () => {
    const classColumn = [
        {title: '产品类别', dataIndex: 'category', key: 'category'},
        {title: '产品编号', dataIndex: 'id', key: 'id'},
        {
            title: '操作', dataIndex: '', key: 'action', width: 400,
            render: (_, record) => <>
                <Button type="link" onClick={() => checkSubClass(record)}><ArrowDownOutlined />查看子分类</Button>
                <Button type="link" onClick={() => checkUpClass(record)}><ArrowUpOutlined />返回上一级</Button>
            </>
        }
    ]

    const startColumn = [
        {title: '产品类别', dataIndex: 'category', key: 'category'},
        {title: '产品编号', dataIndex: 'id', key: 'id'},
        {
            title: '操作', dataIndex: '', key: 'action', width: 400,
            render: (_, record) => <>
                <Button type="link" onClick={() => checkSubClass(record)}><ArrowDownOutlined />查看子分类</Button>
            </>
        }
    ]

    const productColumn = [
        {title: '产品名称', dataIndex: 'name', key: 'name'},
        {title: '产品编号', dataIndex: 'id', key: 'id'},
        {title: '产品描述', dataIndex: 'describe', key: 'describe'},
        {
            title: '操作', dataIndex: '', key: 'action',
            render: (_, record) => <Button type="link" onClick={() => checkUpClass(record)}><ArrowUpOutlined />返回上一级</Button>
        }
    ]

    const [dataSource, setDataSource] = useState(productDirectory.layer0)
    const [columns, setColumns] = useState(startColumn)
    const [cardTitle, setCardTitle] = useState('第0级分类条目')

    useEffect(() => {
        // 挂载
        classLayer = 0
        // 卸载
        return () => {
            classLayer = 0
        }
    }, []);

    const checkSubClass = (record) => {
        console.log(record)
        classLayer = classLayer + 1
        // 获取子分类id
        const inherentId = record.inherentId;
        // 获取子分类目录
        const layer = `layer${classLayer}`;
        const layerProduct = productDirectory[layer];
        console.log("layer:", layerProduct)
        // 获取选定的子分类目录
        let displayProduct = []
        layerProduct.forEach((product) => {
            if (inherentId.includes(product.id)) {
                displayProduct.push(product);
            }
        });
        console.log("display:", displayProduct)
        // 排序
        displayProduct.sort((a, b) => a.id - b.id)
        // 更新选定的子分类目录
        setDataSource(displayProduct);

        if (classLayer < lastLayer) {
            // 分类条目
            setColumns(classColumn);
            setCardTitle(`第${classLayer}级分类条目`);
        } else {
            // 产品条目
            setColumns(productColumn);
            setCardTitle("产品信息");
        }
    }

    const checkUpClass = (record) => {
        console.log(record)
        classLayer = classLayer - 1
        // 获取父分类id
        const parentId = record.parentId;
        // 获取父分类目录
        const layer = `layer${classLayer}`;
        const layerProduct = productDirectory[layer];
        console.log("layer:", layerProduct)
        // 获取选定的父分类目录
        let displayProduct = [];
        layerProduct.forEach((product) => {
            if (parentId.includes(product.id)) {
                displayProduct.push(product);
            }
        });
        const pId = displayProduct[0].parentId[0]
        const selectId = displayProduct[0].id
        // 获取上一级所有的父分类目录
        layerProduct.forEach((product) => {
            if (product.parentId[0] === pId && product.id !== selectId) {
                displayProduct.push(product)
            }
        })
        console.log("display:", displayProduct)
        // 排序
        displayProduct.sort((a, b) => a.id - b.id)
        // 更新选定的子分类目录
        setDataSource(displayProduct);

        if (classLayer > 0) {
            // 分类条目
            setColumns(classColumn);
        } else {
            // 产品条目
            setColumns(startColumn);
        }
        setCardTitle(`第${classLayer}级分类条目`);
    }

    return (
        <Card
            title={<h3 style={{float: 'left', color: '#097918'}}>{cardTitle}</h3>}
            extra={cardTitleExtra}
        >
            <Table dataSource={dataSource} columns={columns} rowKey={"tableKey"} pagination={{
                pageSize: 4, defaultPageSize: 4, responsive: false}} style={{minHeight: 400}}
            />
        </Card>
    )

}
export default CategoryDetail;