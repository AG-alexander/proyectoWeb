import { Component, OnInit } from '@angular/core';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { SiteService, UserService, AlertService, DataStorageService } from 'src/app/services/index';
import { constant } from 'src/app/constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-maintenance-editors',
  templateUrl: './maintenance-editors.component.html',
  styleUrls: ['./maintenance-editors.component.css']
})
export class MaintenanceEditorsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  tourList: TouristicCentre[];
  editorList: User[];
  constructor(
    private siteService: SiteService,
    private data: DataStorageService,
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private alertService: AlertService) { }

  getSites() {
    this.blockUI.start("Obteniendo sitios...!!!");
    this.siteService.getTouristicCentre().subscribe(res => {
      this.tourList = res;
      this.getEditors();
      this.blockUI.stop();
    });
  }

  getEditors() {
    this.blockUI.start("Obteniendo editores...!!!");
    this.userService.getUsers().subscribe(res => {
      this.editorList = res;
      this.blockUI.stop();
    });
  }

  saveChange() {
    let index = this.tourList.length;
    this.tourList.forEach((item)=> {
      let userAux = this.editorList.find(itemE => itemE.id==item.idEditor);
      userAux.rol = "duenno";
      this.angularFirestore.collection<User>('users')
      .doc(userAux.id)
      .update(userAux)
      .then(
        () => {
          this.siteService.saveTouristicCentreEditor(item, index-1);
          index--;
        }
      ).catch(
        (err) => {
          console.log(err);
        }
      );
    });
  }

  ngOnInit() {
    this.getSites();
    //this.getEditors();
  }

}
