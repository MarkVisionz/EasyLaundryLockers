const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  address: String,
  city: String,
  state: String,
  postalCode: String,
  phone: String, // Add phone number field
  // Other fields as needed
});


// Use passportLocalMongoose with the userSchema
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'username', // Specify the field to use as the username
  session: false, // Disable sessions as we'll use JWTs for authentication
});

// Add a method to compare passwords
userSchema.methods.isValidPassword = async function (password) {
  try {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', userSchema);
