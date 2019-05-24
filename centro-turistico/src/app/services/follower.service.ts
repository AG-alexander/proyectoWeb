import { Injectable } from '@angular/core';
import { followerModel, User } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(
    private dataStorage: DataStorageService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) { }

  // getFollowersBySite(idSite: number) {
  //   let followers: followerModel[] = this.dataStorage.getObjectValue(constant.FOLLOWERS);
  //   let users: User[] = this.dataStorage.getObjectValue(constant.USERS);
  //   followers.forEach((item) => {
  //     item.user = users.find(us => us.idUser == item.userId).userName;
  //     item.img = users.find(us => us.idUser == item.userId).iconno;
  //   });
  //   return followers.filter(item => item.siteId == idSite);
  // }

  // isFollower(idUser: number, idSite: number) {
  //   let followers: followerModel[] = this.dataStorage.getObjectValue(constant.FOLLOWERS);
  //   let index = followers.findIndex(item => item.siteId == idSite && item.userId == idUser);
  //   return index > -1;
  // }
  // addFollower(idUser: number, idSite: number) {
  //   if (!this.isFollower(idUser, idSite)) {
  //     let followers: followerModel[] = this.dataStorage.getObjectValue(constant.FOLLOWERS);
  //     let newFollower: followerModel;
  //     newFollower = {
  //       userId: idUser,
  //       siteId: idSite,
  //       id: "",
  //       img: "",
  //       user: ""
  //     }
  //     followers.push(newFollower);
  //     this.dataStorage.setObjectValue(constant.FOLLOWERS, followers);
  //   }
  // }
  // deleteFollower(idUser: number, idSite: number) {
  //   if (this.isFollower(idUser, idSite)) {
  //     let followers: followerModel[] = this.dataStorage.getObjectValue(constant.FOLLOWERS);
  //     let index = followers.findIndex(item => item.userId == idUser && item.siteId == idSite);
  //     followers.splice(index, 1);
  //     this.dataStorage.setObjectValue(constant.FOLLOWERS, followers);
  //   }
  // }

  //  FIREBASE
  getSeguidores(): Observable<followerModel[]> {
    return this.angularFirestore.collection<followerModel>('seguidores').valueChanges();
  }

  getSeguidoresById(id: string): Observable<followerModel[]> {
    return this.angularFirestore.collection<followerModel>('seguidores', ref => ref.where('id', '==', id)).valueChanges();
  }

  getSeguidoresBySite(id: string): Observable<followerModel[]> {
    return this.angularFirestore.collection<followerModel>('seguidores', ref => ref.where('siteId', '==', id)).valueChanges();
  }

  getSitiosByUsuario(id: string): Observable<followerModel[]> {
    return this.angularFirestore.collection<followerModel>('seguidores', ref => ref.where('userId', '==', id)).valueChanges();
  }

  deleteSeguidores(id: string) {
    this.angularFirestore.collection<followerModel>('seguidores').doc(id).delete().then(() => {
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(() => {
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveSeguidores(followerModel: followerModel) {
    if (followerModel.id) {
      this.angularFirestore.collection<followerModel>('seguidores').doc(followerModel.id).update(followerModel).then(() => {
        this.alertas.successInfoAlert("Actualización exitosa");
       // this.location.back();
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
       // this.location.back();
      });

    } else {
      followerModel.id = this.angularFirestore.createId();
      this.angularFirestore.collection<followerModel>('seguidores').doc(followerModel.id).set(followerModel).then(() => {
        this.alertas.successInfoAlert("Inserción exitosa");
      //  this.location.back();
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
      //  this.location.back();
      });
    }
  }
}
