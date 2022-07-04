import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {StudentComponent} from "./component/student/student.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {FormComponent} from "./component/form/form.component";
import {CourseComponent} from "./component/course/course.component";

const routes: Routes = [
  {
    path:"connexion",
    component:LoginComponent},
  {
    path:"accueil",
    component:HomeComponent},
  {
    path:"cours",
    component:CourseComponent},
  {
    path:"etudiant/:id",
    component:StudentComponent},

  {
    path:"ajouter",
    component: FormComponent
  },

  {
    path:"aide",
    component: HomeComponent
  },


  {
    path:"enregistrer",
    component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
