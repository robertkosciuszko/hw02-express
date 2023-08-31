const app = require("./app");
const mongoose = require("mongoose");
const {
  createFolderIfNotExist,
  uploadDir,
  imageStore,
} = require("./middleware/upload");
require("dotenv").config();
require("colors");

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("\nDatabase connection successful".green);
    app.listen(PORT, () => {
      createFolderIfNotExist(uploadDir);
      createFolderIfNotExist(imageStore);
      console.log(`Server running. Use our API on port: ${PORT}`.green);
    });
  })
  .catch((err) => {
    console.log("\nDatabase not running\n".red, err.toString());
    process.exit(1);
  });

function signalHandler() {
  mongoose.disconnect();
  console.log("\nDatabase disconnected\n".red);
  process.exit();
}
process.on("SIGINT", signalHandler);
