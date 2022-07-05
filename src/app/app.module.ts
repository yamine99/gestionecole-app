import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';
import { StudentComponent } from './component/student/student.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import {HomeComponent} from "./component/home/home.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";

import {MatFormFieldModule} from "@angular/material/form-field";
import { ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {LayoutModule} from "./module/layout.module";
import {MaterialModule} from "./module/material/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './component/register/register.component';
import { FormComponent } from './component/form/form.component';
import { CourseComponent } from './component/course/course.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptors';


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    DialogConfirmComponent,
    RegisterComponent,
    FormComponent,
    CourseComponent,
    NotFoundComponent
  ],
      entryComponents: [ DialogConfirmComponent]
    ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MaterialModule,
      HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'fr-FR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
