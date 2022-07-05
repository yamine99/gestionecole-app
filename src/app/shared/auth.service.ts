
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

    dateNumber: number =0;

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

    removeToken(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    saveToken(token : any){

        localStorage.setItem("token", token["token"]);
        let dt = new Date(token["expireDate"]);
       this.dateNumber = dt.getTime() / 1000-new Date().getTime() / 1000;

        this.dateNumber = Math.round(this.dateNumber);
        localStorage.setItem("expiration", this.dateNumber.toString() );
    }

    countdown() {

        if (location.pathname != "/connexion") {

            // @ts-ignore
            this.dateNumber = parseInt(localStorage.getItem("expiration"));

            setTimeout(() => {

                this.dateNumber--;
                localStorage.setItem("expiration", this.dateNumber.toString());
                this.countdown();
                console.log(this.dateNumber);
            }, 1000);

            if (this.dateNumber < 100 && this.dateNumber > 579) {

                if (location.pathname != "/session") {
                    this.router.navigateByUrl('/session').then(() => {
                        console.log("je suis dans session");
                    });
                }


            }
            if (this.dateNumber <= 0) {
                this.router.navigateByUrl('/connexion').then(() => {
                    this.removeToken();
                });
            }
        }
    }


}