import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {RegistrationService } from '@app/_services/registration.service';
import {AlertService } from '@app/_services';
import { UserDTO } from '@app/_models/user_dto';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    roleList:string[]=['EMPLOYEE_ADMIN','EMPLOYEE_USER'];
    addUserformgroup: FormGroup;
    loading = false;
    submitted = false;
    UserDetails:UserDTO=new UserDTO();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private registrationService: RegistrationService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.saveUpdateUser();
    }
    saveUpdateUser() {

        this.addUserformgroup = this.formBuilder.group({
            name: new FormControl(this.UserDetails.name, [
              Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(45),
                Validators.required])
            ]),
            password: new FormControl(this.UserDetails.password, Validators.compose([
              Validators.minLength(2),
              Validators.maxLength(45),
              Validators.required])
            ),
            contact: new FormControl(this.UserDetails.contact, Validators.compose([
                Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
                Validators.required])
            ),
            address: new FormControl(this.UserDetails.address, Validators.compose([
              Validators.minLength(2),
              Validators.maxLength(45),
              Validators.required])
            ),
            role: new FormControl(this.UserDetails.role, Validators.compose([
              Validators.minLength(2),
              Validators.maxLength(45),
              Validators.required])
            ),
            username: new FormControl(this.UserDetails.username, Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+')],
                )
            )
          })
    }

    // convenience getter for easy access to form fields
    get f() { return this.addUserformgroup.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.addUserformgroup.invalid) {
            return;
        }

        this.loading = true;
        this.registrationService.register(this.addUserformgroup.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}