//User DTO is going to be the database version of the user model + role model

//this dto is going to be after the natural joins to get the roles
export class UserDTO {
    user_id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role_id: number;
    role_name: string;
}