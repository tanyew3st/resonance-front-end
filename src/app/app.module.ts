import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DonorFormComponent } from './components/donor-form/donor-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { RentalFormComponent } from './components/rental-form/rental-form.component';
import { SchoolSetupComponent } from './components/school-setup/school-setup.component';
import { SchoolDashboardComponent } from './components/school-dashboard/school-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FollowComponent } from './components/follow/follow.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DistrictDashboardComponent } from './components/district-dashboard/district-dashboard.component';
import { DistrictSetupComponent } from './components/district-setup/district-setup.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DonorFormComponent,
    RentalFormComponent,
    SchoolSetupComponent,
    SchoolDashboardComponent,
    NavbarComponent,
    HomeComponent,
    FollowComponent,
    AdminPanelComponent,
    DistrictDashboardComponent,
    DistrictSetupComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'donor-form', component: DonorFormComponent },
      { path: 'follow', component: FollowComponent },
      { path: 'rental-form', component: RentalFormComponent },
      { path: 'school/register', component: SchoolSetupComponent },
      { path: 'school/dashboard', component: SchoolDashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'admin', component: AdminPanelComponent },
      { path: 'district/register', component: DistrictSetupComponent },
      { path: 'district/dashboard', component: DistrictDashboardComponent },
      { path: 'contact', component: ContactFormComponent },
      { path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
