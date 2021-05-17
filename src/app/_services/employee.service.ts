import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDTO } from '@app/_models/emp_dto';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  
  

  public static readonly GET_ALL_EMPLOYEE=environment.apiUrlApp + "/api/employee/allEmployee"; 
  public static readonly SAVE_EMPLOYEE_DETAILS=environment.apiUrlApp + "/api/employee/saveEmployee";
  public static readonly DOWNLOAD_ALL_EMPLOYEE=environment.apiUrlApp + "/excel/emp/download/list";
  public static readonly DOWNLOAD_EMPLOYEE_SAMPLE_SHEET=environment.apiUrlApp + "/excel/emp/download/sample";
  public static readonly UPLOAD_EMPLOYEE_DATA_BY_EXCEL_SHEET=environment.apiUrlApp + "/api/employee/save";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  
getAll() {
  const httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + this.loginService.getUserToken()
    })
  };
  return this.http.get(EmployeeService.GET_ALL_EMPLOYEE, httpOptions).pipe(map((response: Response) => response));
}

register(employeeDTO: EmployeeDTO) {
  return this.http.post(EmployeeService.SAVE_EMPLOYEE_DETAILS, employeeDTO, {
    headers: new HttpHeaders({
       Authorization: "Bearer " + this.loginService.getUserToken(),
      'Content-Type': 'application/json',
    }), responseType: 'text'
  })
    .pipe(map((response: any) => response));
}

downloademployee() {
  return this.http.get(EmployeeService.DOWNLOAD_ALL_EMPLOYEE, {
    headers: new HttpHeaders({
      Authorization: "Bearer " + this.loginService.getUserToken(),
      'Content-Type': 'application/json',
    }), responseType: 'blob'
  })
    .pipe(map((response: any) => response));
}

saveEmployeeInBulk(currentFileToUpload: File) {
  const httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + this.loginService.getUserToken(),
     // 'Content-Type':'multipart/form-data',
    })
  };
  const formdata: FormData = new FormData();
  formdata.append('file', currentFileToUpload);
  let url = EmployeeService.UPLOAD_EMPLOYEE_DATA_BY_EXCEL_SHEET;
  return this.http.post(url, formdata, httpOptions)
    .pipe(map((response: any) => response));
}

downloadEmployeeSampleSheet() {
  return this.http.get(EmployeeService.DOWNLOAD_EMPLOYEE_SAMPLE_SHEET, {
    headers: new HttpHeaders({
      //Authorization: "Bearer " + this.loginService.getUserToken(),
      'Content-Type': 'application/json',
    }), responseType: 'blob'
  })
    .pipe(map((response: any) => response));
 
}
}
