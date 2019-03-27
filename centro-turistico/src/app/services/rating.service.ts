import { Injectable } from '@angular/core';
import { ratingXSite } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private _dataStorage: DataStorageService) { }

  getRatingBySite(idSite: number) {
    let ratings: ratingXSite[] = this._dataStorage.getObjectValue(constant.RATINGS);
    let value = 0;
    ratings.filter(item => item.siteId == idSite);
    ratings.forEach(
      (item)=>{
        value =+ item.value;
      }
    );
    value = value/ratings.length;
    return value;
  }
}
