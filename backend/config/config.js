module.exports = {
  server: {
    PORT: process.env.PORT || 9876,
    DB_CONNECTION: process.env.DB_CONNECTION || "mongodb",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT:
      process.env.DB_PORT === ""
        ? process.env.DB_PORT
        : process.env.DB_PORT
        ? `:${process.env.DB_PORT}`
        : ":27017",
    DB_DATABASE: process.env.DB_DATABASE || ``,
    DB_USERNAME: process.env.DB_PASSWORD ? `${process.env.DB_USERNAME}:` : "",
    DB_PASSWORD: process.env.DB_PASSWORD ? `${process.env.DB_PASSWORD}@` : "",
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "",
  },
  AWS_CONFIG: {
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "",
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "",
    AWS_API_VERSION: process.env.AWS_API_VERSION || "",
    REGION: process.env.REGION || "us-east-1",
    AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN || "",
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY || "",
    S3_SECRET_KEY: process.env.S3_SECRET_KEY || "",
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "",
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || "127.0.0.1",
    PORT: process.env.REDIS_PORT || 6379,
    PASSWORD_FOR_BULL: process.env.REDIS_PASSWORD ?? "",
    PASSWORD:
      process.env.REDIS_PASSWORD == ""
        ? process.env.REDIS_PASSWORD
        : process.env.REDIS_PASSWORD
        ? `:${process.env.REDIS_PASSWORD}@`
        : "",
    USER: process.env.REDIS_USER ?? "",
  },
  SEED: process.env.SEED ?? "true",
  DEFAULT_LNG: process.env.LNG || "en",
  ARRAY_LIMIT: process.env.ARRAY_LIMIT ?? 10,

  // Front Domain Url
  FRONT_URL: process.env.FRONT_URL,

  // SEEDER
  SEEDER: process.env.SEEDER,
};
