import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    dueDate: Date,

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed"
      ],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Task", taskSchema);