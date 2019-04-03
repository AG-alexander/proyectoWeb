import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];  
  route: ActivatedRouteSnapshot;

  constructor(private _router: Router, private _loginService: LoginService){}
  
  canActivate(){
    if (!this._loginService.isLogged()) {
      this._router.navigate(['/login']);
      alert("No estás logueado");
      return false;

    }
    return false;
  }
}
