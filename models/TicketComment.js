const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true});