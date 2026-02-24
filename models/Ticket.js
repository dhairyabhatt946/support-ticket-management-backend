const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, 'Title must be atleast 4 characters long']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Title must be atleast 4 characters long']
    },
    status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
        default: 'OPEN',
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM',
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);