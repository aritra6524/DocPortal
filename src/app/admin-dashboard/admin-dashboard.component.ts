import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { Location } from '@angular/common';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private hC: HttpClient,
    private registerServiceObj: RegisterService,
    private appointmentServiceObj: AppointmentService,
    private location: Location,
    private router: Router
  ) {}

  doctors: Doctor[] = [];
  deletedDoctors: Doctor[] = [];
  patients: Patient[] = [];
  deletedPatients: Patient[] = [];

  ngOnInit() {
    this.fetchDoctors();
    this.fetchPatients();
  }

  fetchDoctors() {
    //fetch all doctors
    this.registerServiceObj.getAllDoctors().subscribe({
      next: (response) => {
        this.doctors = response['payload'];
      },
      error: (err) => {
        console.log('Error is:', err);
      },
    });

    //fetch deleted doctors
    this.registerServiceObj.getDeletedDoctors().subscribe({
      next: (response) => {
        this.deletedDoctors = response['payload'];
      },
      error: (err) => {
        console.log('Error is: ', err);
      },
    });
  }

  fetchPatients() {
    //fetch all patients
    this.registerServiceObj.getAllPatients().subscribe({
      next: (response) => {
        this.patients = response['payload'];
      },
      error: (err) => {
        console.log('Error is:', err);
      },
    });

    //fetch deleted patients
    this.registerServiceObj.getDeletedPatients().subscribe({
      next: (response) => {
        this.deletedPatients = response['payload'];
      },
      error: (err) => {
        console.log('Error is: ', err);
      },
    });
  }

  onClickDeleteDoctor(doctor) {
    this.registerServiceObj.deleteDoctor(doctor).subscribe({
      next: (response) => {
        alert(
          'Dr. ' +
            doctor.docfirstname +
            ' ' +
            doctor.doclastname +
            ' - ' +
            'Profile Deleted!'
        );
        // this.ngOnInit();
      },
      error: (err) => {
        console.log('Error is :', err);
      },
    });

    //Refresh the component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  onClickRestoreDoctor(doctor) {
    this.registerServiceObj.restoreDoctor(doctor).subscribe({
      next: (response) => {
        alert(
          'Dr. ' +
            doctor.docfirstname +
            ' ' +
            doctor.doclastname +
            ' - ' +
            'Profile Restored'
        );
      },
      error: (err) => {
        console.log('Error is :', err);
      },
    });
    //Refresh the component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  onClickDeletePatient(patient) {
    this.registerServiceObj.deletePatient(patient).subscribe({
      next: (response) => {
        alert(
          patient.patfirstname +
            ' ' +
            patient.patlastname +
            ' - ' +
            'Profile Deleted!'
        );
      },
      error: (err) => {
        console.log('Error is :', err);
      },
    });
    //Refresh the component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  onClickRestorePatient(patient) {
    this.registerServiceObj.restorePatient(patient).subscribe({
      next: (response) => {
        alert(
          patient.patfirstname +
            ' ' +
            patient.patlastname +
            ' - ' +
            'Profile Restored'
        );
      },
      error: (err) => {
        console.log('Error is :', err);
      },
    });

    //Refresh the component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}

interface Doctor {
  docfirstname: string;
  doclastname: string;
  docregd: string;
  docspecialization: string;
  docqualification: string;
  docphone: number;
  docemail: string;
  clinicname: string;
  cliniccity: string;
  clinicaddress: string;
  doctime: string;
  mon: boolean;
  tues: boolean;
  wed: boolean;
  thurs: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

interface Patient {
  patfirstname: string;
  patlastname: string;
  patemail: string;
  patphone: number;
}
