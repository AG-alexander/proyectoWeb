import { Injectable } from '@angular/core';
import user from '../../assets/data/users.json';
import { User } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant.js';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[] = user;
  currentUser: User;
  constructor(
    private dataStorage: DataStorageService,
    public afAuth: AngularFireAuth) { }
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
    return this.dataStorage.getObjectValue(constant.USER) == null ? false : true;
  }
  async  loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    //this.router.navigate(['admin/list']);
  }
  login(email: string, password: string) {
    let aux = email;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      console.log(value);
    }).catch((error) => {
      console.log(error);
    });
  }
}
