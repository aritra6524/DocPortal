import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerPatForm: FormGroup;
  registerDocForm: FormGroup;
  profileType: string = 'Patient';

  constructor(private registerObj: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.registerPatForm = new FormGroup({
      patfirstname: new FormControl(null),
      patlastname: new FormControl(null),
      patphone: new FormControl(null),
      patemail: new FormControl(null),
      patpassword: new FormControl(null),
      patcity: new FormControl(null),
    });
    this.registerDocForm = new FormGroup({
      docfirstname: new FormControl(null),
      doclastname: new FormControl(null),
      docregd: new FormControl(null),
      docspecialization: new FormControl(null),
      docqualification: new FormControl(null),
      docphone: new FormControl(null),
      docemail: new FormControl(null),
      docpassword: new FormControl(null),
      clinicname: new FormControl(null),
      cliniccity: new FormControl(null),
      clinicaddress: new FormControl(null),
      doctime: new FormControl(null),
      mon: new FormControl(false),
      tues: new FormControl(false),
      wed: new FormControl(false),
      thurs: new FormControl(false),
      fri: new FormControl(false),
      sat: new FormControl(false),
      sun: new FormControl(false),
    });
  }

  setProfile(profile: string): void {
    this.profileType = profile;
  }

  onPatFormSubmit(): void {
    console.log(this.registerPatForm.value);
    this.registerObj.registerPatient(this.registerPatForm.value).subscribe({
      next: (value) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {},
    });
  }

  onDocFormSubmit(): void {
    console.log(this.registerDocForm.value);
    this.registerObj.registerDoctor(this.registerDocForm.value).subscribe({
      next: (value) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {},
    });
  }
}
