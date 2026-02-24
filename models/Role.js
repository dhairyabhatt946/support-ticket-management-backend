const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['MANAGER', 'SUPPORT', 'USER'],
        default: 'USER',
    }
});

module.exports = mongoose.model('Role', roleSchema);