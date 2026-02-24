const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async function loginController(req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {id: user._id, role_id: user.role_id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({message: "Login successful", token});
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}