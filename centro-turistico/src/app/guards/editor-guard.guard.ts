import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService, SiteService } from '../services/index';
import { User } from '../interfaces/index';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EditorGuardGuard implements  CanActivate{
  path: ActivatedRouteSnapshot[];  
  route: ActivatedRouteSnapshot;
  state: RouterStateSnapshot
  user: User;
  constructor(
    private router: Router, 
    private userService: UserService,
    private siteService: SiteService, 
    private location: Location, 
    ){
      this.user = this.userService.getUser();
      this.state = this.router.routerState.snapshot;
      
    }
  
  canActivate(path: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log(path)
    if (this.user.rol.includes(path.data.roles[0]) || this.user.rol.includes(path.data.roles[1])) {
      //this.router.navigate([this.location.path]);
      if (path.url.toString().includes("mainte-tour-up")) {debugger
        let id = +(state as unknown as ActivatedRouteSnapshot).params['id'];
        if (!this.siteService.isEditorOfSite(id, this.user.idUser)) {
        this.location.back();
         return false;
        }
      }
      return true;
    }
    return false;
  }
    
  
}
