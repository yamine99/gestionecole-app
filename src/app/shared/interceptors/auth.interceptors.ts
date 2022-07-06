import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * AuthInterceptor constructor
     */
    public constructor(private auth: AuthService, private router: Router) {
    }

    /**
     * Methods
     */
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        const expiration = new Date(localStorage.getItem("expiration")!);
        const now = new Date();
        if (expiration > now) {
            const remainingDate = new Date(expiration.getTime() - now.getTime());
            console.log("Date is still valid");
            console.log("remaining time : " + remainingDate.getMinutes() + ":" + remainingDate.getSeconds())
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("expiration");
            this.router.navigateByUrl('/connexion');
        }
        if (request.url.includes('/api/')) {
            if (token != null && token !== "") {
                const remainingDate = new Date(expiration.getTime() - now.getTime());
                if (remainingDate.getMinutes() <= 0 && remainingDate.getSeconds() <= 40) {
                    const decodedToken : string = jwt_decode(token);
                    this.auth.refreshToken(token, decodedToken["sub"]).subscribe({
                        next: (response) => {
                            const expiration = new Date(response.body["expireDate"]).toLocaleString();
                            localStorage.setItem("token", response.body["token"]);
                            localStorage.setItem("expiration", expiration);
                        }
                    })
                }
                return next.handle(request.clone({
                    headers: request.headers
                        .set("Content-type", "application/json")
                        .set("Authorization", 'Bearer ' + token)
                }))
            }
        }
        return next.handle(request);
    }
}
