import { Component, OnInit } from '@angular/core';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { SiteService, UserService, AlertService, DataStorageService } from 'src/app/services/index';
import { constant } from 'src/app/constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-maintenance-editors',
  templateUrl: './maintenance-editors.component.html',
  styleUrls: ['./maintenance-editors.component.css']
})
export class MaintenanceEditorsComponent implements OnInit {
  tourList: TouristicCentre[];
  editorList: User[];
  constructor(
    private siteService: SiteService,
    private data: DataStorageService,
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private alertService: AlertService) { }

  getSites() {
    this.siteService.getTouristicCentre().subscribe(res => {
      this.tourList = res;
    });
  }

  getEditors() {
    this.userService.getUsers().subscribe(res => {
      this.editorList = res;
    });
  }

  saveChange() {
    // this.editorList.forEach((item) => {
    //   if (this.tourList.findIndex(itemm => itemm.idEditor == item.idUser) > -1) {
    //     item.rol = "duenno";
    //   } else {
    //     item.rol = "basico";
    //   }
    // });
    let index = this.tourList.length;
    this.tourList.forEach((item)=> {
      let userAux = this.editorList.find(itemE => itemE.id==item.idEditor);
      userAux.rol = "duenno";
      this.angularFirestore.collection<User>('users')
      .doc(item.idEditor)
      .set(userAux)
      .then(
        () => {
          this.siteService.saveTouristicCentreEditor(item, index-1);
          index--;
        }
      );
    });
    //this.data.setObjectValue(constant.USERS, this.editorList);
    //this.siteService.saveTourProfiles(this.tourList);
    //this.alertService.successInfoAlert("Cambios Guardados Correctamente");
  }

  ngOnInit() {
    this.getSites();
    this.getEditors();
  }

}
