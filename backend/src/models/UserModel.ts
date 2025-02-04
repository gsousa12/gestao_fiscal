import mongoose from "mongoose";
import { UserRoleEnum } from "../utils/enum.ts";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.EMPLOYEE,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },
  deletionDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("User", UserSchema);
