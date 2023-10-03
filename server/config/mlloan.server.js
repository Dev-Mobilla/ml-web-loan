const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'mlloans',
    'devusr',
    'Mlinc1234!',
    {
        host: '10.4.9.186',
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