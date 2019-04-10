import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  basico: boolean;
  dueño: boolean;
  admin: boolean;

  constructor(private _user: UserService) {
    this.admin = false;
    this.dueño = false;
    this.basico = false;
    this.setPermission();
  }

  setPermission() {
    let user = this._user.getUser();
    if (user) {
      switch (user.rol) {
        case "admin": this.admin = true; this.dueño = true; this.basico = true;
          break;
        case "dueño": this.dueño = true; this.basico = true;
          break;
        case "basico": this.basico = true;
          break;
        default:
          break;
      }
    }
  }
}
