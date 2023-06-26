import {
    FileOutlined, UserOutlined,
    DesktopOutlined, TeamOutlined, CloudTwoTone,
    SearchOutlined, BranchesOutlined, ToolOutlined
} from '@ant-design/icons';
import {Badge, Breadcrumb, Layout, Menu, theme, Avatar} from 'antd';
import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate, Link, useLocation} from 'react-router-dom'
import './index.css'
import logo from '../../images/logo.png'
import ProductDetail from "./ProductDetail";
import UserDetail from "./UserDetail";
import OrderDetail from "./OrderDetail";
import CategoryDetail from "./CategoryDetail";
import Test from "./Test";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const BackHomeRouter = (
    <Routes>
        <Route path="/*" element={<ProductDetail/>}/>
        <Route path="product/*" element={<ProductDetail/>}/>
        <Route path="category/*" element={<CategoryDetail/>}/>
        <Route path="user/*" element={<UserDetail/>}/>
        <Route path="order/*" element={<OrderDetail/>}/>
        <Route path="test/*" element={<Test/>}/>
    </Routes>
)

const items = [
    getItem('产品管理', 'sub1', <ToolOutlined />, [
        getItem('产品信息', '/backend/product', <SearchOutlined/>),
        getItem('品类信息', '/backend/category', <BranchesOutlined />),
        // getItem('测试页面', '/backend/test', <ToolOutlined/>),
    ]),
    getItem('用户管理', 'sub2', <DesktopOutlined/>, [
        getItem('用户信息', '/backend/user', <TeamOutlined/>),
        getItem('订单信息', '/backend/order', <FileOutlined/>),
    ]),
];

const BackendHome = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [pageTitle, setPageTitle] = useState(['产品管理','产品信息']);
    const navigate = useNavigate()
    const location = useLocation()
    const {token: {colorBgContainer},} = theme.useToken();

    useEffect(() => {
        // 获取地址栏的路径
        const pathname = location.pathname;
        // 根据路径设置导航标题
        let title = ['产品管理','产品信息'];
        switch (pathname) {
            case '/backend/product':
                title = ['产品管理','产品信息'];
                break;
            case '/backend/category':
                title = ['产品管理','品类信息'];
                break;
            case '/backend/test':
                title = ['产品管理','测试页面'];
                break;
            case '/backend/user':
                title = ['用户管理','用户信息'];
                break;
            case '/backend/order':
                title = ['用户管理','订单信息'];
                break;
            default:
                title = '未知页面';
                break;
        }
        setPageTitle(title);
    },[location.pathname])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed}
                   onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo-vertical">
                    <img src={logo} alt={'logo'}/>
                    <h1>后台管理系统</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['/backend/product']} defaultOpenKeys={['sub1']} mode="inline"
                      items={items} onClick={(menu) => navigate(menu.key)}/>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer, lineHeight: 0}} className={'back-header'}>
                    <div className={'back-header-box'}>
                        <p className={'back-header-user'}>
                            <span style={{marginRight: 10}}>欢迎您，黄天羽</span>
                            <Link><Badge count={5}>
                                <Avatar shape="square" icon={<UserOutlined/>}/>
                            </Badge></Link>
                        </p>
                        <i className={'back-header-divider'}/>
                        <p className={'back-header-weather'}>
                            <span style={{marginRight: 15}}>2023年6月20日</span>
                            <CloudTwoTone twoToneColor="#52c41a"/>
                            <span style={{marginLeft: 3}}>天气：大雨</span>
                        </p>
                    </div>
                </Header>
                <Content style={{margin: '0 16px', backgroundColor: '#F1F1F1'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>{pageTitle[0]}</Breadcrumb.Item>
                        <Breadcrumb.Item>{pageTitle[1]}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={'back-home-content'}>
                        {BackHomeRouter}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Software Engineering-金融管理系统
                </Footer>
            </Layout>
        </Layout>
    )
}
export default BackendHome