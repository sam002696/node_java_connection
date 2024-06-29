const mongoose = require("mongoose");

const lightEngineeringSchema = mongoose.Schema({
  reportName: {
    type: String,
  },
  reportYear: {
    type: Number,
  },
  department: {
    type: String,
  },
  preface: {
    paragraphs: [
      {
        para: String,
      },
    ],
    date: {
      type: String,
    },
    author: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  listOfContents: [String],

  contentsSummary: [
    {
      contentTitle: {
        type: String,
      },
      paragraphs: [
        {
          para: {
            type: String,
          },
        },
      ],
    },
  ],
  conclusionsRecommendations: [
    {
      title: {
        type: String,
      },
      paragraphs: [
        {
          para: {
            type: String,
          },
        },
      ],
      sectorsSummary: [
        {
          sectorTitle: {
            type: String,
          },
          sectorParagraph: {
            type: String,
          },
          sectorLists: [
            {
              sectorTitle: {
                type: String,
              },
              sectorImage: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LightEngineering", lightEngineeringSchema);
