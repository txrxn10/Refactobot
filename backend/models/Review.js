const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    filename: String,
    code: String,
    suggestions: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
