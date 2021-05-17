import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '@app/_services';
import { LoginDTO } from '@app/_models/login_dto';
import { LoginService } from '@app/_services/login.service';
import { UserTokenDTO } from '@app/_models/user_token';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    logindto:LoginDTO=new LoginDTO();
    usertoken: UserTokenDTO;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
       private loginService:LoginService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+')])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.logindto.username=this.f.username.value;
        this.logindto.password=this.f.password.value;
        this.loginService.login(this.logindto)
            .pipe(first())
            .subscribe(
                data => {
                    this.usertoken = <UserTokenDTO><unknown>data;
                    localStorage.setItem('gpCurrentUser', JSON.stringify(this.usertoken));
                    this.router.navigate(['/employee']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
                );
    }
}