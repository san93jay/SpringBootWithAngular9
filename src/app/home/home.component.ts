import { Component } from '@angular/core';
import { UserTokenDTO } from '@app/_models/user_token';
import { LoginService } from '@app/_services/login.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    userTokenDTO: UserTokenDTO;

    constructor(private loginService: LoginService) {
        this.userTokenDTO = this.loginService.userValue;
    }
}