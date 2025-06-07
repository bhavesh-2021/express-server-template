import dotenv from "dotenv";

dotenv.config();

export = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seed",
  },
};
