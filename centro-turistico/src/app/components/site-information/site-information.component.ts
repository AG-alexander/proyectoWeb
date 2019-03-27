import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/index';
import { TouristicCentre, reviewsModel } from '../../interfaces/index';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'src/app/services/reviews.service';
@Component({
  selector: 'app-site-information',
  templateUrl: './site-information.component.html',
  styleUrls: ['./site-information.component.css']
})
export class SiteInformationComponent implements OnInit {

  // COMPONENTS ATRIBUTES 
  private touristicCentre: TouristicCentre;
  private reviews: reviewsModel[];
  constructor(
    private _siteService: SiteService,
    private _reviewsService: ReviewsService,
    private _activatedRoute: ActivatedRoute
    ) { }

    getSite() {
      let id = +this._activatedRoute.snapshot.params['id'];
      this.touristicCentre = this._siteService.getSiteById(id);
      this.reviews = this._reviewsService.getReviewsBySite(id);
    }

  ngOnInit() {
    this.getSite();
  }

}
