import { Injectable } from '@angular/core';
import { ratingXSite } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { element } from '@angular/core/src/render3';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  @BlockUI() blockUI: NgBlockUI
  constructor(
    private dataStorage: DataStorageService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) { }



   //  FIREBASE
   getRating(): Observable<ratingXSite[]> {
    return this.angularFirestore.collection<ratingXSite>('rating').valueChanges();
  }

  getRatingById(id: string): Observable<ratingXSite[]> {
    return this.angularFirestore.collection<ratingXSite>('rating', ref => ref.where('id', '==', id)).valueChanges();
  }

  getRatingByUsuario(id: string): Observable<ratingXSite[]> {
    return this.angularFirestore.collection<ratingXSite>('rating', ref => ref.where('userId', '==', id)).valueChanges();
  }

  getRatingBySite(id: string) {
     return this.angularFirestore.collection<ratingXSite>('rating', ref => ref.where('siteId', '==', id)).valueChanges();
  }

  deleteRating(id: string) {
    this.blockUI.start("Guardando cambios");
    this.angularFirestore.collection<ratingXSite>('rating').doc(id).delete().then(() => {
      this.blockUI.stop();
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(() => {
      this.blockUI.stop();
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveRating(ratingXSite: ratingXSite) {
    if (ratingXSite.id) {
    this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<ratingXSite>('rating').doc(ratingXSite.id).update(ratingXSite).then(() => {
        this.alertas.successInfoAlert("Actualización exitosa");
      this.blockUI.stop();

      //  this.location.back();
      }).catch(() => {
      this.blockUI.stop();

        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
      //  this.location.back();
      });

    } else {
    this.blockUI.start("Guardando cambios");

      ratingXSite.id = this.angularFirestore.createId();
      this.angularFirestore.collection<ratingXSite>('rating').doc(ratingXSite.id).set(ratingXSite).then(() => {
      this.blockUI.stop();
        
        this.alertas.successInfoAlert("Inserción exitosa");
      //  this.location.back();
      }).catch(() => {
      this.blockUI.stop();

        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
      //  this.location.back();
      });
    }
  }
}
