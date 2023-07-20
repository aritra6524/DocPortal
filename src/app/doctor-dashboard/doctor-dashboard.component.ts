import { Component } from '@angular/core';
import { Doctor } from './doctor.model';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
  doctor: Doctor;

  constructor(private doctorService: DoctorService) {
    this.doctor = this.doctorService.getCurrentDoctor(); // Assuming doctor details are stored in the service
  }
}
