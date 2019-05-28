import { Injectable } from '@angular/core';
import user from '../../assets/data/users.json';
import { User } from '../interfaces/index';
import { DataStorageService } from '../services/data-storage.service';
import { constant } from '../constant-data/constant.js';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = user as User[];
  constructor(
    private dataStorage: DataStorageService,
    public angularFirestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    private alertas: AlertService,
    private location: Location) { }

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

  getUserById(id: string): Observable<User[]> {
    return this.angularFirestore.collection<User>('users', ref => ref.where('id', '==', id)).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.angularFirestore.collection<User>('users').valueChanges();
  }

  saveUser(user: User) {
    if (user.id) {
      this.angularFirestore.collection<User>('users').doc(user.id).update(user).then(() => {
        this.alertas.successInfoAlert("Actualización exitosa");
        this.location.back();
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });

    } else {
      user.id = this.angularFirestore.createId();
      this.angularFirestore.collection<User>('users').doc(user.id).set(user).then(() => {
        this.alertas.successInfoAlert("Inserción exitosa");
        this.location.back();
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
        this.location.back();
      });
    }
  }

}
