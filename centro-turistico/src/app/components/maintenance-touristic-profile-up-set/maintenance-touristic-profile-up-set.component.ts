import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TouristicCentre, User, Images } from 'src/app/interfaces/index';
import { SiteService, AlertService, UserService } from 'src/app/services/index';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-maintenance-touristic-profile-up-set',
  templateUrl: './maintenance-touristic-profile-up-set.component.html',
  styleUrls: ['./maintenance-touristic-profile-up-set.component.css']
})

export class MaintenanceTouristicProfileUpSetComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  id: string;
  imageSrc: any;
  imagePath: string;
  imgShowedList: string[];
  imgList: Images[];
  formGroup: FormGroup
  tourLoscalStorage: TouristicCentre;
  schedulesList: string[];
  user: User;

  constructor(
    private FB: FormBuilder,
    private siteService: SiteService,
    private activated: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private location: Location,
    private storage: AngularFireStorage,
    private fbStorage: FirebaseStorageService,
    private angularFirestore: AngularFirestore) { }

  onFileSelected(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onload = (event) => {
      this.imgShowedList.push(reader.result.toString());
    }
    this.imagePath = event.files;
    this.imgList.push({
      idFireBase: undefined,
      idStorage: undefined,
      url: this.imagePath
    });
  }

  initForm() {
    this.imgList = [];
    this.imgShowedList = [];
    this.schedulesList = [];
    this.formGroup = this.FB.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      schedules: [''],
      video: ['', Validators.required],
    });
  }

  loadForm() {
    this.imgShowedList = [];
    this.siteService.getTouristicCentreById(this.id).subscribe(
      res => {
        this.tourLoscalStorage = res[0];
        this.imgList = this.tourLoscalStorage.photos;
        this.imgList.forEach(item => {
          this.imgShowedList.push(item.url);
        });
        this.schedulesList = this.tourLoscalStorage.schedules;
        this.formGroup.patchValue({
          name: this.tourLoscalStorage.name,
          description: this.tourLoscalStorage.description,
          schedules: [''],
          video: this.tourLoscalStorage.video,
        });
      }
    );
  }
  initPage() {
    this.id = this.activated.snapshot.params['id'];
    this.initForm();
    if (this.id != undefined) {
      this.loadForm();
    }
  }
  saveTourProfile() {
    let tourProfile = this.formGroup.value as TouristicCentre;
    if (this.id != undefined) {
      tourProfile.idTouristicCentre = this.tourLoscalStorage.idTouristicCentre;
    } else {
      tourProfile.idTouristicCentre = 0;
      tourProfile.idEditor = "";
    }
    tourProfile.schedules = this.schedulesList;
    tourProfile.photos = this.imgList;
    this.siteService.saveTourProfile(tourProfile);
    this.router.navigate(['dashboard/mainte-tour-list']);
    this.alertService.successInfoAlert("Perfil Turistico guardado correctamente");
  }

  addSchedule() {
    let data: string = this.formGroup.controls['schedules'].value;
    data = data.trim();
    if (data.length > 0) {
      this.schedulesList.push(data);
      this.formGroup.controls['schedules'].setValue('');
    }
  }

  deleteSchedule(index: number) {
    this.schedulesList.splice(index, 1);
  }
  get fG() {
    return this.formGroup.controls;
  }

  get Validated() {
    return this.formGroup.valid
      && this.schedulesList.length > 0
      && this.imgList.length > 0;
  }
  saveImage(index: number) {
    if (index >= 0) {
      this.blockUI.start("Guardando datos....");
      if (!this.imgList[index].idFireBase) {
        this.fbStorage.upload(this.imgList[index].url);
      }
      this.fbStorage.task.then(() => {
        this.fbStorage.ref.getDownloadURL().subscribe(
          res => {
            this.blockUI.stop();
            if (!this.imgList[index].idFireBase) {
              this.imgList[index].idStorage = this.fbStorage.id;
              this.imgList[index].url = res;
              this.imgList[index].idFireBase = this.angularFirestore.createId();
            }
            this.saveImage(index - 1);
          }
        );
      });
    } else {
      this.saveSitio();
    }
  }
  save() {
    this.saveImage(this.imgList.length - 1);
  }
  saveSitio() {
    let tourProfile = this.formGroup.value as TouristicCentre;
    if (this.id != undefined) {
      tourProfile.id = this.tourLoscalStorage.id;
      tourProfile.idTouristicCentre = this.tourLoscalStorage.idTouristicCentre;
    } else {
      tourProfile.idTouristicCentre = 0;
      tourProfile.idEditor = "";
    }
    tourProfile.schedules = this.schedulesList;
    tourProfile.photos = this.imgList;

    this.siteService.saveTouristicCentre(tourProfile);
  }

  ngOnInit() {
    this.imgList = [];
    this.initPage();
  }

}
