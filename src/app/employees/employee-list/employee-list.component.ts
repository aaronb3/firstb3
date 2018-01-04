import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor( private employeeService: EmployeeService,
               private toastrService: ToastrService ) { }

  ngOnInit() {
    this.employeeService.getEmployees();
  }

  showForEdit(employee: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, employee);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure to delete this record?') === true ) {
      this.employeeService.deleteEmployee(id)
      .subscribe(data => {
        this.employeeService.getEmployees();
        this.toastrService.error('The employee has been deleted', 'Employee Deleted ');
      });
    }

  }

}
