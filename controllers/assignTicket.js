const Role = require('../models/Role');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

module.exports = async function assignTicket(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name !== 'MANAGER' && userRole.name !== 'SUPPORT') {
            res.status(403).json({message: "Access denied"});
        }

        const {userId} = req.body;
        const ticketId = req.params.id;

        const isTicket = await Ticket.findById(ticketId);
        if(!isTicket) {
            res.status(404).json({message: "No ticket found"});
            return;
        }

        if(!userId) {
            res.status(400).json({message: "All fields required"});
            return;
        }

        const isUser = await User.findById(userId);
        if(!isUser) {
            res.status(400).json({message: "All fields required"});
            return;
        }

        const role = await Role.findById(isUser.role_id);
        if(role.name === 'USER') {
            res.status(403).json({message: "Cannot assign ticket to a user"});
            return;
        }

        const updatedTicket = await Ticket.findOneAndUpdate({_id: ticketId}, {$set: {assigned_to: userId}});
        res.status(200).json({message: "Assigned user successfully", updatedTicket});
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}