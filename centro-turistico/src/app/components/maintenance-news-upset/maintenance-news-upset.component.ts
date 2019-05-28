import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { News, Images } from 'src/app/interfaces/index';
import { NewsService, AlertService } from 'src/app/services/index';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-maintenance-news-upset',
  templateUrl: './maintenance-news-upset.component.html',
  styleUrls: ['./maintenance-news-upset.component.css']
})
export class MaintenanceNewsUpsetComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  id: string;
  imageSrc: any;
  imagePath: string;
  formGroup: FormGroup
  newsLocalStorage: News;
  ref: AngularFireStorageReference;
  profileUrl: Observable<string>;

  constructor(
    private fB: FormBuilder,
    private activated: ActivatedRoute, 
    private newsService: NewsService,
    private alert: AlertService, 
    private router: Router,
    private fbStorage: FirebaseStorageService,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore) {

  }

  onFileSelected(event: any) {
    var reader = new FileReader();
    this.imagePath = event.files;
    reader.readAsDataURL(event.files[0]);
    reader.onload = (event) => {
      this.imageSrc = reader.result;
    }
  }

  initForm() {
    this.formGroup = this.fB.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  loadForm() {
    this.initForm();
    this.blockUI.start("Cargando datos...!!!");
    this.newsService.getNoticiaById(this.id).subscribe(
      res => {
        this.newsLocalStorage = res[0];
        this.imageSrc = this.newsLocalStorage.image;
        this.ref = this.storage.ref(this.newsLocalStorage.image.idStorage);
        this.ref.getDownloadURL().subscribe(
          res => {
            this.imageSrc = res;
          }
        );
        this.blockUI.stop();
        this.formGroup.patchValue({
          title: this.newsLocalStorage.title,
          content: this.newsLocalStorage.content,
        });
      }
    );

  }
  initPage() {
    this.id = this.activated.snapshot.params['id'];
    if (this.id != undefined) {
      this.loadForm();
    } else {
      this.initForm();
    }
  }
  saveNews() {
    let news = this.formGroup.value as News;
    if (this.id != undefined) {
      news.idNews = this.newsLocalStorage.idNews;
      news.date = this.newsLocalStorage.date;
    } else {
      news.date = new Date();
    }
   
    this.newsService.saveNew(news);
    this.alert.successInfoAlert('Creado el sitio correctamente');
    this.router.navigate(['dashboard/mainte-news-list']);

  }
  get fG() {
    return this.formGroup.controls;
  }

  get imgValid() {
    return this.imageSrc;
  }

  saveNoticia() {
    console.log(0);
    let news = this.formGroup.value as News;
    if (this.id != undefined) {
     
      news.date = this.newsLocalStorage.date;
      news.id = this.id;
      this.fbStorage.update(this.imagePath, this.newsLocalStorage.image.idStorage);
    } else {
      news.date = new Date();
      this.fbStorage.upload(this.imagePath);
    }
    news.idNews = 0;
    this.blockUI.start("Guardando datos...!!!");
   this.fbStorage.task.then(()=>{
    this.storage.ref(this.fbStorage.id).getDownloadURL().subscribe(res => {
      let img: Images = {
        idFireBase: this.angularFirestore.createId(),
        idStorage: this.fbStorage.id,
        url: res
       
      };
      this.blockUI.stop();
      news.image = img;
      this.newsService.saveNews(news);
    });
   });
   
  }

  ngOnInit() {
    this.initPage();
    console.log(0);
  }

}
