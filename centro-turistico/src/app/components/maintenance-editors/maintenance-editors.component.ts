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
  idEditores: string[];
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
      this.tourList.forEach(item => {
        this.idEditores.push(item.idEditor);
      });
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
    let count = 0;
    this.tourList.forEach((item, indexList) =>{
      count += item.idEditor != this.idEditores[indexList]? 1: 0;
    });
    this.tourList.forEach((item, indexList) => {
      if (item.idEditor != this.idEditores[indexList]) {
        let isEditor = this.tourList.findIndex(itemT => itemT.idEditor == this.idEditores[indexList]);
        let editorViejo = this.editorList.findIndex(itemE => itemE.id == this.idEditores[indexList]);
        let editorNuevo = this.editorList.findIndex(itemE => itemE.id == item.idEditor);
        this.siteService.saveTouristicCentreEditor(item, count-1, this.editorList[editorViejo], isEditor > -1, this.editorList[editorNuevo]);
        count--;
        //this.siteService.saveTouristicCentreEditor(item, index - 1);
        //         index--;
        // let isEditor = this.editorList.findIndex(itemEE => itemEE.id == item.idEditor);
        // if (isEditor > -1) {
        //   let userAux = this.editorList.find(itemU => itemU.id == item.idEditor);
        //   userAux.rol = "duenno";
        //   this.angularFirestore.collection<User>('users')
        //     .doc(userAux.id)
        //     .update(userAux)
        //     .then(
        //       () => {
        //         this.siteService.saveTouristicCentreEditor(item, index - 1);
        //         index--;
        //       }
        //     );
        // } else {
        //   let user = this.editorList.find(itemE => itemE.id == this.idEditores[indexList]);debugger
        //   user.rol = this.editorList.findIndex(itemEE => itemEE.id == item.idEditor) > -1 ? "duenno" : "basico";
        //   this.angularFirestore.collection<User>('users')
        //     .doc(user.id)
        //     .update(user)
        //     .then(
        //       () => {
        //         let userAux = this.editorList.find(itemU => itemU.id == item.idEditor);
        //         userAux.rol = "duenno";
        //         this.angularFirestore.collection<User>('users')
        //           .doc(userAux.id)
        //           .update(userAux)
        //           .then(
        //             () => {
        //               this.siteService.saveTouristicCentreEditor(item, index - 1);
        //               index--;
        //             }
        //           );
        //       }
        //     ).catch(
        //       (err) => {
        //         console.log(err);
        //       }
        //     );
        // }
      } else {
        index--;
      }
      // this.siteService.saveTouristicCentreEditor(item, index-1);
      // index--;
      // let userAux = this.editorList.find(itemE => itemE.id==item.idEditor);
      // userAux.rol = "duenno";
      // this.angularFirestore.collection<User>('users')
      // .doc(userAux.id)
      // .update(userAux)
      // .then(
      //   () => {
      //     // this.siteService.saveTouristicCentreEditor(item, index-1);
      //     // index--;
      //   }
      // ).catch(
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    });
  }

  ngOnInit() {
    this.idEditores = [];
    this.getSites();
    //this.getEditors();
  }

}
