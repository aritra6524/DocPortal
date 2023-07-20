import { Component } from '@angular/core';
import { Doctor } from './doctor.model';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent {
  doctor: Doctor = new Doctor();
  businessDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(private doctorService: DoctorService) { }

  registerDoctor() {
    this.doctorService.registerDoctor(this.doctor).subscribe(
      response => {
        // Handle successful registration
      },
      error => {
        // Handle registration error
      }
    );
  }
}
