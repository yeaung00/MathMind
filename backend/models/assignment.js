const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  description: String,
  feedback: String,
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem'
    }
  ]
});

module.exports = mongoose.model('Assignment', assignmentSchema);