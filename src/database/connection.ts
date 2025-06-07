import { Sequelize } from "sequelize-typescript";

import { appConfig } from "@/config";

import * as models from "./models";

export const database = new Sequelize({
  database: appConfig.DB_NAME,
  dialect: "mysql",
  username: appConfig.DB_USER,
  password: appConfig.DB_PASSWORD,
  host: appConfig.DB_HOSTNAME,
  models: Object.values(models),
  sync: {
    alter: true,
  },
});
