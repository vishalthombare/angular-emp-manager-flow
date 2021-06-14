import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  
    constructor(private _loginService: LoginService,
                private _router:Router){}
        
      canActivate():boolean{
        if(this._loginService.loggedIn()){
          return true;
        }
        else{
          this._router.navigate(['/login'])
          return false;
        }
      }
}
