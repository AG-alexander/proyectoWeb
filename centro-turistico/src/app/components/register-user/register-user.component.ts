import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, AlertService, LoginService } from 'src/app/services';
import { User, Images } from 'src/app/interfaces/index';
import { Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { bloomAdd } from '@angular/core/src/render3/di';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  formGroup: FormGroup;
  imgUser: string;
  imagePath: string;
  constructor(
    private fB: FormBuilder,
     private userService: UserService,
     private alertService: AlertService,
     private log: LoginService,
     private fbStorage: FirebaseStorageService,
     private storage: AngularFireStorage,
     private angularFirestore: AngularFirestore,
     private router: Router) { }

  initForm() {
    this.formGroup = this.fB.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      descripcion: ['', Validators.required],
      iconno: ['']
    });
  }
  onFileSelected(event: any) {
    var reader = new FileReader();
    this.imagePath = event.files;
    reader.readAsDataURL(event.files[0]);
    reader.onload = (event) => {
      this.imgUser = reader.result.toString();
    }
  }
  onSubmit(){
    let user: User;
    user = this.formGroup.value as User;
    user.rol = 'basico';
    this.fbStorage.upload(this.imagePath);
    this.blockUI.start(" Registrando usuario...!!!");
    this.fbStorage.task.then(()=>{
      this.storage.ref(this.fbStorage.id).getDownloadURL().subscribe(res => {
        this.blockUI.stop();
        let img: Images = {
          idFireBase: this.angularFirestore.createId(),
          idStorage: this.fbStorage.id,
          url: res
        };
        user.iconno = img;
        this.log.register(user, user.password);
      });
     });
  }
  get Valided() {
    return this.formGroup.invalid || this.imgUser == "";
  }
  get fG() {
    return this.formGroup.controls;
  }
  ngOnInit() {
    this.imgUser = "";
    this.initForm();
  }

}
