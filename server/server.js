const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('MySQL连接失败:', err);
        throw err;
    }
    console.log('MySQL连接成功');
});

// 创建一个简单的路由
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// 接口1：查询所有bank_product表的数据
app.get('/backend/product/queryAll', (req, res) => {
    const query = 'SELECT * FROM bank_product';
    db.query(query, (err, results) => {
        if (err) {
            console.error('查询失败:', err);
            res.status(500).json({ error: '查询失败' });
        } else {
            res.json(results);
        }
    });
});
//
// // 接口2：查询所有已上线的金融产品的相关属性
// app.get('/frontend/finance-product/queryAll', (req, res) => {
//     const query = 'SELECT bp.bp_rate, bp.bp_time, fp.fp_id, fp.fp_name, fp.fp_description, fp.fp_amount FROM bank_product bp JOIN financial_product fp ON bp.bp_id = fp.fp_id WHERE bp.bp_online = 1';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('查询失败:', err);
//             res.status(500).json({ error: '查询失败' });
//         } else {
//             res.json(results);
//         }
//     });
// });
//
// // 接口3：查询所有已上线的基金产品的相关属性
// app.get('/frontend/fund/queryAll', (req, res) => {
//     const query = 'SELECT bp.bp_rate, bp.bp_time, f.f_id, f.f_name, f.f_type, f.risk_level, f.f_manager, f.f_amount FROM bank_product bp JOIN fund f ON bp.bp_id = f.f_id WHERE bp.bp_online = 1';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('查询失败:', err);
//             res.status(500).json({ error: '查询失败' });
//         } else {
//             res.json(results);
//         }
//     });
// });
//
// // 接口4：查询所有已上线的保险产品的相关属性
// app.get('/frontend/insurance/queryAll', (req, res) => {
//     const query = 'SELECT bp.bp_rate, bp.bp_time, i.i_id, i.i_name, i.i_project, i.i_amount, i.i_crowd FROM bank_product bp JOIN insurance i ON bp.bp_id = i.i_id WHERE bp.bp_online = 1';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('查询失败:', err);
//             res.status(500).json({ error: '查询失败' });
//         } else {
//             res.json(results);
//         }
//     });
// });

// 接口5：添加产品
app.post('/backend/product/add', (req, res) => {
    //获取请求体中的数据
    const { id, name, rate, time, category } = req.body;

    // 插入到bank_product表
    db.query(
        'INSERT INTO bank_product (bp_id, bp_name, bp_rate, bp_time, bp_online) VALUES (?, ?, ?, ?, ?)',
        [id, name, rate, time, '下线'],
        (error, results) => {
            if (error) {
                console.error('Failed to insert into bank_product: ', error);
                res.status(500).json({ error: 'An error occurred while inserting data.' });
            } else {
                // 根据category的值插入特定表中
                switch (category) {
                    case '理财产品':
                        // 插入到finance_product表
                        db.query(
                            'INSERT INTO financial_product (fp_id, fp_name, fp_description, fp_amount) VALUES (?, ?, ?, ?)',
                            [id, name, '产品描述', 0],
                            (error, results) => {
                                if (error) {
                                    console.error('Failed to insert into finance_product: ', error);
                                    res.status(500).json({ error: 'An error occurred while inserting data.' });
                                } else {
                                    res.status(200).json({ success: 'Data inserted successfully.' });
                                }
                            }
                        );
                        break;
                    case '基金':
                        // 插入到fund表
                        db.query(
                            'INSERT INTO fund (f_id, f_name, f_type, risk_level, f_amount) VALUES (?, ?, ?, ?, ?)',
                            [id, name, '股票型', '中', 0], // 这里需要根据实际情况设置类型、风险等级和金额的默认值
                            (error, results) => {
                                if (error) {
                                    console.error('Failed to insert into fund: ', error);
                                    res.status(500).json({ error: 'An error occurred while inserting data.' });
                                } else {
                                    res.status(200).json({ success: 'Data inserted successfully.' });
                                }
                            }
                        );
                        break;
                    case '保险':
                        // 插入到insurance表
                        db.query(
                            'INSERT INTO insurance (i_id, i_name, i_project, i_amount, i_crowd) VALUES (?, ?, ?, ?, ?)',
                            [id, name, '车险', 0, '中年人'], // 这里需要根据实际情况设置项目和人群的默认值
                            (error, results) => {
                                if (error) {
                                    console.error('Failed to insert into insurance: ', error);
                                    res.status(500).json({ error: 'An error occurred while inserting data.' });
                                } else {
                                    res.status(200).json({ success: 'Data inserted successfully.' });
                                }
                            }
                        );
                        break;
                    default:
                        res.status(400).json({ error: 'Invalid category.' });
                }
            }
        }
    );
});

