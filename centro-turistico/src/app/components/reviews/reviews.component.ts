import { Component, OnInit, Input } from '@angular/core';
import { reviewsModel, Review } from 'src/app/interfaces/index';
import { PermissionService, ReviewsService, AlertService } from 'src/app/services/index';
import { RecurseVisitor } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  admin: boolean;
  owner: boolean;
  base: boolean;
  @Input() Review: Review;
  constructor(private _perm: PermissionService, private _review: ReviewsService, private sAlert: AlertService) {  console.log(0);}

  ngOnInit() {
     this.owner = this._perm.duenno;
  }

  deleteRevi(rev: number){
    
    this._review.deleteReview(rev, this.Review.idSitio)
    this.sAlert.successInfoAlert("Se elimino la reseña correctamente");
  }

}
