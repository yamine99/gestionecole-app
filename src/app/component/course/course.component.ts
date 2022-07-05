import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Cours} from "../../model/cours";
import {CoursService} from "../../service/cours.service";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    dataCours$ !:  Observable<Cours[]>;
    loading : boolean=false;
     coursForm !: FormGroup;


  constructor(private _coursStudent: CoursService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.dataCours$ = this._coursStudent.getAll();
    this._coursStudent.getAll().subscribe(value => console.log(value));
    this.coursForm = this._formBuilder.group({
      cours:[null, Validators.required],
      password : [null, Validators.required],
    },{
      updateOn:'blur'
    });
  }

  onChangeCours($event: MatSelectChange) {
    console.log($event.value);
  }
}
