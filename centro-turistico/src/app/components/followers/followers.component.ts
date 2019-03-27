import { Component, OnInit, Input } from '@angular/core';
import { followerModel } from 'src/app/interfaces/index';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  @Input() followers: followerModel[]
  constructor() { }

  ngOnInit() {
  }

}
