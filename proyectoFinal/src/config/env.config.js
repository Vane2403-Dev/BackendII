
export default {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/e-commerce',
  MONGO_ATLAS: process.env.MONGO_ATLAS ||  process.env.MONGO_URL,
  SESSION_SECRET: process.env.SESSION_SECRET || "secret",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  GMAIL_PASS: process.env.GMAIL_PASS || "secret"
}