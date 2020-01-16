//Contains/holds user endpoints for Find Users, Find Users by ID, Update User
import express from 'express';
//import { User } from '../models/user';
import { getAllUsers, getUserById } from '../services/user-service';
//import { authorization } from '../middleware/auth-middleware';


export const userRouter = express.Router();

//Find Users
async function controllerGetUsers(req, res) {
    try {
        const users = await getAllUsers(); //this function is in services
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

userRouter.get('', controllerGetUsers);
//userRouter.get('', [authorization(['finance-manager']), controllerGetUsers]);

 //Find Users By ID
 userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id; //from req.params, give me id
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const user = await getUserById(id);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});


// userRouter.post('', [authorization(['finance-manager', 'QC', 'trainee']),
// async (req, res) => {
//     const { body } = req; //destructuring
//     const newU = new User('', 0, 0, '', '', [], 1);
//     for (const key in newU) {
//         if (body[key] === undefined) {
//             res.status(400).send('Please include all user fields');
//             break;
//         } else {
//             newU[key] = body[key];
//         }
//     }
//     try {
//         const user = await saveOneUser(newU);
//         res.status(201).json(user);
//     } catch (e) {
//         res.status(e.status).send(e.message);
//     }
// }]);




 //Update User