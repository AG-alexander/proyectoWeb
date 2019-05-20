import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/index';
import { News } from 'src/app/interfaces/index';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news: News[];
  constructor(private newService: NewsService) { }

  ngOnInit() {
    this.news = this.newService.getNews();
    this.newService.getNoticias().subscribe(
      res => {
        this.news = res;
      }
    );
  }
}
