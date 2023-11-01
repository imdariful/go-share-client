import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SingupPageComponent } from './pages/singup-page/singup-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingLocationComponent } from './components/booking-location/booking-location.component';
import { BookingCargoComponent } from './components/booking-cargo/booking-cargo.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { DefultLayoutComponent } from './layouts/defult-layout/defult-layout.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  { path: '', component: DefultLayoutComponent, children: [
    { path: '', component: HomeComponent },
  ]},
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'signin', component: LoginPageComponent },
      { path: 'singup', component: SingupPageComponent },
    ]
  },
  {
    path: 'booking/:id',
    component: BookingComponent,
  },
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
