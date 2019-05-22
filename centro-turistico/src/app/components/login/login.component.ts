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
      // if ( this.loginService.getUser(this.fgLogin.controls['usuario'].value,
      // this.fgLogin.controls['password'].value)) {
      //   this.router.navigate(['dashboard/']);
      // } else {
      //   this.flagInvalidUser = true;
      //   this.flagMessage = false;
      // }
    }
  }
  userSing() {
    this.router.navigate(['register']);
  }

  signinWithGoogle(): void {
    this.loginService.loginWithGoogle();
  }

  

  // public signinWitlhGoogle() {
  //   let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

  //   this.authService.signIn(socialPlatformProvider)
  //     .then((userData) => {
  //       console.log(userData)
  //       //on success
  //       //this will return user data from google. What you need is a user token which you will send it to the server
  //       //this.sendToRestApiMethod(userData.idToken);
  //     });
  // }

  // sendToRestApiMethod(token: string): void {
  //   this.http.post("url to google login in your rest api",
  //     {
  //       token: token
  //     }
  //   ).subscribe(
  //     onSuccess => {
  //       //login was successful
  //       //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
  //     }, onFail => {
  //       //login was unsuccessful
  //       //show an error message
  //     }
  //   );
  // }
  ngOnInit() {
    this.flagInvalidUser = false;
    this.initForm();
  }




}
