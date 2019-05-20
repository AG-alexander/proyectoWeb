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
  currentPage = 1;
  page: number;
  showedList: TouristicCentre[];
  selected: string;

  constructor(private site: SiteService) {
    this.value = "";
   }

  searchSites() {
    this.site.getSite(this.selected);
    this.showedList = this.site.showedSites;
    
  }
  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.showedList = this.site.showedSites.slice(startItem,endItem);
  }
  ngOnInit() {
    this.site.getSite(this.value);
   if(this.site.showedSites != null) {
    this.showedList = this.site.showedSites.slice(0,3);
   } else {
    this.site.showedSites = [];
     this.showedList = [];
   }
    // this.showedList.forEach( x =>{
      
    //   this.typebyhead.push(x.name);
    //   })
    //this._site._dataStorage.setObjectValue('sites',this._site.sites);
    //console.log(this._site.getObjectValue('sites'));
  }

}
