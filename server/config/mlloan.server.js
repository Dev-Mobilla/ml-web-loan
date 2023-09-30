const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'mlloans',
    'devusr',
    'Mlinc1234!',
    {
        host: '10.4.9.186',
        dialect: 'mysql' // Adjust to your database type if necessary
    });

sequelize.sync().then(() => {
    console.log('Database is synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});






module.exports = sequelize;