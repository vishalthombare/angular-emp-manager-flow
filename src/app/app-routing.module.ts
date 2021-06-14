import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LoginAuthGuard } from './shared/routes/login-auth.guard';

const routes: Routes = [
  {
    path:"", 
    redirectTo: "/login", 
    pathMatch:"full"
  },
  {
    path:"home", 
    component:HomeComponent,
    canActivate:[LoginAuthGuard]
  },
  {
    path:"login", 
    component:LoginComponent
  },
  {
    path:"signup", 
    component:SignUpComponent
  },
  {
    path:"**", 
    component: ErrorPageComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents =[HomeComponent,LoginComponent,SignUpComponent, ErrorPageComponent]
