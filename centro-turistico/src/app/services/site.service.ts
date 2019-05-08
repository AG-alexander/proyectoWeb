import { Injectable } from '@angular/core';
import {TouristicCentre} from '../interfaces/index';
import {} from '../services/index';
import { DataStorageService } from './data-storage.service.js';
import { constant } from 'src/app/constant-data/constant';
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  showedSites: TouristicCentre[];
  constructor(public dataStorage: DataStorageService) {
    this.showedSites = [];
   }

  getSite(name: string) {
    let tempList = this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre [];
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
      aux = list.filter(item => item.idEditor == id);
      return aux;
    }
    return null;
  }

  isEditorOfSite(id: number, idEditor: number): boolean {
    if (id) {
      let list: TouristicCentre[];
      let aux: number;
      list = this.dataStorage.getObjectValue(constant.SITES);
      aux = list.findIndex(item => item.idTouristicCentre == id && item.idEditor == idEditor);
      return aux > -1;
    }
    return false;
  }

  getSites(): TouristicCentre [] {
    return this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre [];
  }

  saveTourProfile(tour: TouristicCentre) {
    let index: number = -1;
    let tourList = this.dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
    let lastid = this.dataStorage.getObjectValue(constant.IDTOUR) as number;
    tourList.forEach((item, indexList)=>{
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
}
