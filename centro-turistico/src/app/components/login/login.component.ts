import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/index';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgLogin: FormGroup;
  flagInvalidUser: boolean;
  flagMessage: boolean;
  constructor(
    private fB: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    //private authService: AuthService,
    private http: HttpClient) { }

  initForm() {
    this.fgLogin = this.fB.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get fG() {
    return this.fgLogin.controls;
  }

  onSubmit() {
    if (this.fgLogin.valid) {
      this.flagMessage = true;
      this.loginService.login(this.fgLogin.controls['usuario'].value,
      this.fgLogin.controls['password'].value)
    }
  }
  userSing() {
    this.router.navigate(['register']);
  }

  signinWithGoogle(): void {
    this.loginService.loginWithGoogle();
  }

  signinWithFacebook(): void {
    this.loginService.loginWithFacebook();
  }
  ngOnInit() {
    this.flagInvalidUser = false;
    this.initForm();
    console.log(0);
  }




}
