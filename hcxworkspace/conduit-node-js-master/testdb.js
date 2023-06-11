
const { Sequelize, Model, DataTypes } = require('sequelize');

// const sequelize = new Sequelize(
    
//     {
//         dialect: 'sqlite',
//         storage: 'app.db'
//       }

// );

const sequelize = new Sequelize('app','root','123456',{
    dialect: 'mysql',
    host:'localhost',
    logging: false
}); 


const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

const jane =  User.create({
    username: 'janedoe',
    birthday: new Date,
  }).catch(err=>console.log(err));
  
// const users =  User.findAll().then(data => console.log(data));

