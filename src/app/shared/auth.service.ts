
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {stringify} from "@angular/compiler/src/util";

@Injectable({
    providedIn: 'root'
})
export class AuthService {



    constructor(private http: HttpClient) {

    }


    
    getToken(){
       return localStorage.getItem('token')
    }

    removeToken(){
        localStorage.removeItem('token');
    }

    generateToken( ){

        localStorage.setItem("token", "dsqsdqsdq");
    }

}