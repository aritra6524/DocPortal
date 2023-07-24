import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private hC: HttpClient) {}

  loginStatus: boolean = false;

  // patientLoginStatus: boolean = false;
  currentPatient: Patient = null;

  // doctorLoginStatus: boolean = false;
  currentDoctor: Doctor = null;

  loginStatusBehaviorSubject = new BehaviorSubject(this.loginStatus);

  currentPatientBehaviorSubject = new BehaviorSubject(this.currentPatient);
  currentDoctorBehaviorSubject = new BehaviorSubject(this.currentDoctor);

  //update Admin Login status
  setLoginStatus(status) {
    this.loginStatusBehaviorSubject.next(status);
  }

  //get Admin Login Status
  getLoginStatus() {
    return this.loginStatusBehaviorSubject.asObservable();
  }

  //update current doctor
  setCurrentDoctor(doctor) {
    this.currentDoctorBehaviorSubject.next(doctor);
  }

  //update current patient
  setCurrentPatient(patient) {
    this.currentPatientBehaviorSubject.next(patient);
  }

  //get current doctor
  getCurrentDoctor() {
    return this.currentDoctorBehaviorSubject.asObservable();
  }

  //get current patient
  getCurrentPatient() {
    return this.currentPatientBehaviorSubject.asObservable();
  }

  registerDoctor(newDoctor: any) {
    return this.hC.post('http://localhost:3000/doctors-api/doctors', newDoctor);
  }

  registerPatient(newPatient: any) {
    return this.hC.post(
      'http://localhost:3000/patients-api/patients',
      newPatient
    );
  }

  loginPatient(patientCredObj: any) {
    return this.hC.post(
      'http://localhost:3000/patients-api/patient-login',
      patientCredObj
    );
  }

  loginDoctor(doctorCredObj: any) {
    return this.hC.post(
      'http://localhost:3000/doctors-api/doctor-login',
      doctorCredObj
    );
  }

  getAllDoctors() {
    return this.hC.get('http://localhost:3000/doctors-api/doctors');
  }

  getAllPatients() {
    return this.hC.get('http://localhost:3000/patients-api/patients');
  }

  getuserCredPat(emailid) {
    return this.hC.get<Patient[]>(
      `http://localhost:3000/patient?patemail=${emailid}`
    );
  }

  getuserCredDoc(emailid) {
    return this.hC.get<Doctor[]>(
      `http://localhost:3000/doctor?docemail=${emailid}`
    );
  }

  getuserCredAdmin(username) {
    return this.hC.get<Admin[]>(
      `http://localhost:3000/admin?username=${username}`
    );
  }

  // getPatientByEmail(email) {
  //   return this.hC.get(`http://localhost:3000/patients/:${email}`);
  // }
}

export interface Patient {
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
  patpassword: string;
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
  clinicaddress: string;
  cliniccity: string;
  doctime: string;
  mon: boolean;
  tues: boolean;
  wed: boolean;
  thurs: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

export interface Admin {
  username: string;
  password: string;
}
