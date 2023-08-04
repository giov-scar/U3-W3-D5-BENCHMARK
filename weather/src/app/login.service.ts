import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { IAccessData } from './interfaces/IAccess-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILogin } from './interfaces/ilogin';
import { IRegister } from './interfaces/iregister';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  apiUrl: string = 'http://localhost:3000';
  registerUrl: string = this.apiUrl + '/register';
  loginUrl: string = this.apiUrl + '/login';

  private authSubject = new BehaviorSubject<null | IAccessData>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  login(data: ILogin) {
    return this.http.post<IAccessData>(this.loginUrl, data).pipe(
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('accessData', JSON.stringify(data));

        const expDate = this.jwtHelper.getTokenExpirationDate(
          data.accessToken
        ) as Date;
        this.autoLogout(expDate);
      })
    );
  }
  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/login']);
  }
  autoLogout(expDate: Date) {
    const expMs = expDate.getTime() - new Date().getTime();
    this.autoLogoutTimer = setTimeout(() => {}, expMs);
  }
  register(data: IRegister) {
    return this.http.post<IAccessData>(this.registerUrl, data);
  }
  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;
    const accessData: IAccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.authSubject.next(accessData);
  }
}
