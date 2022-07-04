import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {StudentComponent} from "./component/student/student.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";

const routes: Routes = [

  {
    path:"accueil",
    component:HomeComponent},
  {
    path:"cours",
    component:HomeComponent},
  {
    path:"etudiant/:id",
    component:StudentComponent},

  {
    path:"aide",
    component: HomeComponent
  },
  {
    path:"connexion",
    component:LoginComponent},

  {
    path:"enregistrer",
    component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
