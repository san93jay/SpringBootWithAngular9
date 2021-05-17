import { Component } from '@angular/core';
import { LoginService } from './_services/login.service';
import { UserTokenDTO } from '@app/_models/user_token';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    userTokenDTO: UserTokenDTO;

    constructor(private loginService: LoginService) {
        this.loginService.userTokenDTO.subscribe(x => this.userTokenDTO = x);
    }

    logout() {
        this.loginService.logout();
    }
}