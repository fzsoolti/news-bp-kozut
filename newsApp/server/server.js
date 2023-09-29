const mongoose = require("mongoose");
const dotenv = require("dotenv");

// -------- LISTENER TO CAUGHT UNCAUGHT EXCEPTION --------
process.on('uncaughtException', err => {
  console.log('UNCAUGHT REJECTION! Server stopping');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

// -------- CONNECT/SET DB --------
const DB = process.env.NODE_ENV === "production" ? process.env.DATABASE_PROD : process.env.DATABASE_LOCAL;

mongoose.set("strictQuery", true);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful! URL: "+DB);
}).catch((err) => {
  console.error("DB connection error:", err);
});

// -------- START THE SERVER --------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running (${process.env.NODE_ENV}) on port ${PORT}..`);
});

// -------- LISTENER TO CAUGHT UNHADLED EXCEPTION --------
process.on('unhandledRejection', err => {
    console.log('UNHADLED REJECTION! Server stopping');
    console.log(err);
    server.close(()=>{
      process.exit(1);
    });
  });