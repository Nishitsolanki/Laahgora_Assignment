
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  path: String,
  status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
