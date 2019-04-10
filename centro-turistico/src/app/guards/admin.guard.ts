import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService, UserService, SiteService } from '../services/index';
import { User } from '../interfaces/index';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate{
  path: ActivatedRouteSnapshot[];  
  route: ActivatedRouteSnapshot;
  user: User;
  constructor(
    private _router: Router, 
    private _loginService: LoginService,
    private _userService: UserService,
    private _siteService: SiteService, 
    private _location: Location, 
    private _activated: ActivatedRoute
    ){
      this.user = this._userService.getUser();
    }
  canActivate(){
    if (!(this.user.rol == "admin")) {
      this._router.navigate([this._location.path]);
      return false;
    }
    return true;
  }
}
