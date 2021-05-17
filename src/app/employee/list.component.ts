import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '@app/_services/employee.service';
import { EmployeeDTO } from '@app/_models/emp_dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    fileName: String;
    displayedColumns: string[] = ['accountName', 'clientName','status'];
    dataSource: MatTableDataSource<EmployeeDTO>;
    employeeList:EmployeeDTO[]=[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private employeeService: EmployeeService) {
      this.dataSource = new MatTableDataSource(this.employeeList); }
  ngOnInit(): void {
    this.getAllEmployeeList();
  }
  getAllEmployeeList() {
    this.employeeService.getAll().subscribe(data=>{
      this.employeeList = <EmployeeDTO[]><unknown>data;
  });
    }
    downLoadEmployee(){
      this.employeeService.downloademployee().subscribe(data=>{
        const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        this.fileName = "Employee_List";
        const file = new File([blob], this.fileName + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);
    });
    }
  
  }