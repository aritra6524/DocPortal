import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginPatForm: FormGroup;
  loginDocForm: FormGroup;
  loginAdminForm: FormGroup;
  status: boolean;
  profileType: string = 'Patient';
  errorMsg: string;

  constructor(private serviceObj: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.loginPatForm = new FormGroup({
      patemail: new FormControl(null),
      patpassword: new FormControl(null),
    });
    this.loginDocForm = new FormGroup({
      docemail: new FormControl(null),
      docpassword: new FormControl(null),
    });
    this.loginAdminForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  setProfile(profile: string): void {
    this.profileType = profile;
  }

  onPatLogin() {
    const patientCredObj = this.loginPatForm.value;
    this.serviceObj.loginPatient(patientCredObj).subscribe({
      next: (response) => {
        if (response['message'] == 'Login success') {
          this.serviceObj.setCurrentPatient(response['currentPatient']);
          this.errorMsg = '';

          //navigate
          this.router.navigate([
            '/dashboard/doctor-list',
            patientCredObj.patemail,
          ]);
        } else {
          this.errorMsg = response['message'];
        }

        // if (response.length != 0) {
        //   if (patientCredObj.patpassword == response[0].patpassword) {
        //     //update global state
        //     this.serviceObj.setLoginStatus(true);
        //     this.serviceObj.setCurrentPatient(response[0]);
        //     //navigate to dashboard
        //     this.router.navigate([
        //       '/dashboard/doctor-list',
        //       patientCredObj.patemail,
        //     ]);
        //   } else {
        //     alert('Invalid Password');
        //   }
        // } else {
        //   alert('Invalid! Patient Not Found');
        // }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }

  onDocLogin(): void {
    let doctorCredObj = this.loginDocForm.value;
    this.serviceObj.loginDoctor(doctorCredObj).subscribe({
      next: (response) => {
        if (response['message'] == 'Login success') {
          this.errorMsg = '';
          //navigate
          this.router.navigate([
            '/dashboard/patient-list',
            doctorCredObj.docemail,
          ]);
        } else {
          this.errorMsg = response['message'];
        }

        // if (response.length != 0) {
        //   if (doctorCredObj.docpassword == response[0].docpassword) {
        //     //update global state
        //     this.serviceObj.setLoginStatus(true);
        //     this.serviceObj.setCurrentDoctor(response[0]);
        //     //navigate to dashboard
        //     this.router.navigate([
        //       '/dashboard/patient-list',
        //       doctorCredObj.docemail,
        //     ]);
        //   } else {
        //     alert('Invalid Password');
        //   }
        // } else {
        //   alert('Invalid! Doctor Not Found');
        // }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }

  onAdminLogin(): void {
    let doctorCredObj = this.loginAdminForm.value;
    this.serviceObj.loginAdmin(doctorCredObj).subscribe({
      next: (response) => {
        if (response['message'] == 'Login success') {
          this.errorMsg = '';
          //navigate
          this.router.navigate([
            '/dashboard/patient-list',
            adminCredObj.email,
          ]);
        } else {
          this.errorMsg = response['message'];
        }


    const adminCredObj = this.loginAdminForm.value;
    this.serviceObj.getuserCredAdmin(adminCredObj.username).subscribe({
      next: (response) => {
        if (response.length != 0) {
          if (adminCredObj.password == response[0].password) {
            //update global state
            this.serviceObj.setLoginStatus(true);
            //navigate to dashboard
            this.router.navigate(['/admin-dashboard']);
          } else {
            alert('Invalid Password');
          }
        } else {
          alert('Invalid Username');
        }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }
}
