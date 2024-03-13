const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://127.0.0.1:27017/mgmt_project");

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;