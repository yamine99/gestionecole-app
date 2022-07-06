
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";

import {stringify} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
import {Parser} from "@angular/compiler";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {
    }

    login(email : string, password : string) : Observable<any> {
        return this.http.post(environment.api.root+"login",
        {"email":email,"password":password},
        {headers: new HttpHeaders({"Accept":"application/json","Content-type":"application/json"}), observe: "response", responseType: "json"});
      }
    
    getToken(element:string){
       return localStorage.getItem(element);
    }

    refreshToken(token : String | null, email : String | unknown ) : Observable<any>{
        return this.http.get(`${environment.api.refresh}${email}`, {headers: new HttpHeaders({"Accept":"application/json","Authorization":`Bearer ${token}`}), observe: "response", responseType: "json"});
    }

    removeToken(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    saveToken(token : any){

        localStorage.setItem("token", token["token"]);
        let dt = new Date(token["expireDate"]);

        localStorage.setItem("expiration", dt.toString() );
    }



}