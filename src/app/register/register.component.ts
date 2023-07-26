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
      patfirstname: new FormControl(null, [Validators.required]),
      patlastname: new FormControl(null, [Validators.required]),
      patphone: new FormControl(null, [Validators.required]),
      patemail: new FormControl(null, [Validators.required, Validators.email]),
      patpassword: new FormControl(null, [Validators.required]),
      patcity: new FormControl(null),
    });
    this.registerDocForm = new FormGroup({
      docfirstname: new FormControl(null, [Validators.required]),
      doclastname: new FormControl(null, [Validators.required]),
      docregd: new FormControl(null, [Validators.required]),
      docspecialization: new FormControl(null, [Validators.required]),
      docqualification: new FormControl(null, [Validators.required]),
      docphone: new FormControl(null, [Validators.required]),
      docemail: new FormControl(null, [Validators.required, Validators.email]),
      docpassword: new FormControl(null, [Validators.required]),
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

  get patfirstname() {
    return this.registerPatForm.get('patfirstname');
  }
  get patlastname() {
    return this.registerPatForm.get('patlastname');
  }
  get patphone() {
    return this.registerPatForm.get('patphone');
  }
  get patemail() {
    return this.registerPatForm.get('patemail');
  }
  get patpassword() {
    return this.registerPatForm.get('patpassword');
  }
  get docfirstname() {
    return this.registerDocForm.get('docfirstname');
  }
  get doclastname() {
    return this.registerDocForm.get('doclastname');
  }
  get docregd() {
    return this.registerDocForm.get('docregd');
  }
  get docspecialization() {
    return this.registerDocForm.get('docspecialization');
  }
  get docqualification() {
    return this.registerDocForm.get('docqualification');
  }
  get docphone() {
    return this.registerDocForm.get('docphone');
  }
  get docemail() {
    return this.registerDocForm.get('docemail');
  }
  get docpassword() {
    return this.registerDocForm.get('docpassword');
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
