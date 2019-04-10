import { Injectable } from '@angular/core';
import sites from '../../assets/data/touristic-centres.json';
import {TouristicCentre} from '../interfaces/index';
import {} from '../services/index';
import { DataStorageService } from './data-storage.service.js';
import { constant } from 'src/app/constant-data/constant';
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  showedSites: TouristicCentre[];
  constructor(public _dataStorage: DataStorageService) {
    this.showedSites = [];
   }

  getSite(name: string) {
    let temp_list = this._dataStorage.getObjectValue(constant.SITES) as TouristicCentre [];
    if (!name) {
      this.showedSites = temp_list;
    }
    else {
      name = name.toLowerCase();
      this.showedSites = [];
      temp_list.forEach((site) => {
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
      list = this._dataStorage.getObjectValue(constant.SITES);
      aux = list.find(item => item.idTouristicCentre == id);
      return aux;
    }
    return null;
  }

  getSiteByEditor(id: number): TouristicCentre[] {
    if (id) {
      let list: TouristicCentre[];
      let aux: TouristicCentre[];
      list = this._dataStorage.getObjectValue(constant.SITES);
      aux = list.filter(item => item.idEditor == id);
      return aux;
    }
    return null;
  }

  isEditorOfSite(id: number, idEditor: number): boolean {
    if (id) {
      let list: TouristicCentre[];
      let aux: number;
      list = this._dataStorage.getObjectValue(constant.SITES);
      aux = list.findIndex(item => item.idTouristicCentre == id && item.idEditor == idEditor);
      return aux > -1;
    }
    return false;
  }

  getSites(): TouristicCentre [] {
    return this._dataStorage.getObjectValue(constant.SITES) as TouristicCentre [];
  }

  saveTourProfile(tour: TouristicCentre) {
    let index: number = -1;
    let tour_list = this._dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
    let last_id = this._dataStorage.getObjectValue(constant.IDTOUR) as number;
    tour_list.forEach((item, index_list)=>{
      if (item.idTouristicCentre == tour.idTouristicCentre) {
        index = index_list;
      }
    });
    if (index >= 0) {
      tour_list[index] = tour;
    } else {
      tour.idTouristicCentre = last_id + 1;
      tour_list.push(tour);
    }

    this._dataStorage.setObjectValue(constant.SITES, tour_list);
    this._dataStorage.setObjectValue(constant.IDTOUR, last_id + 1);
  }

  saveTourProfiles(tour_list: TouristicCentre[]) {
    this._dataStorage.setObjectValue(constant.SITES, tour_list);
  }

  deleteTourProfile(id: number) {
    let tour_list = this._dataStorage.getObjectValue(constant.SITES) as TouristicCentre[];
    let indix = tour_list.findIndex(item => item.idTouristicCentre == id);
    tour_list.splice(indix, 1);
    this._dataStorage.setObjectValue(constant.SITES, tour_list);
    return true;
  }
}
