import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: [
        "WEBSITE",
        "FACEBOOK",
        "INSTAGRAM",
        "LINKEDIN",
        "GOOGLE",
        "REFERRAL",
        "OTHER",
      ],
      default: "WEBSITE",
    },

    stage: {
      type: String,
      enum: [
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "PROPOSAL_SENT",
        "NEGOTIATION",
        "WON",
        "LOST",
      ],
      default: "NEW",
    },

    expectedValue: {
      type: Number,
      default: 0,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    nextFollowUp: {
      type: Date,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead ||
mongoose.model("Lead", leadSchema);