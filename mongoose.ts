import mongoose from "mongoose";

mongoose.Promise = global.Promise;

(async function () {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/message",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error while attempting to connect to MongoDB");
    console.error(error);
  }
})();

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

export { mongoose };
