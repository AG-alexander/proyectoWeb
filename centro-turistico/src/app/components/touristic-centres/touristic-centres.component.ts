import { Component, OnInit } from '@angular/core';
import { TouristicCentre } from '../../interfaces/index';
import { SiteService } from '../../services/index';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
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
  typebyhead: string[] = [];

  constructor(private _site: SiteService,
    private _thm: TypeaheadModule) {
    this.value = "";
   }

  searchSites() {
    this._site.getSite(this.selected);
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
    // this.showedList.forEach( x =>{
      
    //   this.typebyhead.push(x.name);
    //   })
    //this._site._dataStorage.setObjectValue('sites',this._site.sites);
    //console.log(this._site.getObjectValue('sites'));
  }

}
