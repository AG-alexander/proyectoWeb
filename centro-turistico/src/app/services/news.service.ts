import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { News } from '../interfaces/index';
import { constant } from '../constant-data/constant';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private dataStorage: DataStorageService, 
    public angularFirestore: AngularFirestore, 
    private alertas: AlertService, 
    private location: Location) { }

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
    newsList.forEach((item, indexList) => {
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
  //  FIREBASE
  getNoticias(): Observable<News[]> {
    return this.angularFirestore.collection<News>('noticias').valueChanges();
  }

  getNoticiaById(id: string): Observable<News[]> {
    return this.angularFirestore.collection<News>('noticias', ref => ref.where('id', '==', id)).valueChanges();
  }

  deleteNoticias(id: string) {
    this.angularFirestore.collection<News>('noticias').doc(id).delete().then(()=>{
      this.alertas.successInfoAlert("Eliminado correctamente");
    }).catch(()=>{
      this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveNews(news: News) {
    if (news.id) {
      this.angularFirestore.collection<News>('noticias').doc(news.id).update(news).then(()=>{
        this.alertas.successInfoAlert("Actualización exitosa");
        this.location.back();
      }).catch(()=>{
        this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });
     
    } else {
      news.id = this.angularFirestore.createId();
      this.angularFirestore.collection<News>('noticias').doc(news.id).set(news).then(()=>{
        this.alertas.successInfoAlert("Inserción exitosa");
        this.location.back();
      }).catch(()=>{
        this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
        this.location.back();
      });
    }
  }
}
