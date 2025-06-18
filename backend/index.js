const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db.js");

// Global Decalaration
global.logger = require("./api/helpers/utils/logger.js");

const catchAsync = require("./api/helpers/utils/catchAsync");
const utils = require("./api/helpers/utils/messages");
const { localize } = require("./api/helpers/utils/localizationService");
const validate = require("./api/policies/validate");
const config = require("./config/config");
const cors = require("cors");
const i18next = require("i18next");
const FilesystemBackend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const path = require("path");
const { seedCategories } = require("./api/services/categories.service.js");

global.catchAsync = catchAsync;
global.baseDir = __dirname;
global.utils = utils;
global._localize = localize;
global.validate = validate;
global._ = require("lodash");

// localization config
i18next
  .use(FilesystemBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    lng: "en",
    ns: ["auth", "common", "file"],
    defaultNS: ["auth", "common", "file"],
    backend: {
      loadPath: path.join(__dirname, `/locales/{{lng}}/{{ns}}.json`),
      addPath: path.join(__dirname, `/locales/{{lng}}/{{ns}}.json`),
    },
    detection: {
      order: ["header", "querystring", "cookie"],
      lookupHeader: "lng",
      caches: false,
    },
    fallbackLng: "en",
    preload: ["en", "id"],
  });

// CORS Configration
const corsOpts = {
  //need to add below wildcard ("*") to avoid CORS policy error
  "Access-Control-Allow-Origin": "*",
};

app.use(express.json());
app.use(cors(corsOpts));
app.use(i18nextMiddleware.handle(i18next));
app.use(logger.morganInstance);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (config.SEEDER === "true") {
  seedCategories();
}

app.use(require("./api/routes/index"));

app.listen(config.server.PORT, () => {
  logger.info(`Server started at ${config.server.PORT} ✅`);
});