// 接口6：修改产品
app.post('/backend/product/update', (req, res) => {
    const {id, name, time, rate, isSale} = req.body
    const bpOnline = isSale === 0 ? '下架' : '上架';
    const query = `UPDATE bank_product SET bp_name = ?, bp_rate = ?, bp_online = ?, bp_time = ? WHERE bp_id = ?`;
    db.query(query, [name, rate, bpOnline, time, id], (err, results) => {
        if (err) {
            console.error('更新失败:', err);
            res.status(500).json({ error: '更新失败' });
            return;
        }
        console.log("Update success!")
        res.send("Update success!")
    });
});

// 接口7：删除产品
app.post('/backend/product/delete', (req, res) => {
    const {id} = req.body
    console.log(id)
    const query = `DELETE FROM bank_product WHERE bp_id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('删除失败:', err);
            res.status(500).json({ error: '删除失败' });
            return;
        }
        console.log("Delete success!")
        res.send("Delete success!")
    })
})

// 接口8：上下架产品
app.post('/backend/product/online', (req, res) => {
    const {id, isSale} = req.body
    console.log(id, isSale)
    const bpOline = isSale ? '上线' : '下线';
    const query = `UPDATE bank_product SET bp_online = ? WHERE bp_id = ?`;
    db.query(query, [bpOline, id], (err, results) => {
        if (err) {
            console.error('修改失败:', err);
            res.status(500).json({ error: '修改失败' });
            return;
        }
        console.log("Update success!")
        res.send("Update success!")
    })
})

// 接口9：查询用户信息和银行卡信息
app.get('/backend/user/query', (req, res) => {
    const query = `SELECT c.c_id AS id, c.c_name AS name, RIGHT(c.c_id_card, 2) AS age, c.c_phone AS phone,
      c.c_cred AS cred, b.b_number, b.b_type
        FROM client AS c LEFT JOIN bank_card AS b ON c.c_id = b.b_c_id`;

    db.query(query, (err, result) => {
        if (err) {
            console.error('查询数据出错:', err);
            res.sendStatus(500);
            return;
        }

        const formattedData = transformData(result);
        console.log(formattedData)
        res.send(formattedData);
    });
});

const transformData = (data) => {
    return data.reduce((acc, curr) => {
        const foundIndex = acc.findIndex((item) => item.key === curr.id);

        if (foundIndex !== -1) {
            acc[foundIndex].bankCards.push({
                b_number: curr.b_number,
                b_type: curr.b_type,
            });
        } else {
            acc.push({
                key: curr.id,
                name: curr.name,
                age: parseInt(curr.age),
                phone: curr.phone,
                credit: curr.cred,
                bankCards: [
                    {
                        b_number: curr.b_number,
                        b_type: curr.b_type,
                    },
                ],
            });
        }

        return acc;
    }, []);
};

// 接口10：查询所有订单
app.get('/backend/order/query', (req, res) => {
    const query = `
    SELECT o.o_id, o.o_c_id, o.o_bp_id, o.o_date, o.o_amount, c.c_name, bp.bp_name
    FROM orders o
    JOIN client c ON o.o_c_id = c.c_id
    JOIN bank_product bp ON o.o_bp_id = bp.bp_id
  `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const transformedResults = results.map((result) => {
                const orderDate = new Date(result.o_date);
                const formattedDate = orderDate.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                });
                return {
                    oId: result.o_id,
                    cName: result.c_name,
                    pName: result.bp_name,
                    time: formattedDate,
                    money: result.o_amount,
                };
            });

            res.json(transformedResults);
        }
    });
});

// 接口11、12、13：查询产品详细信息
app.get('/frontend/financial-product/queryAll', (req, res) => {
    const query = `
    SELECT fp.fp_id, fp.fp_name, fp.fp_description AS description, fp.fp_amount, bp.bp_rate AS fp_rate, bp.bp_time AS fp_time
    FROM financial_product fp
    JOIN bank_product bp ON fp.fp_id = bp.bp_id
    WHERE bp.bp_online = ?
  `;
    db.query(query, ["上线"], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.json(results);
        }
    });
});

app.get('/frontend/fund/queryAll', (req, res) => {
    const query = `
    SELECT f.f_id, f.f_name, f.f_type, f.f_amount, f.risk_level AS f_risk, bp.bp_rate AS f_rate, bp.bp_time AS f_time
    FROM fund f
    JOIN bank_product bp ON f.f_id = bp.bp_id
    WHERE bp.bp_online = ?
    `;

    db.query(query, ['上线'], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            const processedResults = results.map(result => ({
                ...result,
                description: result.f_name + " 描述",
                category: "fund"
            }))
            res.json(processedResults);
        }
    });
});

app.get('/frontend/insurance/queryAll', (req, res) => {
    const query = `
    SELECT i.i_id, i.i_name, i.i_project, i.i_amount, i.i_crowd, bp.bp_time AS i_time
    FROM insurance i
    JOIN bank_product bp ON i.i_id = bp.bp_id
    WHERE bp.bp_online = ?
    `;

    db.query(query, ['上线'], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            const processedResults = results.map(result => ({
                ...result,
                description: result.i_name + " 描述"
            }))
            res.json(processedResults);
        }
    });
});

// 启动服务器监听
app.listen(port, () => {
    console.log(`服务器已启动，监听端口：${port}`);
});