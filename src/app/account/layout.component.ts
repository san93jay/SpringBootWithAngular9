import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/_services/login.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
        // redirect to home if already logged in
        if (this.loginService.userValue) {
            this.router.navigate(['/']);
        }
    }
}