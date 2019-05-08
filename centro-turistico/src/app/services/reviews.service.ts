import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { Review, User } from '../interfaces/index';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private dataStorage: DataStorageService,
    private userService: UserService) {
   }

  getReviewsBySite(idSite: number){
    let reviews: Review[] = this.dataStorage.getObjectValue(constant.REVIEWS);
    let users: User[] = this.dataStorage.getObjectValue(constant.USERS);
    reviews = reviews.filter(item => item.idSitio == idSite);
    reviews.forEach( (item)=> {
      item.img = users.find(us => us.idUser == item.idUser).iconno;
      item.userName = users.find(us => us.idUser == item.idUser).userName
    });
    return reviews;
  }

  saveReview(review: Review) {
    let user = this.userService.getUser();
    let reviews = this.dataStorage.getObjectValue(constant.REVIEWS) as Review[];
    review.idUser = user.idUser;
    review.img = user.iconno;
    reviews.push(review);
    this.dataStorage.setObjectValue(constant.REVIEWS, reviews);
    return true;
  }

  updateReview(review: Review) {
    let revLits = this.dataStorage.getObjectValue(constant.REVIEWS) as Review [];
    let index = revLits.findIndex(item => item.idReview == review.idReview);
    revLits[index] = review;
    this.dataStorage.setObjectValue(constant.REVIEWS, revLits);
  }

  deleteReview(review: number, page: number){
    let revLits = this.getReviewsBySite(page);
    let index = revLits.findIndex(item => item.idReview == review);
    revLits.slice(index, 1);
    this.dataStorage.setObjectValue(constant.REVIEWS, revLits);
  }
}
