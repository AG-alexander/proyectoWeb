import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../services/index';
import { News } from 'src/app/interfaces/index';
@Component({
  selector: 'app-maintenance-news-list',
  templateUrl: './maintenance-news-list.component.html',
  styleUrls: ['./maintenance-news-list.component.css']
})
export class MaintenanceNewsListComponent implements OnInit {

  news_list: News[];
  constructor(private _newsService: NewsService, private _router: Router) { }

  addNew(){
    this._router.navigate(['dashboard/mainte-news-set']);
  }

  updateNew(id: number){
    this._router.navigate(['dashboard/mainte-news-up', id]);
  }
  
  ngOnInit() {
    this.news_list = this._newsService.getNews();
  }

}