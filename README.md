# 项目介绍
本项目代码作为hhu-cs-se课设内容，构建了一个简易的金融管理系统。

我们的金融管理系统分为前台用户系统和后台管理系统，前台用户系统包括产品搜索、订单查询和产品购买三大功能；后台管理系统则主要完成产品与用户的管理功能，和对所有用户订单的查看功能。

除了订单和购物车功能外，所有的功能都已与后台连接，数据库字段包括：

client(`c_id`, c_name, c_id_card, c_phone, c_mail, c_cred, c_password)

bank_product(`bp_id`, `bp_name`, bp_online, bp_rate, bp_time)

fund(`f_id`, `f_name`, f_type, risk_level, f_manager, f_amount)

insurance(`i_id`, `i_name`, i_project, i_amount, i_year, i_crowd)

financial_product(`fp_id`, `fp_name`, fp_description, fp_amount, fp_year)

orders(`o_id, o_c_id, o_bp_id`)

property(`pro_id`, `pro_name`, pro_purchase_time, pro_stus, pro_quality, pro_income)

bank_card(`b_number`, `b_c_id`, b_type)

deposit_card(`d_number`, d_amount, d_rate)

credit_card(`cred_number`, cred_amount, cred_limit, cred_rate)
> 注：灰色字段代表了一些完整性约束如主键、外键，可以从语义分析中得出，一些数值类型字段都附有CHECK触发器。

![](../逻辑结构图.png)

由于时间限制，本项目还有许多可以完善的地方，可以后续自行补充。

# 文件目录结构

.idea为IDE自动创建的系统文件夹，lib、node_modules都是引入的依赖库，public包含了源网页，所有的组件都在源网页id为root的网页下面，server是我们的后台服务器，src中定义了前后台的各种组件和路由。

src目录是各个组件的路径，从上到下，actions文件夹定义了前后台的交互请求操作，Components文件夹内是不同的前后台组件与路由，比如BackHome是后台的首页，FrontHome是前台的首页，而BackendRoutes和FrontendRoutes则分别是后台和前台的路由。

# 开发环境
### 前端环境：

交互逻辑与数据处理主要使用Facebook的 **React** 框架进行编写。

在页面的跳转与层级关系的设计使用了 **React-router**。

页面的设计与构造基于阿里巴巴提供的 **Ant-Design** 组件库。

前后端交互使用了基于Promise的 **Axios** 库。

### 后端环境：

使用 **express** 框架搭建后台服务器，采用 **mysql** 作为数据库服务软件获取数据库服务，并通过 **mysql-connector-java** 与服务器进行连接。

前后端交互方面采用 **body-parser** 库解析请求头、响应头内容。

使用 **http-proxy-middleware** 实现不同端口间的请求转发，整个项目运行于 **node.js** 和 **sdk** 运行环境下。

推荐使用 **IDEA** 作为IDE进行环境配置与代码书写。

# 运行命令

`npm start`：启动前端react项目。端口号为3000。

`node server.js`：启动后端服务器。监听端口号为5000。