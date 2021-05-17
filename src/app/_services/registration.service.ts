import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '@app/_models/user_dto';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  public static readonly SAVE_USER_DETAILS = environment.apiUrlApp + "/api/auth/signUp";
  

  constructor(private http: HttpClient, private loginService: LoginService) { }

  register(UserDetails: UserDTO) {
    return this.http.post(RegistrationService.SAVE_USER_DETAILS, UserDetails, {
      headers: new HttpHeaders({
       // Authorization: "Bearer " + this.loginService.getUserToken(),
        'Content-Type': 'application/json',
      }), responseType: 'text'
    })
      .pipe(map((response: any) => response));
}
}
