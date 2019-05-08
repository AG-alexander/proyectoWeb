import { Component, OnInit } from '@angular/core';
import { SiteService, UserService } from 'src/app/services/index';
import { TouristicCentre, User } from 'src/app/interfaces/index';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-maintenance-touristic-profile-list',
  templateUrl: './maintenance-touristic-profile-list.component.html',
  styleUrls: ['./maintenance-touristic-profile-list.component.css']
})
export class MaintenanceTouristicProfileListComponent implements OnInit {

  tourList: TouristicCentre[];
  user: User;
  constructor(
    private siteService: SiteService,
    private userService: UserService,
    private router: Router,
    private permission: PermissionService
    ) { }

  getSites() {
    if (this.permission.duenno){
      this.tourList = this.siteService.getSiteByEditor(this.user.idUser);
    }else {
      if (this.permission.admin) {
        this.tourList = this.siteService.getSites();
      }
    }
    
  }

  addTourProfile() {
    this.router.navigate(['dashboard/mainte-tour-set']);
  }

  updateTourProfile(id: number) {
    this.router.navigate([`dashboard/mainte-tour-up/${id}`]);
  }

  deleteTourProfile(id: number) {
    this.siteService.deleteTourProfile(id);
    this.getSites();
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.getSites();
  }

}
