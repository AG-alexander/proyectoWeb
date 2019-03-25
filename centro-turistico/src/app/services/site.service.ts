import { Injectable } from '@angular/core';
import sites from '../../assets/data/touristic-centres.json';
import {TouristicCentre} from '../interfaces/index';
import {} from '../services/index';
import { DataStorageService } from './data-storage.service.js';
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  sites: TouristicCentre[] = sites;
  showedSites: TouristicCentre[];
  constructor(private _dataStorage: DataStorageService) {
    this.showedSites = [];
   }

  getSite(name: string) {
    if (!name) {
      this.showedSites = Object.assign([],this.sites);
    }
    else {
      name = name.toLowerCase();
      this.showedSites = [];
      this.sites.forEach((site) => {
        if (site.name.toLowerCase().includes(name)) {
          this.showedSites.push(site);
        }
      });
    }
  }

  
}
