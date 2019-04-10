import { Component, OnInit } from '@angular/core';
import { UserService, DataStorageService } from 'src/app/services/index';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/index';
import { constant } from 'src/app/constant-data/constant';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  iduser: number;
  user: User

  constructor(private _userService: UserService, 
    private _activatedRouete: ActivatedRoute,
    private _storage: DataStorageService) { }

  ngOnInit() {
    this.iduser = +this._activatedRouete.snapshot.params['id'];
    this.user = this._userService.getUser();
    console.log(this.user);
    console.log(this._storage.getObjectValue(constant.FOLLOWERS));
    console.log(this._storage.getObjectValue(constant.RATINGS));
    console.log(this._storage.getObjectValue(constant.SITES));
    
  }

}
