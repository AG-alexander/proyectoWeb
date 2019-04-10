import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
import { Review, User } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _dataStorage: DataStorageService) {
   }

  getReviewsBySite(idSite: number){
    let reviews: Review[] = this._dataStorage.getObjectValue(constant.REVIEWS);
    let users: User[] = this._dataStorage.getObjectValue(constant.USERS);
    reviews = reviews.filter(item => item.idSitio == idSite);
    reviews.forEach( (item)=> {
      item.img = users.find(us => us.idUser == item.idUser).iconno;
      item.userName = users.find(us => us.idUser == item.idUser).userName
    });
    return reviews;
  }
}
