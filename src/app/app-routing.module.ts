import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { LoginComponent } from './login/login.component';
import { TenderformComponent } from './tenderform/tenderform.component';


const routes: Routes = [

  {component:RegistrationformComponent,path:'register'},
  {component:LoginComponent,path:'login'},
  {component:TenderformComponent,path:'tender'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
