const User = require("../models/User");
const Role = require('../models/Role');

module.exports = async function getUsers(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name !== 'MANAGER') {
            res.status(403).json({message: "Access denied"});
        }

        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}