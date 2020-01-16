//File Purpose: Do internal processes on a request aka "Business Logic"; Both before and after getting data from database
import { User } from '../models/user';
import { daoGetUserByUsernameAndPassword, daoGetAllUsers, daoFindUserById } from '../repositories/user-dao';

//For logging in endpoint
export function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {

    return daoGetUserByUsernameAndPassword(username, password);
}

//For Find Users Endpoint
export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e; //Re-throw e so the error will not get lost in async callbacks
    }
}

//For Find Users by ID Enpoint
export function getUserById(id: number): Promise<User> {
    console.log('Service: you are seraching for user: ' + id);

    return daoFindUserById(id);
}



// export function saveOneUser(u: User): Promise<User> {
//     return daoSaveOneUser(u);
// }