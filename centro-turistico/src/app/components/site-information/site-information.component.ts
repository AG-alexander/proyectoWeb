import { Component, OnInit } from '@angular/core';
import { SiteService, FollowerService, ReviewsService, RatingService } from '../../services/index';
import { TouristicCentre, reviewsModel, followerModel } from '../../interfaces/index';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-site-information',
  templateUrl: './site-information.component.html',
  styleUrls: ['./site-information.component.css']
})
export class SiteInformationComponent implements OnInit {

  // COMPONENTS ATRIBUTES 
  private touristicCentre: TouristicCentre;
  private reviews: reviewsModel[];
  private followers: followerModel[];
  private maxStars = 0;
  constructor(
    private _siteService: SiteService,
    private _reviewsService: ReviewsService,
    private _followersService: FollowerService,
    private _ratingService: RatingService,
    private _activatedRoute: ActivatedRoute
    ) { }

    getSite() {
      let id = +this._activatedRoute.snapshot.params['id'];
      this.touristicCentre = this._siteService.getSiteById(id);
      this.reviews = this._reviewsService.getReviewsBySite(id);
      this.followers = this._followersService.getFollowersBySite(id);
      this.maxStars = this._ratingService.getRatingBySite(id);
    }

  ngOnInit() {
    this.getSite();
  }

}
