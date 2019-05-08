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
  tourList: TouristicCentre [];
  editorList: User[];
  constructor(
    private siteService: SiteService,
    private data: DataStorageService,
    private userService: UserService,
    private alertService: AlertService) { }

  getSites() {
    this.tourList = this.siteService.getSites();
  }

  getEditors() {
    this.editorList = this.userService.getEditor();
  }

  saveChange() {
    this.editorList.forEach((item) => {
      if (this.tourList.findIndex(itemm => itemm.idEditor == item.idUser) > -1) {
        item.rol = "duenno";
      } else {
        item.rol = "basico";
      }
    });
    this.data.setObjectValue(constant.USERS, this.editorList);
    this.siteService.saveTourProfiles(this.tourList);
    this.alertService.successInfoAlert("Cambios Guardados Correctamente");
  }

  ngOnInit() {
    this.getSites();
    this.getEditors();
  }

}
