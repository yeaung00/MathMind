const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  explanation: String,
  keywords: [{ type: String }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Problem', problemSchema);