import { Component, OnInit } from '@angular/core';
import { UserService, DataStorageService, FollowerService, RatingService, SiteService, ReviewsService } from 'src/app/services/index';
import { ActivatedRoute } from '@angular/router';
import { User, followerModel, TouristicCentre, userInfo, Review } from 'src/app/interfaces/index';
import { constant } from 'src/app/constant-data/constant';
import { Rating } from 'src/app/interfaces/rating';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
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
  ) { }

  getSitesByUser() {
    this.blockUI.start("Obteniendo datos");
    this.followerService.getSitiosByUsuario(this.iduser).subscribe(
      res => {
        this.blockUI.stop();
        this.followerList = res;
        this.blockUI.start("Obteniendo datos");
        this.followerList.forEach(element => {
          this.siteService.getTouristicCentreById(element.siteId).subscribe(
            res => {
              this.blockUI.stop();
              this.siteList = res;
              this.getInfomation();
            }, err => {
              this.blockUI.stop();
            }
          );
        });
        this.blockUI.stop();
      },
      err => {
        this.blockUI.stop();
      }
    );
  }

  getRatingBySite(id: string) {
    return this.ratingService.getRatingBySite(id);
  }

  getReviewsBySite(id: string): Review[] {
    this.reviewService.getReviewBySite(id).subscribe(
      res => {
        return res;
      }
    );
    return [];
  }

  getInfomation() {
    this.siteList.forEach(element => {
      this.getUserInfo(element.name, element.id)
      // let userInfoAux: userInfo = {
      //   nameSite: element.name,
      //   ratingSite: this.getRatingBySite(element.id),
      //   reviewsList: this.getReviewsBySite(element.id)
      // }
      // this.userInfo.push(userInfoAux);
    });
  }

  getUserInfo(name: string, id: string) {
    let userInfoAux: userInfo = {
      nameSite: name,
      ratingSite: 0,
      reviewsList: []
    }
    this.getRatingBySite(id).subscribe(
      res => {
        if (res.length == 0) {
          userInfoAux.ratingSite = 0;
        }
        let rat = 0;
        res.forEach(element => {
          rat += element.value;
        });
        userInfoAux.ratingSite = rat / res.length;

        this.reviewService.getReviewBySite(id).subscribe(
          res => {
            userInfoAux.reviewsList = res.filter(item => item.idUser == this.user.id);debugger
            this.userInfo.push(userInfoAux);
          }
        );
      }
    );
  }

  ngOnInit() {
    this.iduser = this.activatedRouete.snapshot.params['id'];
    this.userInfo = [];


    this.blockUI.start("Obteniendo datos");
    this.userService.getUserById(this.iduser).subscribe(
      res => {
        this.blockUI.stop();
        this.user = res[0];
        this.getSitesByUser();
      }
    );
  }
  getRating(r: Rating): number {
    return r != null ? r.rating : 0;
  }

}
