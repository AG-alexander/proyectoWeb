import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TouristicCentre } from 'src/app/interfaces/index';
import { SiteService } from 'src/app/services/index';

@Component({
  selector: 'app-maintenance-touristic-profile-up-set',
  templateUrl: './maintenance-touristic-profile-up-set.component.html',
  styleUrls: ['./maintenance-touristic-profile-up-set.component.css']
})
export class MaintenanceTouristicProfileUpSetComponent implements OnInit {

  id: number;
  imageSrc: any;
  imagePath: string;
  img_list: string[];
  formGroup: FormGroup
  tourLoscalStorage: TouristicCentre;
  schedules_list: string[];

  constructor(private FB: FormBuilder, private _siteService: SiteService, private _activated: ActivatedRoute) { }

  onFileSelected(event: any) {
    var reader = new FileReader();
    this.imagePath = event.files;
    reader.readAsDataURL(event.files[0]);
    reader.onload = (_event) => {
      this.img_list.push(reader.result.toString());
    }
  }
  initForm() {
    this.formGroup = this.FB.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      schedules: [''],
      video: ['', Validators.required],
    });
  }

  loadForm() {
    this.tourLoscalStorage = this._siteService.getSiteById(this.id);
    this.img_list = this.tourLoscalStorage.photos;
    this.schedules_list = this.tourLoscalStorage.schedules;
    this.formGroup = this.FB.group({
      name: [this.tourLoscalStorage.name, Validators.required],
      description: [this.tourLoscalStorage.description, Validators.required],
      schedules: [''],
      video: ['', Validators.required],
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
  saveTourProfile() {
    let tourProfile = this.formGroup.value as TouristicCentre;
    if (this.id > 0) {
      tourProfile.idTouristicCentre = this.tourLoscalStorage.idTouristicCentre;
    } else {
      tourProfile.idTouristicCentre = 0;
      tourProfile.idEditor = 0;
    }
    tourProfile.photos = this.img_list;
    this._siteService.saveTourProfile(tourProfile);
  }

  addSchedule() {
    let data: string = this.formGroup.controls['schedules'].value;
    data = data.trim();
    if (data.length > 0) {
      this.schedules_list.push(data);
      this.formGroup.controls['schedules'].setValue('');
    }
  }

  deleteSchedule(index: number) {
    this.schedules_list.splice(index, 1);
  }
  get FG() {
    return this.formGroup.controls;
  }

  ngOnInit() {
    this.img_list = [];
    this.initPage();
  }

}
