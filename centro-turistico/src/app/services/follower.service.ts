import { Injectable } from '@angular/core';
import { followerModel, User } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private dataStorage: DataStorageService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) { }

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
    this.blockUI.start("Guardando cambiosSS...!!!");
    this.angularFirestore.collection<followerModel>('seguidores').doc(id).delete().then(() => {
      this.blockUI.stop()
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(() => {
      this.blockUI.stop()
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveSeguidores(followerModel: followerModel) {
    if (followerModel.id) {
    this.blockUI.start("Guardando cambios...!!!");

      this.angularFirestore.collection<followerModel>('seguidores').doc(followerModel.id).update(followerModel).then(() => {
        this.alertas.successInfoAlert("Actualización exitosa");
      this.blockUI.stop()       
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
      this.blockUI.stop()
      });

    } else {
      this.alertas.successInfoAlert("Actualización exitosa");
    this.blockUI.start("Guardando cambios...!!!");
      followerModel.id = this.angularFirestore.createId();
      this.angularFirestore.collection<followerModel>('seguidores').doc(followerModel.id).set(followerModel).then(() => {
       this.blockUI.stop()
        this.alertas.successInfoAlert("Inserción exitosa");
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
       this.blockUI.stop()
      });
    }
  }
}
