import { Injectable } from '@angular/core';
import { DataStorageService } from '.';
import { constant } from '../constant-data/constant';
import { reviewsModel, User } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constant: constant;

  constructor(private _dataStorage: DataStorageService) {
    this.constant = new constant();
   }

  getReviewsBySite(idSite: number){
    let reviews: reviewsModel[] = this._dataStorage.getObjectValue(this.constant.REVIEWS);
    let users: User[] = this._dataStorage.getObjectValue(this.constant.USERS);
    reviews.forEach( (item)=> {
      item.user = users.find(us => us.idUser == item.userId).userName;
    });
    return reviews;
  }
}
