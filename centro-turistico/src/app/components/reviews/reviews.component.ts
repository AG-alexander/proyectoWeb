import { Component, OnInit, Input } from '@angular/core';
import { reviewsModel, Review } from 'src/app/interfaces/index';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() Review: Review;
  constructor() { }

  ngOnInit() {
  }

}
