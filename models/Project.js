import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    projectCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    clientName: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    startDate: Date,

    endDate: Date,

    budget: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "NOT_STARTED",
        "IN_PROGRESS",
        "ON_HOLD",
        "COMPLETED",
      ],
      default: "NOT_STARTED",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);