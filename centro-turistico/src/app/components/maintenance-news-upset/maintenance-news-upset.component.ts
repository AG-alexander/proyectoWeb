import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/interfaces/index';
import { NewsService } from 'src/app/services';

@Component({
  selector: 'app-maintenance-news-upset',
  templateUrl: './maintenance-news-upset.component.html',
  styleUrls: ['./maintenance-news-upset.component.css']
})
export class MaintenanceNewsUpsetComponent implements OnInit {
  
  id: number;
  imageSrc: any;
  imagePath: string;
  formGroup: FormGroup
  newsLocalStorage: News;
  constructor(private FB: FormBuilder, private _activated: ActivatedRoute, private _newsService: NewsService) { }
  
  onFileSelected(event: any) {
    var reader = new FileReader();
    this.imagePath = event.files;
    reader.readAsDataURL(event.files[0]);
    reader.onload = (_event) => { 
      this.imageSrc = reader.result; 
    }
  }

  initForm() {
    this.formGroup = this.FB.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['']
    });
  }

  loadForm() {
    this.newsLocalStorage = this._newsService.getNewsById(this.id);
    this.imageSrc = this.newsLocalStorage.image;
    this.formGroup = this.FB.group({
      title: [this.newsLocalStorage.title, Validators.required],
      content: [this.newsLocalStorage.content, Validators.required],
      image: ['']
    });
  }
  initPage() {
    this.id = +this._activated.snapshot.params['id'];
    if (this.id > 0) {
      this.loadForm();
    } else {
      this.initForm();
    }
  }
  saveNews() {
    let news = this.formGroup.value as News;
    if (this.id > 0) {
      news.idNews = this.newsLocalStorage.idNews;
      news.date = this.newsLocalStorage.date;
    } else {
      news.date = new Date();
    }
    news.image = this.imageSrc;
    this._newsService.saveNew(news);
  }
  get FG() {
    return this.formGroup.controls;
  }
  
  get imgValid() {
    return this.imageSrc;
  }
  ngOnInit() {
    this.initPage();
  }

}
