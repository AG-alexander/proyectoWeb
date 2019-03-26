import { Component, OnInit } from '@angular/core';
import { TouristicCentre } from '../../interfaces/index';
import { SiteService } from '../../services/index';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-touristic-centres',
  templateUrl: './touristic-centres.component.html',
  styleUrls: ['./touristic-centres.component.css']
})
export class TouristicCentresComponent implements OnInit {

  value: string;
  currentPage = 2;
  page: number;
  showedList: TouristicCentre[];

  constructor(private _site: SiteService) {
    this.value = "";
   }

  searchSites(value: string) {
    this._site.getSite(value);
    this.showedList = this._site.showedSites;
  }
  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.showedList = this._site.showedSites.slice(startItem,endItem);
  }
  ngOnInit() {
    this._site.getSite(this.value);
    this.showedList = this._site.showedSites.slice(0,3);
    //this._site._dataStorage.setObjectValue('sites',this._site.sites);
    //console.log(this._site.getObjectValue('sites'));
  }

}
