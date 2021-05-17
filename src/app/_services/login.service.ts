import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '@app/_models/login_dto';
import { UserTokenDTO } from '@app/_models/user_token';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public static readonly LOGIN = environment.apiUrlApp + "/api/auth/signin";
  private userSubject: BehaviorSubject<UserTokenDTO>;
  public userTokenDTO: Observable<UserTokenDTO>;
  usertoken: UserTokenDTO;

  constructor(
      private router: Router,
      private httpclient: HttpClient,
  ) {
      this.userSubject = new BehaviorSubject<UserTokenDTO>(JSON.parse(localStorage.getItem('gpCurrentUser')));
      this.userTokenDTO = this.userSubject.asObservable();
  }

  public get userValue(): UserTokenDTO {
      return this.userSubject.value;
  }

  login(loginDto:LoginDTO) {
    if ( loginDto.username !== '' && loginDto.password !== '') {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      };

      let urlTemp = LoginService.LOGIN;
      return this.httpclient.post<any>(urlTemp, loginDto, httpOptions).pipe(map((response => {
        this.usertoken = <UserTokenDTO><unknown>response;
        return response;
      })));
    }
  }
      logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('gpCurrentUser');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    getUserToken() {
      const gpCurrentUser = localStorage.getItem('gpCurrentUser');
      if (gpCurrentUser != null) {
        const currentUserJson = JSON.parse(gpCurrentUser);
        if (currentUserJson.accessToken) {
          return currentUserJson.accessToken;
        } else {
          localStorage.removeItem('gpCurrentUser');
          this.router.navigate(['../login']);
          return false;
        }
      } else {
        this.router.navigate(['../login']);
        return false;
      }
    }
  }
  


