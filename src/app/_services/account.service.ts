// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
// import { UserTokenDTO } from '@app/_models/user_token';
// import { LoginDTO } from '@app/_models/login_dto';

// @Injectable({ providedIn: 'root' })
// export class AccountService {
//     private userSubject: BehaviorSubject<UserTokenDTO>;
//     public user: Observable<UserTokenDTO>;

//     constructor(
//         private router: Router,
//         private http: HttpClient
//     ) {
//         this.userSubject = new BehaviorSubject<UserTokenDTO>(JSON.parse(localStorage.getItem('user')));
//         this.user = this.userSubject.asObservable();
//     }

//     public get userValue(): UserTokenDTO {
//         return this.userSubject.value;
//     }

//     login(loginDto:LoginDTO) {
//         return this.http.post<UserTokenDTO>(`${environment.apiUrlApp}/users/authenticate`, loginDto)
//             .pipe(map(user => {
//                 localStorage.setItem('user', JSON.stringify(user));
//                 this.userSubject.next(user);
//                 return user;
//             }));
//     }
//     register(user: UserTokenDTO) {
//         return this.http.post(`${environment.apiUrlApp}/users/register`, user);
//     }

//     getAll() {
//         return this.http.get<UserTokenDTO[]>(`${environment.apiUrlApp}/users`);
//     }

//     getById(id: string) {
//         return this.http.get<UserTokenDTO>(`${environment.apiUrlApp}/users/${id}`);
//     }
// }