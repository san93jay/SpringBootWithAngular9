import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EmployeeService } from '@app/_services/employee.service';
import { AlertService } from '@app/_services';
import { EmployeeDTO } from '@app/_models/emp_dto';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    departments:string[]=['IT','SALES','DEVELOPEMENT'];
    employeeFormGroup: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    empdto:EmployeeDTO=new EmployeeDTO();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.saveUpdateEmployee();
    }
    saveUpdateEmployee() {
        this.employeeFormGroup = this.formBuilder.group({
            employeeName: new FormControl(this.empdto.employeeName, [
              Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(45),
                Validators.required])
            ]),
            email: new FormControl(this.empdto.email, Validators.compose([
              Validators.required,
              Validators.pattern('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+')],
              )
            ),
            contact: new FormControl(this.empdto.contact, Validators.compose([
              Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
              Validators.required])
            ),
            age: new FormControl(this.empdto.age, Validators.compose([
              Validators.minLength(1),
              Validators.maxLength(3),
              Validators.required])
            ),
            department: new FormControl(this.empdto.department, Validators.compose([
              Validators.minLength(2),
              Validators.maxLength(45),
              Validators.required])
            ),
          })
    }

    // convenience getter for easy access to form fields
    get f() { return this.employeeFormGroup.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.employeeFormGroup.invalid) {
            return;
        }

        this.loading = true;

         
        this.employeeService.register(this.employeeFormGroup.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Employee added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/employee']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        
    }
    }
