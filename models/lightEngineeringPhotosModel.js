const mongoose = require("mongoose");

const lightEngineeringPhotosSchema = mongoose.Schema({
  leImages: [
    {
      url: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "LightEngineeringPhotos",
  lightEngineeringPhotosSchema
);
