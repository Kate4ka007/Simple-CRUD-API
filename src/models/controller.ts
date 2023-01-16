import { v4 as uuidv4 } from 'uuid';
import { User } from './models.js';
import { users } from '../modules/data.js';

export class Controller {
  users: User[];

  private static instance: Controller;

  private constructor(users: User[]) {
    this.users = users;
  }

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

  async createUser(user: User) {
    return new Promise((resolve, _) => {
      const newUser = {
        id: uuidv4(),
        username: user.username,
        age: user.age,
        hobbies: user.hobbies,
      };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  async updateUser(id: string, changedUser: User) {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newUser = {
          id: id,
          username: changedUser.username,
          age: changedUser.age,
          hobbies: changedUser.hobbies,
        };
        this.users[index] = newUser;
        resolve(newUser);
      } else {
        reject(`User with id ${id} not found `);
      }
    });
  }

  async removeUser(id: string) {
    return new Promise((resolve, reject) => {
      try {
        const index = this.users.findIndex((item) => item.id === id);
        const removeItem = { ...this.users[index] };
        console.log(removeItem);
        this.users = [...this.users.slice(0, index), ...this.users.slice(index + 1)];

        if (index !== -1) {
          resolve(removeItem);
        } else {
          reject(`User with id ${id} not found `);
        }

      } catch (error) {
        console.log(error);
      }
    });
  }

}
