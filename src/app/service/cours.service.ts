import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cours} from "../model/cours";
import {environment} from "../../environments/environment";
import { CourseLink } from 'src/app/model/course-link.model';

@Injectable({
    providedIn: 'root'
})
export class CoursService {

    public constructor(private http: HttpClient) {

    }

    getAll(): Observable<Cours[]> {
        return this.http.get<Cours[]>(environment.api.root + "api/course");
    }
    getAllLinks() : Observable<CourseLink[]> {
        return this.http.get<CourseLink[]>(environment.api.root + "api/link/getall");
    }

    getByCourse(id : number) : Observable<CourseLink[]> {
        return this.http.get<CourseLink[]>(environment.api.root + `api/link/getByCourse/${id}`);
    }

    getAllLinksStudent(uuid:string) : Observable<CourseLink[]> {
        return this.http.get<CourseLink[]>(environment.api.root + "api/link/"+uuid);
    }

    association(idStudent: string, idCourse: number){
        let form = {'idStudent':idStudent, 'idCourse':idCourse};
        return this.http.post<CourseLink[]>(environment.api.root + "api/link",form);
    }
}