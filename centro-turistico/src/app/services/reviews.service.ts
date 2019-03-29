import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { reviewsModel, User } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _dataStorage: DataStorageService) {
   }

  getReviewsBySite(idSite: number){
    let reviews: reviewsModel[] = this._dataStorage.getObjectValue(constant.REVIEWS);
    let users: User[] = this._dataStorage.getObjectValue(constant.USERS);
    reviews.forEach( (item)=> {
      item.user = users.find(us => us.idUser == item.userId).userName;
    });
    return reviews.filter(item => item.siteId == idSite);
  }
}
