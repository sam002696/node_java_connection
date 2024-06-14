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

  // fireSafetyIssues: [
  //   {
  //     termTitle: {
  //       type: String,
  //       required: true,
  //     },
  //     termShortDesc: {
  //       type: String,
  //       required: true,
  //     },
  //     termRecommendation: [
  //       {
  //         recommendation: {
  //           type: String,
  //           required: true,
  //         },
  //         important: {
  //           type: String,
  //           required: true,
  //         },
  //       },
  //     ],
  //   },
  // ],

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
      normalRecommendation: {
        type: String,
        required: true,
      },
      seriousRecommendation: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);
