import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if you use ObjectId for users
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
 
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
