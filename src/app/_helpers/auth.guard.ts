import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '@app/_services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const UserTokenDTO = this.loginService.userValue;
        if (UserTokenDTO) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/account/login']);
        return false;
    }
}