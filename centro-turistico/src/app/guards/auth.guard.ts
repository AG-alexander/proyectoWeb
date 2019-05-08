import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoginService, UserService } from '../services/index';
import { User } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];  
  route: ActivatedRouteSnapshot;
  user: User;
  constructor(
    private router: Router, 
    private loginService: LoginService,
    private userService: UserService
    ){
      this.user = this.userService.getUser();
    }
  
  canActivate(){
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
      alert("No estás logueado");
      return false;

    }
    return true;
  }
}
