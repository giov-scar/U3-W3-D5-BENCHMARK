import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/interfaces/iregister';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formData: IRegister = {
    nome: '',
    cognome: '',
    email: '',
    password: '',
  };
  constructor(private authSvc: LoginService, private router: Router) {}

  register() {
    this.authSvc.register(this.formData).subscribe((res) => {
      console.log('registrato');
      this.router.navigate(['/login']);
    });
  }
}
