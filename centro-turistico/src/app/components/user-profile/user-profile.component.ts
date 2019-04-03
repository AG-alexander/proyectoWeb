import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/index';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/index';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  iduser: number;
  user: User
  constructor(private _userService: UserService, private _activatedRouete: ActivatedRoute) { }

  ngOnInit() {
    this.iduser = +this._activatedRouete.snapshot.params['id'];
    this.user = this._userService.getUser();
    console.log(this.user);
  }

}
