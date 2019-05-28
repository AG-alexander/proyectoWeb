import { Component, OnInit } from '@angular/core';
import { SiteService, UserService } from 'src/app/services/index';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-maintenance-touristic-profile-list',
  templateUrl: './maintenance-touristic-profile-list.component.html',
  styleUrls: ['./maintenance-touristic-profile-list.component.css']
})
export class MaintenanceTouristicProfileListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  tourList: TouristicCentre[];
  user: User;
  constructor(
    private siteService: SiteService,
    private userService: UserService,
    private router: Router,
    public permission: PermissionService
    ) { }

  getSites() {
    if (this.permission.duenno){
      this.blockUI.start("Obteniendo datos...!!!");
      this.siteService.getTouristicCentreByEdidtor(this.user.id).subscribe(
        res => {
          this.tourList = res;
          this.blockUI.stop();
        }
      );
    }else {
      if (this.permission.admin) {
      this.blockUI.start("Obteniendo datos...!!!");
        this.siteService.getTouristicCentre().subscribe(
          res => {
            this.blockUI.stop();
            this.tourList = res;
          }
        );
      }
    }
  }

  isEditor(id: string) {
    return id == this.user.id;
  }

  addTourProfile() {
    this.router.navigate(['dashboard/mainte-tour-set']);
  }

  updateTourProfile(id: number) {
    this.router.navigate([`dashboard/mainte-tour-up/${id}`]);
  }

  deleteTourProfile(id: string) {
    this.siteService.deleteTouristicCentre(id);
    this.getSites();
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.getSites();
  }

}
