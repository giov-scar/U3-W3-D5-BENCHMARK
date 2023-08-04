import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/ilogin';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formData: ILogin = {
    email: '',
    password: '',
  };
  constructor(private authSvc: LoginService, private router: Router) {}

  login() {
    this.authSvc.login(this.formData).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }
}
