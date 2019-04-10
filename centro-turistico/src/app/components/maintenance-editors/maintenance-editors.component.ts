import { Component, OnInit } from '@angular/core';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { SiteService, UserService, AlertService, DataStorageService } from 'src/app/services/index';
import { constant } from 'src/app/constant-data/constant';

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
    private _data: DataStorageService,
    private _userService: UserService,
    private _alertService: AlertService) { }

  getSites() {
    this.tour_list = this._siteService.getSites();
  }

  getEditors() {
    this.editor_list = this._userService.getEditor();
  }

  saveChange() {
    this.editor_list.forEach((item) => {
      if (this.tour_list.findIndex(itemm => itemm.idEditor == item.idUser) > -1) {
        item.rol = "duenno";
      } else {
        item.rol = "basico";
      }
    });
    this._data.setObjectValue(constant.USERS, this.editor_list);
    this._siteService.saveTourProfiles(this.tour_list);
    this._alertService.successInfoAlert("Cambios Guardados Correctamente");
  }

  ngOnInit() {
    this.getSites();
    this.getEditors();
  }

}
