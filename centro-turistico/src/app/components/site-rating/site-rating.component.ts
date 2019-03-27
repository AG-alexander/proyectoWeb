import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-site-rating',
  templateUrl: './site-rating.component.html',
  styleUrls: ['./site-rating.component.css']
})
export class SiteRatingComponent implements OnInit {
  @Input() rate;
  max: number = 10;
  percent: number;
  constructor() { }

  ngOnInit() {
  }

}
