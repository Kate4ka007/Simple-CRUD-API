import { v4 as uuidv4 } from 'uuid';
import { User } from './models.js';
import { users } from '../modules/data.js';

export class Controller {
  users: User[];

  private static instance: Controller;

  private constructor(users: User[]) { this.users = users; }

  public static getInstance(): Controller {
    if (!Controller.instance) {
      Controller.instance = new Controller(users);
    }
    return Controller.instance;
  }

  public getUsers() {
    return this.users;
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

  public removeUser(id: string) {
    const index = this.users.findIndex(item => item.id === id);
    const removeItem = { ...this.users[index] };
    this.users = [
      ...this.users.slice(0, index),
      ...this.users.slice(index + 1)
    ];
    return removeItem;
  }

}
