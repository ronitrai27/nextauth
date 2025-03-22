import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Provide User Name"],
    },
    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const user = mongoose.models.users || mongoose.model("users", userSchema);
export default user;
