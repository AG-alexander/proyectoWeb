import { Component, OnInit, TemplateRef } from '@angular/core';
import { SiteService, FollowerService, ReviewsService, RatingService } from '../../services/index';
import { TouristicCentre, reviewsModel, followerModel } from '../../interfaces/index';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PermissionService } from 'src/app/services/permission.service';
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
  img: string;
  modalRef: BsModalRef;
  constructor(
    private _siteService: SiteService,
    private _reviewsService: ReviewsService,
    private _followersService: FollowerService,
    private _ratingService: RatingService,
    private _activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _permission: PermissionService
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

  openModal(template: TemplateRef<any>, image: string) {
    this.modalRef = this.modalService.show(template);
    this.img = image;
  }

}
