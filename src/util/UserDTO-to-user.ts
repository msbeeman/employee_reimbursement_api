import { UserDTO } from '../dtos/user-dto';
import { User } from '../models/user';

//Function will take in an array of userDTOs, loop through it and grab all roles names, then build a new user object
//and pass in all values (including the role array that was built)
export function userDTOtoUser(uD: UserDTO[]): User {
    const roles = {
        roleId: uD[0].role_id,
        role: uD[0].role_name
    };
    return new User(
        uD[0].user_id,
        uD[0].username,
        uD[0].password,
        uD[0].firstName,
        uD[0].lastName,
        uD[0].email,
        roles);
}

//This function takes in multiple user DTOs, some with the same id
//Adds all DTOs with the same ID to a temp array
//then converts that array into a single user object from 1-3 userDTO objects
//this function can be used with any set of userDTOS to turn them into Users
export function multiUserDTOConvertor(uD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uD) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].user_id === u.user_id) {
            currentUser.push(u);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}
