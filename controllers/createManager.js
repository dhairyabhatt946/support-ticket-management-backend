const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports =  async function createManager(req, res) {
    try {
            const {name, email, password} = req.body;

            if(!name || !email || !password) {
                res.status(400).json({message: "All fields required"});
            }

            const existingUser = await User.findOne({email});
            if(existingUser) {
                res.status(400).json({message: "User already exists"});
            }

            const newRole = new Role({
                name: 'MANAGER'
            });

            await newRole.save();

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role_id: newRole._id
            });

            await newUser.save();

            res.status(201).json({message: "User registered successfully"});
        } catch (error) {
            res.status(500).json({message: "server error", error: error.message});
        }
}