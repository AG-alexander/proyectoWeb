import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { Review, User } from '../interfaces/index';
import { UserService } from './user.service';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  @BlockUI() blockUI: NgBlockUI

  constructor(
    private dataStorage: DataStorageService,
    private userService: UserService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) {
   }


  //  FIREBASE
  getReview(): Observable<Review[]> {
    return this.angularFirestore.collection<Review>('review').valueChanges();
  }

  getReviewById(id: string): Observable<Review[]> {
    return this.angularFirestore.collection<Review>('review', ref => ref.where('id', '==', id)).valueChanges();
  }

  getReviewBySite(id: string) {
    return this.angularFirestore.collection<Review>('review', ref => ref.where('idSitio', '==', id)).valueChanges();
  }

  deleteReview(id: string) {
    this.blockUI.start("Guardando cambios");

    this.angularFirestore.collection<Review>('review').doc(id).delete().then(()=>{
      this.blockUI.stop();

      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(()=>{
      this.blockUI.stop();

      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveReview(Review: Review) {
    if (Review.id) {debugger
    this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Review>('review').doc(Review.id).update(Review).then(()=>{
      this.blockUI.stop();

        this.alertas.successInfoAlert("Actualización exitosa");
      //  this.location.back();
      }).catch(()=>{
      this.blockUI.stop();

        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
      //  this.location.back();
      });
     
    } else {
    this.blockUI.start("Guardando cambios");

      Review.id = this.angularFirestore.createId();
      this.angularFirestore.collection<Review>('review').doc(Review.id).set(Review).then(()=>{
      this.blockUI.stop();

        this.alertas.successInfoAlert("Reseña creada con éxito");
      //  this.location.back();
      }).catch(()=>{
      this.blockUI.stop();

        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
      //  this.location.back();
      });
    }
  }
}
