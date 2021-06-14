import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn:"root"
})

@Injectable()

export class LoginService{
    private _registerUrl="http://127.0.0.1:5000/accounts/manager/register/";
    private _loginUrl="http://127.0.0.1:5000/accounts/login";

    constructor(private http:HttpClient,
                private _router:Router){}

    registerManager(body){
        return this.http.post(this._registerUrl,body).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )

    }

    loginManager(body){
        return this.http.post(this._loginUrl,body).
        pipe(
            map((data: any) => {
              return data.data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }


    loggedIn(){
      return !!localStorage.getItem('token');
    }
    loggedOut(){
      return localStorage.removeItem('token');
      // this._router.navigate(['/login']);
    }

}