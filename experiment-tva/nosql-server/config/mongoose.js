"use strict";

const mongoose = require("mongoose");

const CONNECTION_STRING = "mongodb://127.0.0.1:27017";

module.exports.run = () => {
  mongoose.Promise = global.Promise;
  mongoose.connection.on("connected", () =>
    console.log("Mongoose connection is open.")
  );
  mongoose.connection.on("error", (err) =>
    console.error(`Mongoose connection error has occured: ${err}`)
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Mongoose connection is disconnected.")
  );

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to application termination."
      );
      process.exit(0);
    });
  });
  return mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
