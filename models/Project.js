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

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "PLANNING",
        "IN_PROGRESS",
        "ON_HOLD",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PLANNING",
    },

    priority: {
      type: String,
      enum: [
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT",
      ],
      default: "MEDIUM",
    },

    progress: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);