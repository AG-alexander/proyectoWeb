import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/index';
import { News } from 'src/app/interfaces/index';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news: News[];
  ref: AngularFireStorageReference;
  images: string[];
  constructor(
    private newService: NewsService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.images = [];
    this.news = this.newService.getNews();
    this.newService.getNoticias().subscribe(
      res => {
        this.news = res;
      }
    );
  }
}
