import { Component, OnInit, TemplateRef } from '@angular/core';
import { SiteService, FollowerService, ReviewsService, RatingService, AlertService, UserService } from '../../services/index';
import { TouristicCentre, reviewsModel, followerModel, Review, User } from '../../interfaces/index';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PermissionService } from 'src/app/services/permission.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-site-information',
  templateUrl: './site-information.component.html',
  styleUrls: ['./site-information.component.css']
})
export class SiteInformationComponent implements OnInit {

  // COMPONENTS ATRIBUTES 
  private touristicCentre: TouristicCentre;
  private reviews: Review[];
  private followers: followerModel[];
  private maxStars = 0;
  img: string;
  modalRef: BsModalRef;
  formGroupModal: FormGroup;
  id: number;
  isFollower: boolean;
  user: User;
  MessageFollower: string;
  Message: string;
  constructor(
    private _siteService: SiteService,
    private _reviewsService: ReviewsService,
    private _followersService: FollowerService,
    private _ratingService: RatingService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private modalService: BsModalService,
    private _permission: PermissionService,
    private FB: FormBuilder,
    private alert: AlertService
  ) {

    console.log(0);
  }

  getSite() {
    this.id = +this._activatedRoute.snapshot.params['id'];
    this.touristicCentre = this._siteService.getSiteById(this.id);
    this.reviews = this._reviewsService.getReviewsBySite(this.id);
    this.followers = this._followersService.getFollowersBySite(this.id);
    this.maxStars = this._ratingService.getRatingBySite(this.id);
  }

  ngOnInit() {
    this.getSite();
    this.initForm();
    this.user = this._userService.getUser();
    if (this.user) {
      this.isFollower = this._followersService.isFollower(this.user.idUser, this.id);
    }
    this.Message = this.isFollower? "Dejar de seguir":"Comenzar a seguir";
    this.MessageFollower = this.isFollower? "Siguiendo":"Seguir";
  }

  openModal(template: TemplateRef<any>, image: string) {
    this.modalRef = this.modalService.show(template);
    this.img = image;
  }

  openModalReview(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  initForm() {
    this.formGroupModal = this.FB.group({
      description: ['', Validators.required]
    });
  }

  confirm() {
    if (this.formGroupModal.valid) {
      let review: Review = this.formGroupModal.value as Review;
      review.idSitio = this.id;
      if (this._reviewsService.saveReview(review)) {
        this.reviews = this._reviewsService.getReviewsBySite(this.id);
      }
      this.formGroupModal.reset();
      this.alert.successInfoAlert("Reseña creada con exito");
      this.modalRef.hide();
      this.modalRef = null;
    }
  }
  addFollower() {
    if (this.isFollower) {
      this._followersService.deleteFollower(this.user.idUser, this.id);
      this.isFollower = false;
    } else {
      this._followersService.addFollower(this.user.idUser, this.id);
       this.isFollower = true;
    }
    this.Message = this.isFollower? "Dejar de seguir":"Comenzar a seguir";
    this.MessageFollower = this.isFollower? "Siguiendo":"Seguir";
  }

  get FG() {
    return this.formGroupModal.controls;
  }

}
