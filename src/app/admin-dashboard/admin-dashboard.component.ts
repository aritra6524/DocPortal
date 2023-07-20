import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private hC: HttpClient,
    private appointmentServiceObj: AppointmentService,
    private location: Location,
    private router: Router
  ) {}

  doctors: Doctor[] = [];
  patients: Patient[] = [];

  ngOnInit() {
    this.fetchDoctors();
    this.fetchPatients();
  }

  fetchDoctors() {
    this.hC.get<Doctor[]>('http://localhost:3000/doctor').subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  fetchPatients() {
    this.hC.get<Patient[]>('http://localhost:3000/patient').subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  onClickDeleteDoctor(doctor) {
    this.appointmentServiceObj.deleteDoctor(doctor);

    alert(
      'Dr. ' +
        doctor.docfirstname +
        ' ' +
        doctor.doclastname +
        ' - ' +
        'Profile Deleted!'
    );
    //Refresh the component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  onClickDeletePatient(patient) {
    this.appointmentServiceObj.deletePatient(patient);

    alert(
        patient.patfirstname +
        ' ' +
        patient.patlastname +
        ' - ' +
        'Profile Deleted!'
    );
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
