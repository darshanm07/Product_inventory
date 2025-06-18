/*
 * Database connection file.
 */
const mongoose = require("mongoose");
const config = require("./config.js");

const dbConfigure = `${config.server.DB_USERNAME}${config.server.DB_PASSWORD}`;
// const dbConnection =
//   `${config.server.DB_CONNECTION}://${dbConfigure}${config.server.DB_HOST}${config.server.DB_PORT}/${config.server.DB_DATABASE}` +
//   (config.server.REPLICASET ? `?replicaset=${config.server.REPLICASET}` : "");

const dbConnection =
  "mongodb+srv://rohitmungalpara45:KeaSudL1H78FySyQ@inventory-system.9zg3p51.mongodb.net/";
mongoose.connect(dbConnection);


const db = mongoose.connection;

db.once("open", () => {
  logger.info("Connection Succeed 🙌");
});

db.on("error", () => {
  logger.error("Error in Connect Mongo");
});

module.exports = mongoose;
