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
  setCurrentDoctor(userObj) {
    return this.currentDoctorBehaviorSubject.next(userObj);
  }

  //get current doctor
  getCurrentDoctor() {
    return this.currentDoctorBehaviorSubject.asObservable();
  }

  //update current patient
  setCurrentPatient(userObj) {
    this.currentPatientBehaviorSubject.next(userObj);
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
