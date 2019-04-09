import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
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
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
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
    ServicesComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
