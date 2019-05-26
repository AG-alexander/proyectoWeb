import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SiteInformationComponent } from './components/site-information/site-information.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MaintenanceNewsListComponent } from './components/maintenance-news-list/maintenance-news-list.component';
import { MaintenanceNewsUpsetComponent } from './components/maintenance-news-upset/maintenance-news-upset.component';
import { ServicesComponent } from './components/services/services.component';
import { MaintenanceTouristicProfileUpSetComponent } from './components/maintenance-touristic-profile-up-set/maintenance-touristic-profile-up-set.component';
import { MaintenanceTouristicProfileListComponent } from './components/maintenance-touristic-profile-list/maintenance-touristic-profile-list.component';
import { MaintenanceEditorsComponent } from './components/maintenance-editors/maintenance-editors.component';
import { AuthGuard } from './guards/auth.guard'; 
import { AdminGuard } from './guards/admin.guard';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'site/:id', component: SiteInformationComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'mainte-news-list', component: MaintenanceNewsListComponent, canActivate: [AuthGuard, AdminGuard ], data: {roles:['duenno', 'admin']} },
      { path: 'mainte-news-up/:id', component: MaintenanceNewsUpsetComponent, canActivate: [AuthGuard, AdminGuard ], data: {roles:['duenno', 'admin']} },
      { path: 'mainte-news-set', component: MaintenanceNewsUpsetComponent, canActivate: [AuthGuard, AdminGuard ], data: {roles:['duenno', 'admin']} },
      { path: 'mainte-tour-list', component: MaintenanceTouristicProfileListComponent, canActivate: [AdminGuard], data: {roles:['duenno', 'admin']} },
      { path: 'mainte-tour-set', component: MaintenanceTouristicProfileUpSetComponent, canActivate: [AuthGuard, AdminGuard ], data: {roles:['duenno', 'admin']} }, 
      { path: 'mainte-editor', component: MaintenanceEditorsComponent, canActivate: [AuthGuard, AdminGuard ], data: {roles:['duenno', 'admin']} },
      { path: 'mainte-tour-up/:id', component: MaintenanceTouristicProfileUpSetComponent, canActivate: [AuthGuard, AdminGuard ], data: {roles:['duenno', 'admin']} },
      { path: '', pathMatch: 'full', redirectTo: 'home' }

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
