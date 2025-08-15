const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`database is connected at server ${data.connection.host}`);
    })
    .catch((error) => console.log("error while connecting database", error));
};

module.exports = connectDatabase;
