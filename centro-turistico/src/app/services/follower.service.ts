import { Injectable } from '@angular/core';
import { followerModel, User } from '../interfaces/index';
import { DataStorageService } from './data-storage.service';
import { constant } from '../constant-data/constant';
@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(private _dataStorage: DataStorageService) { }

  getFollowersBySite(idSite: number) {
    let followers: followerModel[] = this._dataStorage.getObjectValue(constant.FOLLOWERS);
    let users: User[] = this._dataStorage.getObjectValue(constant.USERS);
    followers.forEach( (item)=> {
      item.user = users.find(us => us.idUser == item.userId).userName;
    });
    return followers.filter(item => item.siteId == idSite);
  }
}
