import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service to notify local storage values
 */

 @Injectable({
    providedIn: 'root'
  })
  @Injectable()

export class CommonService{
    // serverUrl='assets/dummyData.json';
    serverUrl="http://127.0.0.1:5000/accounts/employee";
    
    constructor(private http :HttpClient){}
        
    postEmpDetail(body):Observable<any>{
        return this.http.post(this.serverUrl, body);
    }

    getEmpDetail(): Observable<any>{
        return this.http.get("assets/dummyData.json");
    }

    deleteEmpDetail(id):Observable<any>{
        return this.http.delete(this.serverUrl+id);
    }

    updateEmpDetail(id, postBody):Observable<any>{
        return this.http.put(this.serverUrl+ id+"/", postBody);
    }
}
