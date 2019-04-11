import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  basico: boolean;
  duenno: boolean;
  admin: boolean;

  constructor(private _user: UserService) {
    this.setPermission();
  }

  setPermission() {
    this.admin = false;
    this.duenno = false;
    this.basico = false;
    let user = this._user.getUser();
    if (user) {
      switch (user.rol) {
        case "admin": this.admin = true; this.basico = true;
          break;
        case "duenno": this.duenno = true; this.basico = true;
          break;
        case "basico": this.basico = true;
          break;
        default:
          break;
      }
    }
  }
}
