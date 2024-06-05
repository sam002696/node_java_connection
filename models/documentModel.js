const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },

  fireSafetyIssues: [
    {
      termTitle: {
        type: String,
        required: true,
      },
      termShortDesc: {
        type: String,
        required: true,
      },
      termRecommendation: [
        {
          Recommendation: {
            type: String,
            required: true,
          },
          isImportant: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);
