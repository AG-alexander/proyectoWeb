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
  list: TouristicCentre[];
  selected: string;

  constructor(public site: SiteService) {
    this.value = "";
   }

  searchSites() {
    this.showedList = [];
    if (this.selected) {
      this.list.forEach(item => {
        if (item.name.includes(this.selected)) {
          this.showedList.push(item);
        }
      });
    } else {
      this.showedList = this.list;
    }
    
  }
  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.showedList = this.list.slice(startItem,endItem);
  }
  ngOnInit() {
    this.showedList = [];
    this.list = [];
    this.blockUI.start("Cargando datos...!!!");
    this.site.getTouristicCentre().subscribe(
      res => {
        this.blockUI.stop();
        this.list = res;
        this.showedList = this.list.slice(0,3);
      }, 
      err => {
        this.blockUI.stop();
        this.showedList = [];
      }
    );
  }

}
