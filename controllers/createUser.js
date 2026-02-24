const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = async function createUser(req, res) {
    try {
        const role_id = req.user.role_id;
        const userRole = await Role.findById(role_id);
        if(userRole.name !== 'MANAGER') {
            res.status(403).json({message: "Access denied"});
        }

        const {name, email, password, role} = req.body;

        if(!name || !email || !password || !role) {
            res.status(400).json({message: "All fields required"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            res.status(400).json({message: "User already exists"});
            return;
        }

        const newRole = new Role({
            name: role
        });
        newRole.save();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role_id: newRole._id
        });

        newUser.save();

        res.status(201).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}