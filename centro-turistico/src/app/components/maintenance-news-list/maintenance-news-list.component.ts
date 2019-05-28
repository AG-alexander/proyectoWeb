import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService, AlertService } from '../../services/index';
import { News } from 'src/app/interfaces/index';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-maintenance-news-list',
  templateUrl: './maintenance-news-list.component.html',
  styleUrls: ['./maintenance-news-list.component.css']
})
export class MaintenanceNewsListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  newsList: News[];
  constructor(private newsService: NewsService, private router: Router, 
  private alerts: AlertService) { }

  addNew(){
    this.router.navigate(['dashboard/mainte-news-set']);
  }

  updateNew(id: number){
    this.router.navigate(['dashboard/mainte-news-up', id]);
  }
  deleteNew(id: number) {
    this.newsService.deleteNew(id);
    this.newsList = this.newsService.getNews();
    this.alerts.successInfoAlert('Sitio eliminado Correctamente')
  }

  deleteNoticia(id: string) {
    this.newsService.deleteNoticias(id);
  }
  
  ngOnInit() {
    console.log(0);
    this.blockUI.start("Obteniendo datos");
    this.newsService.getNoticias().subscribe(
      res => {
        this.newsList = res;
        console.log(res);
      }
    );
  }

}
