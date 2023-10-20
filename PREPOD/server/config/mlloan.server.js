require("dotenv").config();
const { Sequelize } = require('sequelize');

const DB_NAME = process.env.ML_LOAN_DB_NAME;
const DB_USER = process.env.ML_LOAN_DB_USER;
const DB_PASS = process.env.ML_LOAN_DB_PASS;
const DB_HOST = process.env.ML_LOAN_DB_HOST;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: 'mysql', // Adjust to your database type if necessary
        max: 10, // Increase the maximum number of connections
        min: 0, // Minimum number of connections in the pool
        acquire: 30000, // Maximum time to acquire a connection (in milliseconds)
        idle: 10000, // Maximum time a connection can be idle (in milliseconds)
    });

sequelize.sync().then(() => {
    console.log('Database is synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});






module.exports = sequelize;