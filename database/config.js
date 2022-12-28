const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar el proceso");
  }
};
module.exports = {
  dbConnection,
};