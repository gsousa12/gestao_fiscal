import mongoose from "mongoose";
import { CompanyType, TaxRegime } from "../utils/enum.ts";

const UserSchema = new mongoose.Schema({
  companyCode: {
    type: Number,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  adress: {
    type: {
      district: { type: String },
      street: { type: String },
      number: { type: Number },
      complement: { type: String },
      _id: false,
    },
    required: true,
    default: {},
  },
  companyType: {
    type: String || Number,
    enum: Object.values(CompanyType),
    required: true,
  },
  taxRegime: {
    type: String || Number,
    enum: Object.values(TaxRegime),
    required: true,
  },

  responsibleEmployee: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    dafault: [],
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
export default mongoose.model("Company", UserSchema);
