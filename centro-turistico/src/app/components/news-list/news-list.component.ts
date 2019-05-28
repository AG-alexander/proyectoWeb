import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/index';
import { News } from 'src/app/interfaces/index';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  news: News[];
  ref: AngularFireStorageReference;
  images: string[];
  constructor(
    private newService: NewsService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.images = [];
    this.news = this.newService.getNews();
    this.blockUI.start("Obteniendo noticias...!!!");
    this.newService.getNoticias().subscribe(
      res => {
        this.blockUI.stop();
        this.news = res;
      }
    );
  }
}
