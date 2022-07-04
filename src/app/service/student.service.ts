import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../model/student";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public constructor(private http: HttpClient) {

  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.api.endpoint+"students" );
  }
}
