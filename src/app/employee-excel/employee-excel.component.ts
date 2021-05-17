import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelSheetDTOResponse } from '@app/_models/excel_sheet_response';
import { EmployeeService } from '@app/_services';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employee-excel',
  templateUrl: './employee-excel.component.html',
  styleUrls: ['./employee-excel.component.less']
})
export class EmployeeExcelComponent implements OnInit {
   currentFileToUpload: File;
   docUploadFormGroup: FormGroup;
   fileName:string;
   excelSheetResponse:ExcelSheetDTOResponse=new ExcelSheetDTOResponse();
   isTableShow:boolean;

  constructor(public formBuilder: FormBuilder,public employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.isTableShow=false;
    this.docUploadFormGroup = this.formBuilder.group({
    });
  }
  onFileChange(event) {
    const files = event.target.files;
    this.currentFileToUpload = files[0];

    if (this.currentFileToUpload) {
      var validExts = new Array(".xlsx");
      let fileExt = this.currentFileToUpload.name;
      fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
      if (validExts.indexOf(fileExt) < 0) {
        this.currentFileToUpload = null;
      }
    }

  }
  uploadEmployeeDetailsBYExcelSheet() {
    
    this.employeeService.saveEmployeeInBulk(this.currentFileToUpload).subscribe(data => {
      this.isTableShow=true;
      this.excelSheetResponse= <ExcelSheetDTOResponse><unknown>data;
    });
  }
  downLoadSampleExcelSheet(){
    this.employeeService.downloadEmployeeSampleSheet().subscribe(data=>{
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      this.fileName = "Employee_Data_Sample";
      const file = new File([blob], this.fileName + '.xlsx', { type: 'application/vnd.ms.excel' });
      saveAs(file);
  });

  }

}
