import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {StudentComponent} from "./component/student/student.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [

  {
    path:"accueil",
    component:HomeComponent},
  {
    path:"cours",
    component:HomeComponent},
  {
    path:"student/:id",
    component:StudentComponent},

  {
    path:"aide",
    component: HomeComponent
  },
  {
    path:"connexion",
    component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
