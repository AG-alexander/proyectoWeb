import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/index';
import { constant } from 'src/app/constant-data/constant';
import NEWS from 'src/assets/data/news.json';
import RATINGS from 'src/assets/data/rating.json';
import REVIEWS from 'src/assets/data/reviews.json';
import SITES from 'src/assets/data/touristic-centres.json';
import USERS from 'src/assets/data/users.json';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constant = new constant();
  constructor(private _dataStorage: DataStorageService) { }

  ngOnInit() {
  }

  click(){
    //this._dataStorage.setObjectValue(this.constant.NEWS, NEWS);
    this._dataStorage.setObjectValue(this.constant.RATINGS, RATINGS);
    this._dataStorage.setObjectValue(this.constant.REVIEWS, REVIEWS);
    this._dataStorage.setObjectValue(this.constant.SITES, SITES);
    this._dataStorage.setObjectValue(this.constant.USERS, USERS);
  }
}
