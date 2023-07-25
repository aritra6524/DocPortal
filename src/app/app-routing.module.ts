import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { BookAppointmentPageComponent } from './book-appointment-page/book-appointment-page.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'doctor-list/:patemail', component: DoctorListComponent },
      { path: 'patient-list/:docemail', component: PatientListComponent },
      {
        path: 'book-appointment-page',
        component: BookAppointmentPageComponent,
      },
    ],
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
