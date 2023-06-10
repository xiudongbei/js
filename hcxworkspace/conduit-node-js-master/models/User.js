//  models\User.js
const {DataTypes} = require('sequelize')
const sequelize = require('../dbConnection')

const User = sequelize.define('User',{
    email:{ //用户邮箱(即账号)
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    username:{  //用户名称
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    best: { //用户最好成绩
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image: {    //用户头像
        type: DataTypes.TEXT,
        allowNull: true
    },
    password: { //用户密码
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})


module.exports = User