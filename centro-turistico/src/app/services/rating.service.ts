import { Injectable } from '@angular/core';
import { ratingXSite } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { element } from '@angular/core/src/render3';
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private dataStorage: DataStorageService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) { }

  // getRatingBySite(idSite: number) {
  //   let ratings: ratingXSite[] = this.dataStorage.getObjectValue(constant.RATINGS);
  //   let value = 0;
  //   ratings.filter(item => item.siteId == idSite);
  //   ratings.forEach(
  //     (item)=>{
  //       value =+ item.value;
  //     }
  //   );
  //   value = value/ratings.length;
  //   return value;
  // }

   //  FIREBASE
   getRating(): Observable<ratingXSite[]> {
    return this.angularFirestore.collection<ratingXSite>('rating').valueChanges();
  }

  getRatingById(id: string): Observable<ratingXSite[]> {
    return this.angularFirestore.collection<ratingXSite>('rating', ref => ref.where('id', '==', id)).valueChanges();
  }

  getRatingBySite(id: string): number {
     this.angularFirestore.collection<ratingXSite>('rating', ref => ref.where('idTouristicCentre', '==', id)).valueChanges()
    .subscribe(
      res => {
        if (res.length == 0) {
          return 0;
        }
        let rat = 0;
        res.forEach(element => {
          rat += element.value;
        });
        return rat/res.length;
      }
    );
    return 0;
  }

  deleteRating(id: string) {
    this.angularFirestore.collection<ratingXSite>('rating').doc(id).delete().then(() => {
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(() => {
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveRating(ratingXSite: ratingXSite) {
    if (ratingXSite.id) {
      this.angularFirestore.collection<ratingXSite>('rating').doc(ratingXSite.id).update(ratingXSite).then(() => {
        this.alertas.successInfoAlert("Actualización exitosa");
      //  this.location.back();
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
      //  this.location.back();
      });

    } else {
      ratingXSite.id = this.angularFirestore.createId();
      this.angularFirestore.collection<ratingXSite>('rating').doc(ratingXSite.id).set(ratingXSite).then(() => {
        this.alertas.successInfoAlert("Inserción exitosa");
      //  this.location.back();
      }).catch(() => {
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
      //  this.location.back();
      });
    }
  }
}
