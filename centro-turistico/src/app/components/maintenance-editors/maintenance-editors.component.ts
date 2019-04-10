import { Component, OnInit } from '@angular/core';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { SiteService, UserService } from 'src/app/services/index';

@Component({
  selector: 'app-maintenance-editors',
  templateUrl: './maintenance-editors.component.html',
  styleUrls: ['./maintenance-editors.component.css']
})
export class MaintenanceEditorsComponent implements OnInit {
  tour_list: TouristicCentre [];
  editor_list: User[];
  constructor(
    private _siteService: SiteService,
    private _userService: UserService) { }

  getSites() {
    this.tour_list = this._siteService.getSites();
  }

  getEditors() {
    this.editor_list = this._userService.getEditor();
  }

  saveChange() {
    this._siteService.saveTourProfiles(this.tour_list);
  }

  ngOnInit() {
    this.getSites();
    this.getEditors();
  }

}
