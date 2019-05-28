import { Injectable } from '@angular/core';
import user from '../../assets/data/users.json';
import { User } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant.js';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './alert.service.js';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @BlockUI() blockUI: NgBlockUI;
  users: User[] = user;
  currentUser: User;
  userSuscription: Subscription;
  
  constructor(
    private dataStorage: DataStorageService,
    private afAuth: AngularFireAuth, 
    private angularFirestore: AngularFirestore,
    private router: Router, 
    private alertas: AlertService,) { }
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

  async  loginWithFacebook() {
    this.blockUI.start("Validando datos, por favor espere!!!");
    await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((value)=> {
      this.userSuscription = this.getUsuarioByEmail(value.user.email).subscribe((usuarios) => {
        if (usuarios[0]) {
          this.blockUI.stop();
        this.currentUser = usuarios[0];
        this.dataStorage.setObjectValue(constant.USER, this.currentUser);
        this.router.navigateByUrl('dashboard');
        } else {
          this.blockUI.stop();
          let user: User = {
            email: value.user.email,
            iconno: {
              idFireBase: this.angularFirestore.createId(),
              url: value.user.photoURL,
              idStorage: null
            },
            id: this.angularFirestore.createId(),
            descripcion: "",
            rol: "basico",
            userName: value.user.displayName,
            idUser: 0,
            password: ""
          }
          this.saveUsuario(user);
          this.currentUser = user;
          this.dataStorage.setObjectValue(constant.USER, this.currentUser);
          this.router.navigateByUrl('dashboard');
        }
      },
      err => {this.blockUI.stop();},
      () => {
       
      });
    }).catch((error) => {
      this.alertas.errorAlert("contraseña o usuario invalido");
      this.blockUI.stop();
      console.log(error);
    });
    //this.router.navigate(['admin/list']);
  }

  async  loginWithGoogle() {
    this.blockUI.start("Validando datos, por favor espere!!!");
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((value)=> {
      this.userSuscription = this.getUsuarioByEmail(value.user.email).subscribe((usuarios) => {
        if (usuarios[0]) {
          this.blockUI.stop();
        this.currentUser = usuarios[0];
        this.dataStorage.setObjectValue(constant.USER, this.currentUser);
        this.router.navigateByUrl('dashboard');
        } else {
          this.blockUI.stop();
          let user: User = {
            email: value.user.email,
            iconno: {
              idFireBase: this.angularFirestore.createId(),
              url: value.user.photoURL,
              idStorage: null
            },
            id: this.angularFirestore.createId(),
            descripcion: "",
            rol: "basico",
            userName: value.user.displayName,
            idUser: 0,
            password: ""
          }
          this.saveUsuario(user);
          this.currentUser = user;
          this.dataStorage.setObjectValue(constant.USER, this.currentUser);
          this.router.navigateByUrl('dashboard');
        }
      },
      err => {this.blockUI.stop();},
      () => {
       
      });
    }).catch((error) => {
      this.blockUI.stop();
      console.log(error);
    });
    //this.router.navigate(['admin/list']);
  }

  login(email: string, password: string) {
    this.blockUI.start("Validando datos, por favor espere!!!");
    let aux = email;
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      this.blockUI.stop();
      this.setCurrentUser(value.user.email);
    }).catch((error) => {
      this.blockUI.stop();
      console.log(error);
      this.alertas.errorAlert("contraseña o usuario invalido");
    });
  }

  setCurrentUser(email: string) {
    this.blockUI.start("Validando datos, por favor espere!!!");
    this.userSuscription = this.getUsuarioByEmail(email).subscribe((usuarios) => {
      this.blockUI.stop();
      this.currentUser = usuarios[0];
      this.dataStorage.setObjectValue(constant.USER, this.currentUser);
      this.router.navigateByUrl('dashboard');
    },
    err => {this.blockUI.stop();},
    () => {
     
    });
  }
  getUsuarioByEmail(email: string): Observable<User[]> {
    return  this.angularFirestore.collection<User>('users', ref => ref.where('email', '==', email)).valueChanges();
 
  }

  recovery(email: string) {
    this.blockUI.start("Validando datos, por favor espere!!!");
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.alertas.successInfoAlert('Se ha enviado un correo para restaurar su cuenta Excelente'))
      .catch((error) => this.alertas.warningInfoAlert('Se ha presentado el siguiente error: ' + error + 'Atención'))
      this.blockUI.stop();
  }

  register(user: User, password: string) {
    
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, password).then((result) => {
      user.id = result.user.uid;
      this.saveUsuario(user);
      this.alertas.successInfoAlert('El usuario fue registrado correctamente, Bienvenido! Excelente');
      this.router.navigate(['login']);
      this.login(user.email, password);
    }).catch((error) => {
      this.alertas.warningInfoAlert('No se ha podido registrar el usuario por:' + error+ 'Registro de usuarios');

    });
  }

  saveUsuario(user: User) { 
    this.angularFirestore.collection<User>('users').add(user)
  }
}
