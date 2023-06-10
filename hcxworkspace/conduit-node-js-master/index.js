const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const {notFound,errorHandler} = require('./middleware/errorHandler')

// ORM:Object-Relational Mapping
// (将关系型数据库和面向对象编程语言之间建立映射关系的技术
//  它使得开发人员可以像操作对象一样操作数据库
//  不需要编写 SQL 查询语句
//  同时也能避免直接操作数据带来的潜在问题)
const sequelize = require('./dbConnection')

// 模型定义
const User = require('./models/User')

// 路由设置
const userRoute = require('./routes/users')

const app = express()

//CORS
app.use(cors({credentials: true, origin: true})) 

//RELATIONS: 模型间关系定义
const sync = async () => await sequelize.sync({alter:true})
sync()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/',(req,res) => {
    res.json({status:"API is running"});
})

// 路由: 用户处理
app.use('/api',userRoute)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000 

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:3000`);
})