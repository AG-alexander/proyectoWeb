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
    followers.forEach((item) => {
      item.user = users.find(us => us.idUser == item.userId).userName;
      item.img = users.find(us => us.idUser == item.userId).iconno;
    });
    return followers.filter(item => item.siteId == idSite);
  }

  isFollower(idUser: number, idSite: number) {
    let followers: followerModel[] = this._dataStorage.getObjectValue(constant.FOLLOWERS);
    let index = followers.findIndex(item => item.siteId == idSite && item.userId == idUser);
    return index > -1;
  }
  addFollower(idUser: number, idSite: number) {
    if (!this.isFollower(idUser, idSite)) {
      let followers: followerModel[] = this._dataStorage.getObjectValue(constant.FOLLOWERS);
      let newFollower: followerModel;
      newFollower = {
        userId: idUser,
        siteId: idSite,
        id: 0,
        img: "",
        user: ""
      }
      followers.push(newFollower);
      this._dataStorage.setObjectValue(constant.FOLLOWERS, followers);
    }
  }
  deleteFollower(idUser: number, idSite: number) {
    if (this.isFollower(idUser, idSite)) {
      let followers: followerModel[] = this._dataStorage.getObjectValue(constant.FOLLOWERS);
      let index = followers.findIndex(item => item.userId == idUser && item.siteId == idSite);
      followers.splice(index, 1);
      this._dataStorage.setObjectValue(constant.FOLLOWERS, followers);
    }
  }
}
