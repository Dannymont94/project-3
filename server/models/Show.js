const mongoose = require('mongoose');
const { Schema } = mongoose;

const showSchema = new Schema({
  tvMazeId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String
  },
  image: {
    type: String
  },
  genres: {
    type: [String]
  },
  network: {
    type: String
  },
  status: {
    type: String
  },
  rating: {
    type: String
  }
});

module.exports = showSchema;