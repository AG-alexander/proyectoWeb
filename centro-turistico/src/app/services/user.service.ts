import { Injectable } from '@angular/core';
import user from '../../assets/data/users.json';
import { User } from '../interfaces/index';
import { DataStorageService } from '../services/data-storage.service';
import { constant } from '../constant-data/constant.js';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = user as User[];
  constructor(
    private dataStorage: DataStorageService,
    public afAuth: AngularFireAuth) { }

  getUser(): User {
    return this.dataStorage.getObjectValue(constant.USER);
  }

  getEditor(): User[] {
    return this.dataStorage.getObjectValue(constant.USERS);
  }

  addUser(user: User) {
    let users = this.dataStorage.getObjectValue(constant.USERS) as User[];
    user.idUser = +this.dataStorage.getObjectValue(constant.IDUSER);
    users.push(user);
    this.dataStorage.setObjectValue(constant.IDUSER, user.idUser+1);
    this.dataStorage.setObjectValue(constant.USERS, users);
  }

}
