import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/index';
import { TouristicCentre } from 'src/app/interfaces/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-touristic-profile-list',
  templateUrl: './maintenance-touristic-profile-list.component.html',
  styleUrls: ['./maintenance-touristic-profile-list.component.css']
})
export class MaintenanceTouristicProfileListComponent implements OnInit {

  tour_list: TouristicCentre[];
  constructor(private _siteService: SiteService, private _router: Router) { }

  getSites() {
    this.tour_list = this._siteService.getSites();
  }

  addTourProfile() {
    this._router.navigate(['dashboard/mainte-tour-set']);
  }

  updateTourProfile(id: number) {debugger
    this._router.navigate(['dashboard/mainte-tour-up', id]);
  }
  ngOnInit() {
    this.getSites();
  }

}
