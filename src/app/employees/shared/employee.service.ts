import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';




@Injectable()
export class EmployeeService {


  selectedEmployee: Employee;
  employeeList: Employee[];
  private url= 'http://localhost:51925/api/Employees';
  constructor( private _http: Http) { }

  getEmployees() {
    const headerOptions = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions });
    return this._http.get(this.url)
                     .map( (data: Response) => {
                       return data.json() as Employee[];
                     })
                     .toPromise()
                     .then(empArr => this.employeeList = empArr);
  }




  postEmployee(employee: Employee) {
    const body = JSON.stringify(employee);
    const headerOptions = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions });
    return this._http.post(this.url, body, requestOptions)
              .map(data => data.json());

  }

  putEmployee(id: number, employee: Employee) {
    const body = JSON.stringify(employee);
    const headerOptions = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions });
    return this._http.post(this.url + '/' + id, body, requestOptions)
              .map(data => data.json());
  }

  deleteEmployee(id: number) {
    return this._http.delete(this.url + '/' + id )
                      .map(data => data.json());
  }
}
