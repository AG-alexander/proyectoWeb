import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router, ActivatedRoute, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService, UserService, SiteService } from '../services/index';
import { User } from '../interfaces/index';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EditorGuardGuard implements  CanActivate{
  path: ActivatedRouteSnapshot[];  
  route: ActivatedRouteSnapshot;
  _state: RouterStateSnapshot
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
      this._state = this._router.routerState.snapshot;
      
    }
  
  canActivate(state: RouterStateSnapshot, path: ActivatedRouteSnapshot){
    if ((this.user.rol == "dueño" || this.user.rol == "admin")) {
      //this._router.navigate([this._location.path]);
      if (path.url.toString().includes("mainte-tour-up")) {
        let id = +(state as unknown as ActivatedRouteSnapshot).params['id'];
        if (!this._siteService.isEditorOfSite(id, this.user.idUser)) {
        this._location.back();
         return false;
        }
      }
      return true;
    }
    return false;
  }
    
  
}
