import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../_service/Authentication.service";




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) || !this.authenticationService.userValue.flag) {
                this.authenticationService.logout();
            }
            if(err.status===0){
                this.authenticationService.logout();
            }
            const error = (err && err.error && err.error.message) || err.statusText;
            return throwError(error);
        }))
    }
}
