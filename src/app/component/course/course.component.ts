import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Cours} from "../../model/cours";
import {CoursService} from "../../service/cours.service";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { CourseLink } from 'src/app/model/course-link.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    dataCours !:  Observable<Cours[]>;
    dataLinksObs !:  Observable<CourseLink[]>;
    dataStudentsObs !:  Observable<Student[]>;
    searchStudentList !: Array<Student>;  
    dataStudentsSub : Subject<Student[]> = new Subject();


    loading : boolean=false;
    dataForm !: FormGroup;

    displayedColumns: string[] = ['nom', 'prenom', 'dateofbirth', 'adresse'];
    dataSource !: any[];

  constructor(private _coursStudent: CoursService, private _studentService : StudentService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchStudentList = new Array<Student>();
    this.dataCours = this._coursStudent.getAll();
   
    //this.dataStudentsObs = this._studentService.getAll();

    this.dataStudentsObs.subscribe(this.dataStudentsSub);

    this.dataLinksObs = this._coursStudent.getAllLinks();
    this.dataLinksObs.forEach((value) =>{
        console.log(value);
      }
    )

    this.dataForm = this._formBuilder.group({
      cours:[null, Validators.required]
    },{
      updateOn:'blur'
    });


  }

  onChangeCours($event: MatSelectChange) {
    // Todo
    console.log("id cource from event : " + $event.value)
    this.searchStudentList= new Array<Student>();
    this.dataLinksObs.forEach((value : CourseLink[])=>{
      value.forEach((link)=>{
          if(link.idCourse == $event.value){
            console.log("Course "+link.idCourse);
            this.dataStudentsObs.pipe().forEach((value : Student[])=>{
                value.forEach((student)=>{
                  if(student.uuid == link.idStudent){
                    console.log("STUDENT "+link.idStudent);
                    this.searchStudentList.push(student);
                    console.log(this.searchStudentList);
                    this.dataStudentsSub.next(this.searchStudentList);
                  }
                })
            })
          }
      })
    })
  }

  onChangeStudent($event: MatSelectChange) {
    console.log($event.value);
  }
}
