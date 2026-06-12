import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    fromDate: Date,

    toDate: Date,

    reason: String,

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected"
      ],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Leave", leaveSchema);