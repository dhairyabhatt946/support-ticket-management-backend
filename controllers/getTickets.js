const Role = require('../models/Role');
const Ticket = require('../models/Ticket');

module.exports = async function getTickets(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name === 'MANAGER') {
            const tickets = await Ticket.find();
            res.json(tickets);   
        }
        else if(userRole.name === 'SUPPORT') {
            const tickets = await Ticket.find({assigned_to: {$ne: null, $exists: true}});
            res.json(tickets);
        }
        else {
            const tickets = await Ticket.find({assigned_to: {$eq: req.user.id}});
            res.json(tickets);
        }
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}