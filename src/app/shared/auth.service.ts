
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";

import {stringify} from "@angular/compiler/src/util";

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private http: HttpClient, private httpBackend : HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    login(email : string, password : string) : Observable<any> {
        return this.http.post(environment.api.root+"login",
        {"email":email,"password":password},
        {headers: new HttpHeaders({"Accept":"application/json","Content-type":"application/json"}), observe: "response", responseType: "json"});
    }

    refreshToken(token : String | null, email : String | unknown ) : Observable<any>{
        return this.http.get(`${environment.api.refresh}${email}`, {headers: new HttpHeaders({"Accept":"application/json","Authorization":`Bearer ${token}`}), observe: "response", responseType: "json"});
    }
    
    getToken(){
       return localStorage.getItem('token')
    }

    removeToken(){
        localStorage.removeItem('token');
    }

    saveToken(token : any){
        const expiration = new Date(token["expireDate"]).toLocaleString();
        localStorage.setItem("token", token["token"]);
        localStorage.setItem("expiration", expiration);
    }

}