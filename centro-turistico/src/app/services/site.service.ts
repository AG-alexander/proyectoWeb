import { Injectable } from '@angular/core';
import { TouristicCentre, User } from '../interfaces/index';
import { AlertService } from '../services/alert.service';
import { DataStorageService } from './data-storage.service.js';
import { constant } from 'src/app/constant-data/constant';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class SiteService {
  @BlockUI() blockUI: NgBlockUI;
  showedSites: TouristicCentre[];
  constructor(
    public dataStorage: DataStorageService,
    public angularFirestore: AngularFirestore,
    private alertas: AlertService,
    private location: Location) {
    this.showedSites = [];
    console.log(4);
  }

  getSite(name: string) {
    let tempList = this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
    if (!name) {
      this.showedSites = tempList;
    }
    else {
      name = name.toLowerCase();
      this.showedSites = [];
      tempList.forEach((site) => {
        if (site.name.toLowerCase().includes(name)) {
          this.showedSites.push(site);
        }
      });
    }
  }

  getSiteById(id: number): TouristicCentre {
    if (id) {
      let list: TouristicCentre[];
      let aux: TouristicCentre;
      list = this.dataStorage.getObjectValue(constant.SITES);
      aux = list.find(item => item.idTouristicCentre == id);
      return aux;
    }
    return null;
  }

  getSiteByEditor(id: number): TouristicCentre[] {
    if (id) {
      let list: TouristicCentre[];
      let aux: TouristicCentre[];
      list = this.dataStorage.getObjectValue(constant.SITES);
      return aux;
    }
    return null;
  }

  isEditorOfSite(id: number, idEditor: number): boolean {
    if (id) {
      let list: TouristicCentre[];
      let aux: number;
      list = this.dataStorage.getObjectValue(constant.SITES);
      return aux > -1;
    }
    return false;
  }

  getSites(): TouristicCentre[] {
    return this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
  }

  saveTourProfile(tour: TouristicCentre) {
    let index: number = -1;
    let tourList = this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
    let lastid = this.dataStorage.getObjectValue(constant.IDTOUR) as number;
    tourList.forEach((item, indexList) => {
      if (item.idTouristicCentre == tour.idTouristicCentre) {
        index = indexList;
      }
    });
    if (index >= 0) {
      tourList[index] = tour;
    } else {
      tour.idTouristicCentre = lastid + 1;
      tourList.push(tour);
    }

    this.dataStorage.setObjectValue(constant.SITES, tourList);
    this.dataStorage.setObjectValue(constant.IDTOUR, lastid + 1);
  }

  saveTourProfiles(tourList: TouristicCentre[]) {
    this.dataStorage.setObjectValue(constant.SITES, tourList);
  }

  deleteTourProfile(id: number) {
    let tourList = this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
    let indix = tourList.findIndex(item => item.idTouristicCentre == id);
    tourList.splice(indix, 1);
    this.dataStorage.setObjectValue(constant.SITES, tourList);
    return true;
  }

  //  FIREBASE
  getTouristicCentre(): Observable<TouristicCentre[]> {
    return this.angularFirestore.collection<TouristicCentre>('sitios').valueChanges();
  }

  getTouristicCentreByEdidtor(id: string): Observable<TouristicCentre[]> {
    return this.angularFirestore.collection<TouristicCentre>('sitios', ref => ref.where('idEditor', '==', id)).valueChanges();
  }

  getTouristicCentreById(id: string): Observable<TouristicCentre[]> {
    return this.angularFirestore.collection<TouristicCentre>('sitios', ref => ref.where('id', '==', id)).valueChanges();
  }

  deleteTouristicCentre(id: string) {
    this.blockUI.start("eliminando datos");
    this.angularFirestore.collection<TouristicCentre>('sitios').doc(id).delete().then(() => {
      this.blockUI.stop();
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(() => {
      this.blockUI.stop();
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveTouristicCentreEditor(TouristicCentre: TouristicCentre, index: number, editorViejo: User, isEditor: boolean, editorNuevo: User) {
    if (TouristicCentre.id) {
      this.blockUI.start("Guardar datos");
      this.angularFirestore.collection<TouristicCentre>('sitios').doc(TouristicCentre.id).update(TouristicCentre).then(() => {
        if (!isEditor) {
          editorViejo.rol = "basico";
          this.angularFirestore.collection<TouristicCentre>('users').doc(editorViejo.id).update(editorViejo).then(() => {
            editorNuevo.rol = "duenno";
            this.angularFirestore.collection<TouristicCentre>('users').doc(editorNuevo.id).update(editorNuevo).then(() => {
              if (index == 0) {
                //this.blockUI.stop();
                this.alertas.successInfoAlert("Actualización exitosa");
                this.location.back();
              }
            });
          });
        } else {
          editorNuevo.rol = "duenno";
          this.angularFirestore.collection<TouristicCentre>('users').doc(editorNuevo.id).update(editorNuevo).then(() => {
            if (index == 0) {
              //this.blockUI.stop();
              this.alertas.successInfoAlert("Actualización exitosa");
              this.location.back();
            }
          });
        }
      }).catch(() => {
        this.blockUI.stop();
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
      });

    }
  }

  saveTouristicCentre(TouristicCentre: TouristicCentre) {
    if (TouristicCentre.id) {
      this.blockUI.start("Guardar datos");
      this.angularFirestore.collection<TouristicCentre>('sitios').doc(TouristicCentre.id).update(TouristicCentre).then(() => {
        this.blockUI.stop();
        this.alertas.successInfoAlert("Actualización exitosa");
        this.location.back();
      }).catch(() => {
        this.blockUI.stop();
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });

    } else {
      TouristicCentre.id = this.angularFirestore.createId();
      this.blockUI.start("Guardar datos");
      this.angularFirestore.collection<TouristicCentre>('sitios').doc(TouristicCentre.id).set(TouristicCentre).then(() => {
        this.location.back();
        this.alertas.successInfoAlert("Inserción exitosa");
        this.location.back();
      }).catch(() => {
        this.location.back();
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
        this.location.back();
      });
    }
  }
}
