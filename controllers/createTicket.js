const Ticket = require("../models/Ticket");
const Role = require('../models/Role');

module.exports = async function createTicket(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name !== 'MANAGER' && userRole.name !== 'USER') {
            res.status(403).json({message: "Access denied"});
        }

        const {title, description, priority} = req.body;

        if(!title || !description || !priority) {
            res.status(400).json({message: "All fields required"});
        }

        const newTicket = new Ticket({
            title,
            description,
            priority,
            created_by: req.user.id
        });

        await newTicket.save();
        res.json(newTicket);
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}