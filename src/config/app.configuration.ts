


export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    db_host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT, 10) || 5432,
    db_database: process.env.DB_DATABASE,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    token_secret: process.env.TOKEN_SECRET
})