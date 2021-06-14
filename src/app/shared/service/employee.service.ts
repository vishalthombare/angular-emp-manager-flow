import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Service to notify local storage values
 */

 @Injectable({
    providedIn: 'root'
  })
  @Injectable()

export class EmployeeService{
    //private serverUrl='assets/dummyData.json';
   private serverUrl="http://127.0.0.1:5000/accounts/employee/";
    //private serverUrl="http://127.0.0.1:8000/core/employee/"
    
    constructor(private http :HttpClient){}

    postEmpDetail(body):Observable<any>{
        return this.http.post(this.serverUrl, body).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }

    getEmpDetail(): Observable<object>{
        return this.http.get(this.serverUrl).
        pipe(            
            map((data:any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )

    }

    deleteEmpDetail(id):Observable<any>{
        return this.http.delete(this.serverUrl+id). 
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }

    updateEmpDetail(id,postBody):Observable<any>{
        return this.http.post(this.serverUrl,postBody).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }
}
