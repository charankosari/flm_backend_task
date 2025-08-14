const app = require("./app");
const { config } = require("dotenv");
const connectDatabase = require("./config/database");
config({ path: "config/.env" });

process.on("uncaughtException", (err) => {
  console.log("Error", err.message);
  process.exit(1);
});

connectDatabase();
const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`app is running at port ${PORT}`)
);
process.on("unhandledRejection", (err) => {
  console.log("Error", err.message);
  server.close(() => {
    process.exit(1);
  });
});
