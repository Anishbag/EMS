import mongoose from "mongoose";

const wfhSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    startDate: Date,

    endDate: Date,

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Expired"
      ],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("WFH", wfhSchema);