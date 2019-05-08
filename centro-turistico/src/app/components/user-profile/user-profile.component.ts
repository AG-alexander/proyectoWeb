import { Component, OnInit } from '@angular/core';
import { UserService, DataStorageService } from 'src/app/services/index';
import { ActivatedRoute } from '@angular/router';
import { User, followerModel, TouristicCentre, userInfo, Review } from 'src/app/interfaces/index';
import { constant } from 'src/app/constant-data/constant';
import { Rating } from 'src/app/interfaces/rating';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  iduser: number;
  user: User
  followerList: followerModel[];
  ratingList: Rating[];
  siteList: TouristicCentre[];
  reviewsList: Review[];
  userSites: TouristicCentre;
  userInfo: userInfo[];
  constructor(private userService: UserService,
    private activatedRouete: ActivatedRoute,
    private storage: DataStorageService) { }

  ngOnInit() {
    this.iduser = +this.activatedRouete.snapshot.params['id'];
    this.user = this.userService.getUser();
    this.followerList = this.storage.getObjectValue(constant.FOLLOWERS);
    this.ratingList = this.storage.getObjectValue(constant.RATINGS);
    this.siteList = this.storage.getObjectValue(constant.SITES);
    this.reviewsList = this.storage.getObjectValue(constant.REVIEWS);
    let temoUserInfo: userInfo;
    this.userInfo = [];
    
    let tempFollower = this.followerList.filter(item => item.userId == this.user.idUser);
    let sitesFollow: TouristicCentre[] = [];
    tempFollower.forEach((item) => {
      sitesFollow.push(this.siteList.find(items => items.idTouristicCentre == item.siteId));
    });
    let ratFollow: Rating[] = [];

    this.ratingList.forEach((item) =>{
      if (item.idUser == this.iduser) {
        ratFollow.push(item);
      }
    });

    let tempReviews: Review[];
    tempReviews = this.reviewsList.filter(item => item.idUser == this.user.idUser);
   sitesFollow.forEach((item)=>{
     let temp: userInfo = {
       nameSite: item.name,
       ratingSite: this.getRating(ratFollow.find(itemm => itemm.idTouristicCentre == item.idTouristicCentre)),
       reviewsList: tempReviews.filter(itemm => itemm.idSitio == item.idTouristicCentre)
     }
     this.userInfo.push(temp);
   });
  }
  getRating(r: Rating): number {
    return r!=null? r.rating: 0;
  }

}
