import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { StudentComponent } from './component/student/student.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import {HomeComponent} from "./component/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
