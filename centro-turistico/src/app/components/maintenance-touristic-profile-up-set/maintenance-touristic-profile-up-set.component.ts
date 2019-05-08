import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { SiteService, AlertService, UserService} from 'src/app/services/index';
import { Location } from '@angular/common';

@Component({
  selector: 'app-maintenance-touristic-profile-up-set',
  templateUrl: './maintenance-touristic-profile-up-set.component.html',
  styleUrls: ['./maintenance-touristic-profile-up-set.component.css']
})
export class MaintenanceTouristicProfileUpSetComponent implements OnInit {

  id: number;
  imageSrc: any;
  imagePath: string;
  imgList: string[];
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
    private location: Location) { }

  onFileSelected(event: any) {
    var reader = new FileReader();
    this.imagePath = event.files;
    reader.readAsDataURL(event.files[0]);
    reader.onload = (event) => {
      this.imgList.push(reader.result.toString());
    }
  }
  initForm() {
    this.imgList = [];
    this.schedulesList = [];
    this.formGroup = this.FB.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      schedules: [''],
      video: ['', Validators.required],
    });
  }

  loadForm() {
    this.tourLoscalStorage = this.siteService.getSiteById(this.id);
    this.imgList = this.tourLoscalStorage.photos;
    this.schedulesList = this.tourLoscalStorage.schedules;
    this.formGroup = this.FB.group({
      name: [this.tourLoscalStorage.name, Validators.required],
      description: [this.tourLoscalStorage.description, Validators.required],
      schedules: [''],
      video: [this.tourLoscalStorage.video, Validators.required],
    });
  }
  initPage() {
    this.id = +this.activated.snapshot.params['id'];
    if (this.id > 0) {
      this.loadForm();
    } else {
      this.initForm();
    }
  }
  saveTourProfile() {
    let tourProfile = this.formGroup.value as TouristicCentre;
    if (this.id > 0) {
      tourProfile.idTouristicCentre = this.tourLoscalStorage.idTouristicCentre;
    } else {
      tourProfile.idTouristicCentre = 0;
      tourProfile.idEditor = 0;
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
    //this._alertService.successInfoAlert("Perfil Turistico eliminado correctamente");
  }
  get fG() {
    return this.formGroup.controls;
  }

  get Validated() {
    return this.formGroup.valid 
    && this.schedulesList.length > 0 
    && this.imgList.length > 0;
  }

  ngOnInit() {
    this.imgList = [];
    this.initPage();
  }

}
