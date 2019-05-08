import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { News } from '../interfaces/index';
import { constant } from '../constant-data/constant';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private dataStorage: DataStorageService) { }

  getNews(): News[] {
    return this.dataStorage.getObjectValue(constant.NEWS) as News[];
  }

  getNewsById(id: number): News {
    return (this.dataStorage.getObjectValue(constant.NEWS) as News[]).find(n => n.idNews == id);
  }

  saveNew(news: News) {
    let index: number = -1;
    let newsList = this.dataStorage.getObjectValue(constant.NEWS) as News[];
    let lastId = this.dataStorage.getObjectValue(constant.IDNEWS) as number;
    newsList.forEach((item, indexList)=>{
      if (item.idNews == news.idNews) {
        index = indexList;
      }
    });
    if (index >= 0) {
      newsList[index] = news;
    } else {
      news.idNews = lastId + 1;
      newsList.push(news);
    }

    this.dataStorage.setObjectValue(constant.NEWS, newsList);
    this.dataStorage.setObjectValue(constant.IDNEWS, lastId + 1);
  }
  deleteNew(id: number): boolean {
    let newsList = this.dataStorage.getObjectValue(constant.NEWS) as News[];
    let indix = newsList.findIndex(item => item.idNews == id);
    newsList.splice(indix, 1);
    this.dataStorage.setObjectValue(constant.NEWS, newsList);
    return true;
  }
}
