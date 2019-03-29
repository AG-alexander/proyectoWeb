import { Component, OnInit, Input } from '@angular/core';
import { reviewsModel } from 'src/app/interfaces/index';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() reviews: reviewsModel[];
  flagMessage: boolean;
  constructor() { }

  ngOnInit() {
    this.flagMessage = this.reviews == undefined? true : false;
  }

}
