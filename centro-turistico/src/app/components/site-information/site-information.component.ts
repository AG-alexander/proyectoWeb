import { Component, OnInit, TemplateRef } from '@angular/core';
import { SiteService, FollowerService, ReviewsService, RatingService, AlertService, UserService } from '../../services/index';
import { TouristicCentre, followerModel, Review, User } from '../../interfaces/index';
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
  formGroupModalAnswer: FormGroup;
  id: string;
  isFollower: boolean;
  user: User;
  messageFollower: string;
  message: string;
  review: Review;
  flag: boolean;
  constructor(
    private siteService: SiteService,
    private reviewsService: ReviewsService,
    private followersService: FollowerService,
    private ratingService: RatingService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private modalService: BsModalService,
    private permission: PermissionService,
    private fB: FormBuilder,
    private alert: AlertService
  ) {}

  getSite() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.siteService.getTouristicCentreById(this.id).subscribe(
      res => {
        this.touristicCentre = res[0];
        this.reviewsService.getReviewBySite(this.id).subscribe(
          res => {
            this.reviews = res;
            this.followersService.getSeguidoresBySite(this.id).subscribe(
              res => {
                this.followers = res;
                this.flag = true;
              }
            );
          }
        );
      }
    );

    this.maxStars = this.ratingService.getRatingBySite(this.id);
  }

  ngOnInit() {
    this.getSite();
    this.initForm();
    this.user = this.userService.getUser();
    if (this.user) {
     // this.isFollower = this.followersService.isFollower(this.user.idUser, this.id);
    }
    this.message = this.isFollower? "Dejar de seguir":"Comenzar a seguir";
    this.messageFollower = this.isFollower? "Siguiendo":"Seguir";
  }

  openModal(template: TemplateRef<any>, image: string) {
    this.modalRef = this.modalService.show(template);
    this.img = image;
  }

  openModalReview(template: TemplateRef<any>) {
    this.formGroupModal.reset();
    this.formGroupModalAnswer.reset();
    this.modalRef = this.modalService.show(template);
  }

  initForm() {
    this.formGroupModal = this.fB.group({
      description: ['', Validators.required]
    });

    this.formGroupModalAnswer = this.fB.group({
      answer: ['', Validators.required]
    });
  }

  confirm() {
    if (this.formGroupModal.valid) {
      let review: Review = this.formGroupModal.value as Review;
      review.idSitio = this.id;
      review.idUser = this.user.id;
      review.img = this.user.iconno.url;
      review.blocked = true;
      review.userName = this.user.userName;
      this.reviewsService.saveReview(review);debugger
      this.formGroupModal.reset();
  //    this.alert.successInfoAlert("Reseña creada con exito");
      this.modalRef.hide();
      this.modalRef = null;
    }
  }

  answerConfirm() {
    if (this.formGroupModalAnswer.valid) {
      this.review.dunnoReview = this.formGroupModalAnswer.controls['answer'].value;
      this.reviewsService.saveReview(this.review);
    //  this.alert.successInfoAlert("Respuesta agregada con exito");
      this.modalRef.hide();
      this.modalRef = null;
    }
  }

  addFollower() {
    if (this.isFollower) {
      let idFollower = this.followers.find(item => item.userId == this.user.id).id;
      this.followersService.deleteSeguidores(idFollower);
    //  this.followersService.deleteFollower(this.user.idUser, this.id);
      this.isFollower = false;
    } else {
      let follow: followerModel = {
        siteId: this.id,
        userId: this.user.id,
        img: this.user.iconno.url
      }
      this.followersService.saveSeguidores(follow);
   //   this.followersService.addFollower(this.user.idUser, this.id);
       this.isFollower = true;
    }
    this.message = this.isFollower? "Dejar de seguir":"Comenzar a seguir";
    this.messageFollower = this.isFollower? "Siguiendo":"Seguir";
  }

  answerReview(template: TemplateRef<any>, $event) {
    this.review = $event;
    this.modalRef = this.modalService.show(template);
  }

  get FG() {
    return this.formGroupModal.controls;
  }

  get FGA() {
    return this.formGroupModalAnswer.controls;
  }


}
