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
  constructor(private Fb: FormBuilder, private _router: Router, private _loginService: LoginService) { }

  initForm(){
    this.fgLogin = this.Fb.group({
      usuario: ['',[Validators.required]],
      password: ['',[Validators.required]], 
    });
  }

  get FG() {
    return this.fgLogin.controls;
  }

  onSubmit() {
    if (this.fgLogin.valid) {
      this.flagMessage = true;
      if (this._loginService.getUser(this.fgLogin.controls['usuario'].value,
       this.fgLogin.controls['password'].value)) {
        this._router.navigate(['dashboard/']);
      }else {
        this.flagInvalidUser = true;
        this.flagMessage = false;
      }
    }
  }
  sing() {
    this._router.navigate(['register']);
  }
  ngOnInit() {
    this.flagInvalidUser = false;
    this.initForm();
  }


}
