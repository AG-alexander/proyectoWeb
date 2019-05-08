import { Injectable } from '@angular/core';
import user from '../../assets/data/users.json';
import { User } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant.js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[] = user;
  constructor(private dataStorage: DataStorageService) { }
  getUser(userName: string, password: string): boolean {
    this.users = this.dataStorage.getObjectValue(constant.USERS);
    if (this.users) {
      for (let user of this.users) {
        if (user.password === password && user.userName === userName) {
          this.dataStorage.setObjectValue(constant.USER, user);
          return true;
        }
      }
    }
    return false;
  }

  isLogged(): boolean {
    return this.dataStorage.getObjectValue(constant.USER)==null? false : true;
  }
}
