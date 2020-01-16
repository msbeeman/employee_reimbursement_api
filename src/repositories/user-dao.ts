//File Purpose: Contains functions for interacting with the database
import { User } from '../models/user';
import { PoolClient } from 'pg'; //Node library for query's in postgres
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOConvertor } from '../util/UserDTO-to-user';

export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        //we use $number to represent a paramter to our sql query, then we provide those paramaters as values in an array
        //that array is the second param of the query function
        const result = await client.query('SELECT * FROM ers_project.users natural join ers_project.user_roles natural join ers_project.roles WHERE username = $1 and password = $2',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'Invalid Credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'Invalid Credentials') {
            throw {
                status: 400,
                message: 'Invalid Credentials'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}


export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        const result = await client.query('SELECT * FROM ers_project.users natural join ers_project.user_roles natural join ers_project.roles');
        return multiUserDTOConvertor(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}


export async function daoFindUserById(id: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM ers_project.users natural join ers_project.user_roles natural join ers_project.roles where user_id = $1', [id]);
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows);
        } else {
            throw 'No such user exists.';
        }

    } catch (e) {
        if (e === 'No such user exists.') {
            throw {
                status: 404,
                message: 'This user does not exist.'
            }; //this is an error
        } else {
            throw  {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }

}

// export async function daoSaveOneUser(u: User): Promise<User> {
//      let client: PoolClient;
//      client = await connectionPool.connect();
//      try {
//          await client.query('BEGIN'); //start a transaction
//          //the returning keyword can be used with insert, to return the values that actually got inserted
//          const result = await client.query('INSERT INTO garden_book.garden (username, "password", "name", prettiness) values ($1,$2,$3,$4) RETURNING garden_id',
//          [u.username, u.password, u.name, u.prettiness]);
//          for (const role of u.roles) {
//              let roleId = 0;
//              switch (role) {
//                  case 'Admin':
//                      roleId = 1;
//                      break;
//                  case 'Moderator':
//                      roleId = 2;
//                      break;
//                  default:
//                      roleId = 3;
//                      break;
//              }
//              await client.query('INSERT INTO garden_book.garden_roles VALUES($1,$2)',
//              [result.rows[0].garden_id, roleId ]);
//          }
//          u.userId = result.rows[0].garden_id;
//          await client.query('COMMIT');
//          return u;
//      } catch (e) {
//          await client.query('ROLLBACK');
//          throw {
//              status: 500,
//              message: 'Internal Server Error'
//          };
//      } finally {
//          client && client.release();
//      }
//  }

//*************************Come back later and finish ********************
// export async function daoUpdateUser(): Promise<User> {
//     let client: PoolClient;

// }
