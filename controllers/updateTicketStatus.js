const Role = require('../models/Role');
const Ticket = require('../models/Ticket');
const TicketStatusLog = require('../models/TicketStatusLog');

module.exports = async function updateTicketStatus(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name !== 'MANAGER' && userRole.name !== 'SUPPORT') {
            res.status(403).json({message: "Access denied"});
        }

        const ticketId = req.params.id;
        const isTicket = await Ticket.findById(ticketId);
        if(!isTicket) {
            res.status(404).json({message: "No ticket found"});
            return;
        }

        const {status} = req.body;

        const old_status = isTicket.status;

        await Ticket.findOneAndUpdate({_id: ticketId}, {$set: {status}});

        const isDoc = await TicketStatusLog.findOne({ticket_id: ticketId});

        if(isDoc) {
            await TicketStatusLog.findOneAndUpdate({ticket_id: ticketId}, {$set: {old_status, new_status: status, changed_by: req.user.id}});
        }
        else {
            const newDoc = new TicketStatusLog({
                ticket_id: ticketId,
                old_status,
                new_status: status,
                changed_by: req.user.id
            });
            newDoc.save();
        }

        res.status(200).json({message: "Status updated"});
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}