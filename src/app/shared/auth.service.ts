
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";

import {stringify} from "@angular/compiler/src/util";

@Injectable({
    providedIn: 'root'
})
export class AuthService {



    constructor(private http: HttpClient) {

    }

    login(email : string, password : string) : Observable<any> {
        return this.http.post(environment.api.root+"login",
        {"username":email,"password":password},
        {headers: new HttpHeaders({"Accept":"application/json", "Content-type":"application/x-www-form-urlencoded"}), responseType: "json"});
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