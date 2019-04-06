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
}
