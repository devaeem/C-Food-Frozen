import * as mongoose from "mongoose";


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MOMGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const closeDatabaseConnection = () => {
  mongoose.connection.close();
};

export { connectToDatabase, closeDatabaseConnection };