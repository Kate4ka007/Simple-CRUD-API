// import { users } from '../modules/data.js';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models.js';

export class Controller {
  users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
  async getUsers() {
    return new Promise((resolve, _) => resolve(this.users));
  }

  async getUser(id: string) {
    return new Promise((resolve, reject) => {
      try {
        const user = this.users.find((item) => item.id === id);
        if (user) {
          resolve(user);
        } else {
          reject(`User with id ${id} not found `);
        }

      } catch (error) {
        console.log(error);
      }

    });
  }

  /*   async createUser(user: User) { }
  
    async updateUser(id: string) { } */

  async removeUser(id: string) {
    return new Promise((resolve, reject) => {

      const currentItemIdx = this.users.findIndex(item => item.id === id);

      const removedData = { ...this.users[currentItemIdx] };
      this.users = [
        ...this.users.slice(0, currentItemIdx),
        ...this.users.slice(currentItemIdx + 1)
      ];

      if (!removedData) {
        reject(`No user with id ${id} found`);
      }

      resolve(`User deleted successfully`);
    });
  }

}
