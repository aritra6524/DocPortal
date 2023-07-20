import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:4200/doctors'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  registerDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  getCurrentDoctor(): Doctor {
    // Implement logic to retrieve the currently logged-in doctor
    // For simplicity, assuming it returns a sample doctor
    return new Doctor();
  }

  // Implement other methods like fetching doctors in a specific city, getting doctor's appointments, etc.
}
