import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private doctorDetails: Doctor = null;
  private appointmentDetails: Appointment = null;
  private loginCredentials: Patient | Doctor = null;

  constructor(private hC: HttpClient, private router: Router) {}

  doctorDetailsBS = new BehaviorSubject(this.doctorDetails);
  loginCredentialsBS = new BehaviorSubject(this.loginCredentials);

  setDoctorDetails(doctor) {
    this.doctorDetails = doctor;
    return this.doctorDetailsBS.next(doctor);
  }

  getDoctorDetails() {
    return this.doctorDetailsBS.asObservable();
  }

  setAppointment(appointment) {
    return this.hC.post(
      'http://localhost:3000/appointments-api/appointments',
      appointment
    );
  }

  getAllAppointments() {
    return this.hC.get('http://localhost:3000/appointments-api/appointments');
  }

  deleteAppointment(appointment) {
    return this.hC.delete(
      `http://localhost:3000/appointments-api/appointments-delete/${appointment._id}`
    );
  }
}

export interface Doctor {
  docfirstname: string;
  doclastname: string;
  docregd: number;
  docspecialization: string;
  docqualification: string;
  docphone: number;
  docemail: string;
  docpassword: string;
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

export interface Patient {
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
  patpassword: string;
}

export interface Appointment {
  docfirstname: string;
  doclastname: string;
  docregd: number;
  docspecialization: string;
  docqualification: string;
  docphone: number;
  docemail: string;
  docpassword: string;
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
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
  patpassword: string;
  queue: number;
}
