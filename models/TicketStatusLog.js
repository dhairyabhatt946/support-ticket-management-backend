const mongoose = require('mongoose');

const tslSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        required: true,
    },
    old_status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
        required: true
    },
    new_status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
        required: true
    },
    changed_by: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Ticket_Status_Log', tslSchema);