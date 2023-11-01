import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudSvgComponent } from './cloud-svg/cloud-svg.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SingupPageComponent } from './pages/singup-page/singup-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingLocationComponent } from './components/booking-location/booking-location.component';
import { BookingCargoComponent } from './components/booking-cargo/booking-cargo.component';
import { SkipperIconComponent } from './utlt/skipper-icon/skipper-icon.component';
import { BookingReviewComponent } from './components/booking-review/booking-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DefultLayoutComponent } from './layouts/defult-layout/defult-layout.component';
import { BannerComponent } from './components/banner/banner.component';
import { DeliveryPromotionComponent } from './pages/home/delivery-promotion/delivery-promotion.component';
import { HomeCardComponent } from './pages/home/home-card/home-card.component';
import { CookieModule } from 'ngx-cookie';
import { LoadLocationComponent } from './components/load-location/load-location.component';
import { UnloadLocationComponent } from './components/unload-location/unload-location.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingItemsComponent } from './components/booking-items/booking-items.component';
import { PricePipe } from './pipes/price.pipe';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { ProjectsComponent } from './pages/projects/projects.component';


@NgModule({
  declarations: [
    AppComponent,
    CloudSvgComponent,
    LoginPageComponent,
    SingupPageComponent,
    ProfileComponent,
    BookingComponent,
    BookingLocationComponent,
    BookingCargoComponent,
    SkipperIconComponent,
    BookingReviewComponent,
    HomeComponent,
    NavbarComponent,
    DefultLayoutComponent,
    BannerComponent,
    DeliveryPromotionComponent,
    HomeCardComponent,
    LoadLocationComponent,
    UnloadLocationComponent,
    BookingItemsComponent,
    PricePipe,
    DashboardComponent,
    AuthComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CookieModule.withOptions(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
