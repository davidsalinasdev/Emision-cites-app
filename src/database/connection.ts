import { Sequelize } from 'sequelize';


const db = new Sequelize('node', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
    // logging: false,
});

export default db;
