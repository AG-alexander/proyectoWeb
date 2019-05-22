import { Component, OnInit } from '@angular/core';
import { DataStorageService, LoginService } from 'src/app/services/index';
import { constant } from 'src/app/constant-data/constant';
import NEWS from 'src/assets/data/news.json';
import RATINGS from 'src/assets/data/rating.json';
import REVIEWS from 'src/assets/data/reviews.json';
import SITES from 'src/assets/data/touristic-centres.json';
import USERS from 'src/assets/data/users.json';
import FOLLOWERS from 'src/assets/data/followers.json';
import { User } from 'src/app/interfaces/index';
import { PermissionService } from 'src/app/services/permission.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
    private dataStorage: DataStorageService,
    private permission: PermissionService,
    private log: LoginService,
    private router: Router) {
     }
  chargeData(){
    //this.dataStorage.setObjectValue(this.constant.NEWS, NEWS);
    this.dataStorage.setObjectValue(constant.RATINGS, RATINGS);
    this.dataStorage.setObjectValue(constant.REVIEWS, REVIEWS);
    this.dataStorage.setObjectValue(constant.SITES, SITES);
    this.dataStorage.setObjectValue(constant.USERS, USERS);
    this.dataStorage.setObjectValue(constant.FOLLOWERS, FOLLOWERS);
    this.dataStorage.setObjectValue(constant.NEWS, NEWS);
    this.dataStorage.setObjectValue(constant.USER, null);

    this.dataStorage.setObjectValue(constant.IDNEWS, constant.IDNEWSNUM);
    this.dataStorage.setObjectValue(constant.IDTOUR, constant.IDTOURNUM);
    this.dataStorage.setObjectValue(constant.IDUSER, constant.IDUSERNUM);
  }

  logout(){
    this.dataStorage.setObjectValue(constant.USER, null);
    this.router.navigate(['home']);
    this.user = null
    this.permission.setPermission();
  }
  ngOnInit() {
    this.user = this.log.currentUser;
    this.permission.setPermission();
    
  }

}
