import { Component, OnInit } from '@angular/core';
import { UserService, DataStorageService, FollowerService, RatingService, SiteService, ReviewsService } from 'src/app/services/index';
import { ActivatedRoute } from '@angular/router';
import { User, followerModel, TouristicCentre, userInfo, Review } from 'src/app/interfaces/index';
import { constant } from 'src/app/constant-data/constant';
import { Rating } from 'src/app/interfaces/rating';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit  {
  @BlockUI() blockUI: NgBlockUI;
  iduser: string;
  user: User
  followerList: followerModel[];
  ratingList: Rating[];
  siteList: TouristicCentre[];
  reviewsList: Review[];
  userSites: TouristicCentre;
  userInfo: userInfo[];
  profileUrl: Observable<string>;
  constructor(
    private userService: UserService,
    private followerService: FollowerService,
    private ratingService: RatingService,
    private siteService: SiteService,
    private reviewService: ReviewsService, 
    private activatedRouete: ActivatedRoute,
    private storage: DataStorageService,
    private fbStorage: AngularFireStorage,
    ) 
  { }

  getSitesByUser() {
    this.blockUI.start("Obteniendo datos");
    this.followerService.getSitiosByUsuario(this.iduser).subscribe(
      res => {
        this.followerList = res;
        this.blockUI.start("Obteniendo datos");
        this.followerList.forEach(element => {
          this.siteService.getTouristicCentreById(element.id).subscribe(
            res => {
              this.blockUI.stop();
              this.siteList = res;
              this.getInfomation();
            }
          );          
        });
        this.blockUI.stop();
      }
    );
  }

  getRatingBySite(id: string) {
    return this.ratingService.getRatingBySite(id);
  }

  getReviewsBySite(id: string): Review []{
    this.reviewService.getReviewBySite(id).subscribe(
      res => {
        return res;
      }
    );
    return [];
  }

  getInfomation() {
    this.siteList.forEach(element => {
      let userInfoAux: userInfo = {
        nameSite: element.name,
        ratingSite: this.getRatingBySite(element.id),
        reviewsList: this.getReviewsBySite(element.id)
      }
      this.userInfo.push(userInfoAux);
    });
  }

  ngOnInit() {
    this.iduser = this.activatedRouete.snapshot.params['id'];
    this.userInfo = [];
    this.getSitesByUser();
    
  this.blockUI.start("Obteniendo datos");
    this.userService.getUserById(this.iduser).subscribe(
      res => {
        this.blockUI.stop();
        this.user = res[0];
      }
    );
  }
  getRating(r: Rating): number {
    return r!=null? r.rating: 0;
  }

}
