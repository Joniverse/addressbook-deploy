const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    fName: { type: String, required: true, minlength: 2 },
    lName: { type: String },
    phone: { type: String },
    email: { type: String },
    address1: String,
    address2: String,
    address3: String,
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
