import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import {WaitressComponent} from "./components/waitress/waitress.component";
import {CooksComponent} from "./components/cooks/cooks.component";
import {BartendersComponent} from "./components/bartenders/bartenders.component";
import {CashierComponent} from "./components/cashier/cashier.component";
import {RegistrationComponent} from"./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {authGuard} from "./helpers/auth..guard";

const routes: Routes = [
  {path: '', component: HomepageComponent, canActivate:[authGuard]},
  {path: 'waitress', component: WaitressComponent, canActivate: [ authGuard], data: {expectedRole: 'waitress'}},
  {path: 'cooks', component: CooksComponent , canActivate: [authGuard], data: {expectedRole: 'cook'}},
  {path: 'bartenders', component: BartendersComponent, canActivate: [ authGuard],data: { expectedRole: 'bartender' }},
  {path: 'cashiers', component: CashierComponent, canActivate: [ authGuard], data: {expectedRole: 'cashier'}},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},


];

@NgModule({
  declarations: [], //HomepageComponent is declared here
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
