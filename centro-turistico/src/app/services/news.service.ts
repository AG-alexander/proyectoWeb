import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { News } from '../interfaces/index';
import { constant } from '../constant-data/constant';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private _dataStorage: DataStorageService) { }

  getNews(): News[] {
    return this._dataStorage.getObjectValue(constant.NEWS) as News[];
  }

  saveNew(news: News) {
    let id: number = 0;
    let news_list = this._dataStorage.getObjectValue(constant.NEWS) as News[];

    news_list.forEach((item)=>{
      if (item.idNews == news.idNews) {
        id = item.idNews;
      }
    });

    if (id > 0) {
      news_list[id] = news;
    } else {
      news_list.push(news);
    }

    this._dataStorage.setObjectValue(constant.NEWS, news_list);
  }
}
