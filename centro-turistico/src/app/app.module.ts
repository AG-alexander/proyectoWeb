import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TouristicCentresComponent } from './components/touristic-centres/touristic-centres.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SiteInformationComponent } from './components/site-information/site-information.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { DomSecurityPipe } from './pipes/dom-security.pipe';
import { EmbedVideo } from 'ngx-embed-video';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SiteRatingComponent } from './components/site-rating/site-rating.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FollowersComponent } from './components/followers/followers.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MaintenanceNewsListComponent } from './components/maintenance-news-list/maintenance-news-list.component';
import { MaintenanceNewsUpsetComponent } from './components/maintenance-news-upset/maintenance-news-upset.component';
import { ServicesComponent } from './components/services/services.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MaintenanceTouristicProfileListComponent } from './components/maintenance-touristic-profile-list/maintenance-touristic-profile-list.component';
import { MaintenanceTouristicProfileUpSetComponent } from './components/maintenance-touristic-profile-up-set/maintenance-touristic-profile-up-set.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MaintenanceEditorsComponent } from './components/maintenance-editors/maintenance-editors.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginService, UserService, AlertService, PermissionService, ReviewsService, DataStorageService, FollowerService, NewsService, RatingService, SiteService } from '../app/services/index';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken} from '@angular/fire/firestore';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { ServiceWorkerModule } from '@angular/service-worker';
// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("450749556733-euth9ke14g8ahei3j0v85sqo61ko5hca.apps.googleusercontent.com")
//   },
//   // {
//   //   id: FacebookLoginProvider.PROVIDER_ID,
//   //   provider: new FacebookLoginProvider("Facebook-App-Id")
//   // }
// ]);

// export function provideConfig() {
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    NewsListComponent,
    AboutUsComponent,
    ContactUsComponent,
    TouristicCentresComponent,
    SiteInformationComponent,
    VideoPlayerComponent,
    DomSecurityPipe,
    SiteRatingComponent,
    ReviewsComponent,
    FollowersComponent,
    LoginComponent,
    UserProfileComponent,
    MaintenanceNewsListComponent,
    MaintenanceNewsUpsetComponent,
    ServicesComponent,
    MaintenanceTouristicProfileListComponent,
    MaintenanceTouristicProfileUpSetComponent,
    MaintenanceEditorsComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    EmbedVideo.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), 
  ],
  providers: [
    LoginService,
    UserService,
    AlertService,
    PermissionService,
    ReviewsService,
    DataStorageService,
    FollowerService,
    NewsService,
    RatingService,
    SiteService,
    FirebaseStorageService,
    { provide: FirestoreSettingsToken, useValue: {} }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
