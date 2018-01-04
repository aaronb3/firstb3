import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( private employeeService: EmployeeService,
               private toatrService: ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      ID: null,
      EmployeeName: '',
      Gender: '',
      Email: '',
      DepartmentId: null,
      IsActive: null,
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.ID == null) {
      this.employeeService.postEmployee(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.toatrService.info('New employee has been register', 'Employee Registration');
      });
    } else {
      this.employeeService.putEmployee(form.value.ID, form.value)
                          .subscribe(data => {
                            this.resetForm(form);
                            this.employeeService.getEmployees();
                            this.toatrService.info('Employee has been updated', 'Updated Employee' );
                          });



    }

  }

}
