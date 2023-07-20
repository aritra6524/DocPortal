import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  status: boolean;
  constructor(public userObj: RegisterService, public router: Router) {}

  ngOnInit(): void {
    this.userObj.getLoginStatus().subscribe({
      next: (status) => {
        this.status = status;
      },
      error: (err) => {
        console.log('err is ', err);
      },
    });
  }

  toHome() {
    this.router.navigate(['/']);
  }

  onLogout() {
    this.userObj.setLoginStatus(false);
    this.userObj.setCurrentPatient(null);
    // this.userObj.setDoctorLoginStatus(false);
    this.userObj.setCurrentDoctor(null);
    // this.userObj.setAdminLoginStatus(false);
    this.router.navigate(['login']);
  }
}
