const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch((e) => {
    console.log('Connection failed');
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;