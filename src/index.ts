import express from 'express';
import bodyparser from 'body-parser';
//import { loggingMiddleware } from './middleware/logging-middleware';
import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './services/user-service';
import { userRouter } from './routers/user-router';

const app = express(); //Creates an instance of express

app.use(bodyparser.json()); //Turns JSON string into a JS Object

app.use(sessionMiddleware); //Adds a session object to every req object. Access using req.session


////////////////////////////Available Endpoints////////////////////////////


app.use('/users', userRouter); //Registering the router with a base path of /users


//app.use('/reimbursements', ); //Registering the router with a base path of /reimbursements

//Registering the router with a base path of /Login
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('Please input a username and password.');
    }
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});


//Listen to port 1001
const PORT = 1001;
app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
});
