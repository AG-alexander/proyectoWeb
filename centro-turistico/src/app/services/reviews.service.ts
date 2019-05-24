import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { Review, User } from '../interfaces/index';
import { UserService } from './user.service';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private dataStorage: DataStorageService,
    private userService: UserService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) {
   }

  // getReviewsBySite(idSite: number){
  //   let reviews: Review[] = this.dataStorage.getObjectValue(constant.REVIEWS);
  //   let users: User[] = this.dataStorage.getObjectValue(constant.USERS);
  //   reviews = reviews.filter(item => item.idSitio == idSite);
  //   reviews.forEach( (item)=> {
  //     item.img = users.find(us => us.idUser == item.idUser).iconno;
  //     item.userName = users.find(us => us.idUser == item.idUser).userName
  //   });
  //   return reviews;
  // }

  // saveRevie(review: Review) {
  //   let user = this.userService.getUser();
  //   let reviews = this.dataStorage.getObjectValue(constant.REVIEWS) as Review[];
  //   review.idUser = user.idUser;
  //   review.img = user.iconno;
  //   reviews.push(review);
  //   this.dataStorage.setObjectValue(constant.REVIEWS, reviews);
  //   return true;
  // }

  // updateReview(review: Review) {
  //   let revLits = this.dataStorage.getObjectValue(constant.REVIEWS) as Review [];
  //   let index = revLits.findIndex(item => item.idReview == review.idReview);
  //   revLits[index] = review;
  //   this.dataStorage.setObjectValue(constant.REVIEWS, revLits);
  // }

  // deleteRevie(review: number, page: number){
  //   let revLits = this.getReviewsBySite(page);
  //   let index = revLits.findIndex(item => item.idReview == review);
  //   revLits.slice(index, 1);
  //   this.dataStorage.setObjectValue(constant.REVIEWS, revLits);
  // }

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
    this.angularFirestore.collection<Review>('review').doc(id).delete().then(()=>{
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(()=>{
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveReview(Review: Review) {
    if (Review.id) {debugger
      this.angularFirestore.collection<Review>('review').doc(Review.id).update(Review).then(()=>{
        this.alertas.successInfoAlert("Actualización exitosa");
      //  this.location.back();
      }).catch(()=>{
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
      //  this.location.back();
      });
     
    } else {
      Review.id = this.angularFirestore.createId();
      this.angularFirestore.collection<Review>('review').doc(Review.id).set(Review).then(()=>{
        this.alertas.successInfoAlert("Reseña creada con éxito");
      //  this.location.back();
      }).catch(()=>{
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
      //  this.location.back();
      });
    }
  }
}
