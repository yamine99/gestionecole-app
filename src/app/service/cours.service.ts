import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cours} from "../model/cours";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CoursService {

    public constructor(private http: HttpClient) {

    }

    getAll(): Observable<Cours[]> {
        return this.http.get<Cours[]>(environment.api.root + "api/course");
    }
}