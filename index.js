const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createManager = require('./controllers/createManager');
const loginController = require('./controllers/loginController');
const authMiddleware = require('./middlewares/authMiddleware');
const createUser = require('./controllers/createUser');
const getUsers = require('./controllers/getUsers');
const createTicket = require('./controllers/createTicket');
const getTickets = require('./controllers/getTickets');
const assignTicket = require('./controllers/assignTicket');
const updateTicketStatus = require('./controllers/updateTicketStatus');
const deleteTicket = require('./controllers/deleteTicket');
const addComments = require('./controllers/addComments');

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("DB connected successfully");

    // create manager
    app.post('/manager', createManager);

    // login
    app.post('/auth/login', loginController);

    // create user
    app.post('/users', authMiddleware, createUser);

    // get users
    app.get('/users', authMiddleware, getUsers);

    // create ticket
    app.post('/tickets', authMiddleware, createTicket);

    // get tickets
    app.get('/tickets', authMiddleware, getTickets);

    // assign ticket
    app.patch('/tickets/:id/assign', authMiddleware, assignTicket);

    // update status
    app.patch('/tickets/:id/status', authMiddleware, updateTicketStatus);

    // delete ticket
    app.delete('/tickets/:id', authMiddleware, deleteTicket);

    // add comments
    app.post('/tickets/:id/comments', authMiddleware, addComments);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});