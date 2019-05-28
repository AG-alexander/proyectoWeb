import { Component, OnInit } from '@angular/core';
import { TouristicCentre } from '../../interfaces/index';
import { SiteService } from '../../services/index';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-touristic-centres',
  templateUrl: './touristic-centres.component.html',
  styleUrls: ['./touristic-centres.component.css']
})
export class TouristicCentresComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  value: string;
  currentPage = 1;
  page: number;
  showedList: TouristicCentre[];
  selected: string;

  constructor(public site: SiteService) {
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
    this.blockUI.start("Cargando datos...!!!");
    this.site.getTouristicCentre().subscribe(
      res => {
        this.blockUI.stop();
        this.showedList = res;
        this.showedList = this.showedList.slice(0,3);
      }, 
      err => {
        this.blockUI.stop();
        this.showedList = [];
      }
    );
  }

}
