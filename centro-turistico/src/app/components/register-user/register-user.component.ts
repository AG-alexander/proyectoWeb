import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, AlertService, LoginService } from 'src/app/services';
import { User } from 'src/app/interfaces/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formGroup: FormGroup;
  imgUser: string;
  imagePath: string;
  constructor(
    private fB: FormBuilder,
     private userService: UserService,
     private alertService: AlertService,
     private log: LoginService,
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
    user.iconno = this.imgUser;
    this.log.register(user, user.password);
    //this.router.navigate(['login']);
   // this.alertService.successInfoAlert("Usuario creado correramente");
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
