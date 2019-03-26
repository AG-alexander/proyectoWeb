import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/index';
import { TouristicCentre } from '../../interfaces/index';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-site-information',
  templateUrl: './site-information.component.html',
  styleUrls: ['./site-information.component.css']
})
export class SiteInformationComponent implements OnInit {

  // COMPONENTS ATRIBUTES 
  private touristicCentre: TouristicCentre;
  constructor(
    private _siteService: SiteService,
    private _activatedRoute: ActivatedRoute
    ) { }

    getSite() {
      let id = +this._activatedRoute.snapshot.params['id'];
      this.touristicCentre = this._siteService.getSiteById(id);
    }

  ngOnInit() {
    this.getSite();
  }

}
