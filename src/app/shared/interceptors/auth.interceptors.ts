import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * AuthInterceptor constructor
     */
    public constructor() {
    }

    /**
     * Methods
     */
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        if (request.url.includes('/api/')) {
            if(token !== ""){
                return next.handle(request.clone({
                    headers: request.headers
                        .set("Content-type","application/json")
                        .set("Authorization", 'Bearer '+token)
                }))
            }   
        }
        return next.handle(request);
    }
}
