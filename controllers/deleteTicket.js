const Ticket = require("../models/Ticket");
const Role = require('../models/Role');

module.exports = async function deleteTicket(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name !== 'MANAGER') {
            res.status(403).json({message: "Access denied"});
        }

        await Ticket.findByIdAndDelete(req.params.id);

        res.status(200).json({message: "Ticket deleted"});
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}