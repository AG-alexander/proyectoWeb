import { Component, OnInit } from '@angular/core';
import { UserService, DataStorageService, SiteService } from 'src/app/services/index';
import { ActivatedRoute } from '@angular/router';
import { User, followerModel, TouristicCentre, userInfo, Review } from 'src/app/interfaces/index';
import { constant } from 'src/app/constant-data/constant';
import { Console } from '@angular/core/src/console';
import { Rating } from 'src/app/interfaces/rating';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  iduser: number;
  user: User
  follower_list: followerModel[];
  rating_list: Rating[];
  site_list: TouristicCentre[];
  reviews_list: Review[];
  userSites: TouristicCentre;
  userInfo: userInfo[];
  constructor(private _userService: UserService,
    private _activatedRouete: ActivatedRoute,
    private _storage: DataStorageService) { }

  ngOnInit() {
    this.iduser = +this._activatedRouete.snapshot.params['id'];
    this.user = this._userService.getUser();
    this.follower_list = this._storage.getObjectValue(constant.FOLLOWERS);
    this.rating_list = this._storage.getObjectValue(constant.RATINGS);
    this.site_list = this._storage.getObjectValue(constant.SITES);
    this.reviews_list = this._storage.getObjectValue(constant.REVIEWS);
    let temoUserInfo: userInfo;
    this.userInfo = [];
    
    let tempFollower = this.follower_list.filter(item => item.userId == this.user.idUser);
    let sitesFollow: TouristicCentre[] = [];
    tempFollower.forEach((item) => {
      sitesFollow.push(this.site_list.find(items => items.idTouristicCentre == item.siteId));
    });
    let ratFollow: Rating[] = [];

    this.rating_list.forEach((item) =>{
      if (item.idUser == this.iduser) {
        ratFollow.push(item);
      }
    });

    let tempReviews: Review[];
    tempReviews = this.reviews_list.filter(item => item.idUser == this.user.idUser);
   sitesFollow.forEach((item)=>{
     let temp: userInfo = {
       nameSite: item.name,
       ratingSite: this.getRating(ratFollow.find(itemm => itemm.idTouristicCentre == item.idTouristicCentre)),
       reviews_list: tempReviews.filter(itemm => itemm.idSitio == item.idTouristicCentre)
     }
     this.userInfo.push(temp);
   });
  }
  getRating(r: Rating): number {
    return r!=null? r.rating: 0;
  }

}
