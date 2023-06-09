const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const {notFound,errorHandler} = require('./middleware/errorHandler')

// ORM
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