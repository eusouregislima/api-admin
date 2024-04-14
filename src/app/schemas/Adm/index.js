const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema({
  adminId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  isAdminMaster: {
    type: Boolean,
    required: true,
    default: false,
  },
  password_hash: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Administrator = mongoose.model("Administrator", AdministratorSchema);

module.exports = Administrator;