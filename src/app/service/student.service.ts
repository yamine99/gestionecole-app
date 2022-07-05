import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../model/student";
import {environment} from "../../environments/environment";
import {Content} from "@angular/compiler/src/render3/r3_ast";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public constructor(private http: HttpClient) {

  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.api.endpoint+"getall");
  }

  getByUuid(uuid:string): Observable<Student> {
    return this.http.get<Student>(environment.api.endpoint+"get/"+uuid);
  }



  addStudent(formValue:{
    lastName: string, firstName: string, date: string, phone:string, email:string, address: string
  }): Observable<any>{
    let student = new Student();
    student.prenom =formValue.firstName;
    student.nom =formValue.lastName;
    student.dateNaissance =formValue.date;
    student.telephone =formValue.phone;
    student.email =formValue.email;
    student.adresse =formValue.address;

    return this.http.post<any>(environment.api.endpoint+"add", student);
  }

  deleteStudent(uuid:string): Observable<string>{
    return this.http.get<string>(environment.api.endpoint+"delete/"+uuid);
  }
}
