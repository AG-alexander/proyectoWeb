import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService, SiteService } from '../services/index';
import { User } from '../interfaces/index';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  user: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private siteService: SiteService,
    private location: Location,
  ) {
    this.user = this.userService.getUser();
  }
  canActivate(path: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(path)
    if (this.user) {
      let index = path.data.roles.findIndex(item => this.user.rol.includes(item));
      if (index > -1) {
      //   this.router.navigate([this.location.path]);
      //   if (path.url.toString().includes("mainte-tour-up")) {
      //     let id = +path.params['id'];
      //     if (!this.siteService.isEditorOfSite(id, this.user.idUser)) {
      //     this.location.back();
      //      return false;
      //     }
      //   }
         return true;
      }
    }this.location.back();
    return false;
  }
}
