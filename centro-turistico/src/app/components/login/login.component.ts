import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgLogin: FormGroup;
  flagInvalidUser: boolean;
  flagMessage: boolean;
  constructor(private fB: FormBuilder, private router: Router, private loginService: LoginService) { }

  initForm(){
    this.fgLogin = this.fB.group({
      usuario: ['',[Validators.required]],
      password: ['',[Validators.required]], 
    });
  }

  get fG() {
    return this.fgLogin.controls;
  }

  onSubmit() {
    if (this.fgLogin.valid) {
      this.flagMessage = true;
      if (this.loginService.getUser(this.fgLogin.controls['usuario'].value,
       this.fgLogin.controls['password'].value)) {
        this.router.navigate(['dashboard/']);
      }else {
        this.flagInvalidUser = true;
        this.flagMessage = false;
      }
    }
  }
  userSing() {
    this.router.navigate(['register']);
  }
  ngOnInit() {
    this.flagInvalidUser = false;
    this.initForm();
  }


}
