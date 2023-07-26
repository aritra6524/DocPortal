import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      patemail: new FormControl(null, [Validators.required, Validators.email]),
      patpassword: new FormControl(null, [Validators.required]),
    });
    this.loginDocForm = new FormGroup({
      docemail: new FormControl(null, [Validators.required, Validators.email]),
      docpassword: new FormControl(null, [Validators.required]),
    });
    this.loginAdminForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get patemail() {
    return this.loginPatForm.get('patemail');
  }
  get patpassword() {
    return this.loginPatForm.get('patpassword');
  }
  get docemail() {
    return this.loginDocForm.get('docemail');
  }
  get docpassword() {
    return this.loginDocForm.get('docpassword');
  }
  get username() {
    return this.loginAdminForm.get('username');
  }
  get password() {
    return this.loginAdminForm.get('password');
  }

  setProfile(profile: string): void {
    this.errorMsg = '';
    this.profileType = profile;
  }

  onPatLogin() {
    const patientCredObj = this.loginPatForm.value;
    this.serviceObj.loginPatient(patientCredObj).subscribe({
      next: (response) => {
        if (response['message'] == 'Login success') {
          this.serviceObj.setLoginStatus(true);
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
          this.serviceObj.setLoginStatus(true);
          this.serviceObj.setCurrentDoctor(response['currentDoctor']);
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
    let adminCredObj = this.loginAdminForm.value;

    if (adminCredObj.username == 'admin') {
      if (adminCredObj.password == 'admin') {
        this.serviceObj.setLoginStatus(true);

        //navigate
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.errorMsg = 'Invalid password';
      }
    } else {
      this.errorMsg = 'Invalid username';
    }
    // this.serviceObj.loginAdmin(doctorCredObj).subscribe({
    //   next: (response) => {
    //     if (response['message'] == 'Login success') {
    //       this.errorMsg = '';
    //       //navigate
    //       this.router.navigate([
    //         '/dashboard/patient-list',
    //         adminCredObj.email,
    //       ]);
    //     } else {
    //       this.errorMsg = response['message'];
    //     }

    // const adminCredObj = this.loginAdminForm.value;
    // this.serviceObj.getuserCredAdmin(adminCredObj.username).subscribe({
    //   next: (response) => {
    //     if (response.length != 0) {
    //       if (adminCredObj.password == response[0].password) {
    //         //update global state
    //         this.serviceObj.setLoginStatus(true);
    //         //navigate to dashboard
    //         this.router.navigate(['/admin-dashboard']);
    //       } else {
    //         alert('Invalid Password');
    //       }
    //     } else {
    //       alert('Invalid Username');
    //     }
    //   },
    //   error: (err) => {
    //     console.log('Error occurred:', err);
    //   },
    // });
  }
}
