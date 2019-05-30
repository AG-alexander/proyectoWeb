import { Component, OnInit, Input } from '@angular/core';
import { ratingXSite } from 'src/app/interfaces/index';
import { RatingService } from '../../services/index';
@Component({
  selector: 'app-site-rating',
  templateUrl: './site-rating.component.html',
  styleUrls: ['./site-rating.component.css']
})
export class SiteRatingComponent implements OnInit {
  @Input() rate;
  @Input() readOnly;
  @Input() rating: ratingXSite;
  max: number = 5;
  percent: number;
  constructor(
    private ratingService: RatingService
  ) { }

  ngOnInit() {
    
  }
  ratin(event: KeyboardEvent) {
   this.ratingService.saveRating(this.rating);
  }
}
