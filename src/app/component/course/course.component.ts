import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from "rxjs";
import { Cours } from "../../model/cours";
import { CoursService } from "../../service/cours.service";
import { MatSelectChange } from "@angular/material/select";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { CourseLink } from 'src/app/model/course-link.model';
import { DialogService } from "../../shared/dialog.service";
import { Store } from 'src/app/shared/store';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

  dataCours !: Observable<Cours[]>;
  dataLinksObs !: Observable<CourseLink[]>;
  dataStudentsObs !: Observable<Student[]>;
  dataSource: Student[] = [];
  studentArray: Student[] = [];

  loading: boolean = false;
  dataForm !: FormGroup;

  displayedColumns: string[] = ['nom', 'prenom', 'dateofbirth', 'adresse'];

  constructor(private _coursService: CoursService,
    private _dialogService: DialogService,
    private _studentService: StudentService, private _formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    // Get all students, links and courses
    this.dataStudentsObs = this._studentService.getAll();
    this.dataCours = this._coursService.getAll();
    this.dataLinksObs = this._coursService.getAllLinks();

    // initialise table
    this.dataStudentsObs.forEach((value) => value.forEach((value1) => this.dataSource.push(value1)));

    // init form
    this.dataForm = this._formBuilder.group({
      cours: [null, Validators.required],
      student: [null, Validators.required]
    }, {
      updateOn: 'blur'
    });
  }

  onChangeCours($event: MatSelectChange) {

    console.log("id cource from event : " + $event.value)
    let linksArray : CourseLink[] = [];
    this._coursService.getByCourse($event.value).subscribe({
      next : (res) => {
        linksArray = res;
        if(linksArray.length == 0){
          this.dataSource.slice(0, this.dataSource.length);
          this.dataSource = [];
        }
        linksArray.forEach(link => {
          this.studentArray.slice(0, this.studentArray.length);
          this.studentArray = [];
          this.dataSource.slice(0, this.dataSource.length);
          this.dataSource = [];
          this._studentService.getByUuid(link.idStudent).subscribe({
            next: (res) => {
              this.studentArray.push(res);
              this.dataSource = this.studentArray;
            }
          });
        });
      }
    });
  }

  onChangeStudent($event: MatSelectChange) {
    console.log($event.value);
  }

  add() {
    console.log(this.dataForm.value);

    this._dialogService.openConfirmDialog("Voulez-vous associer cette étudiant ?").afterClosed().subscribe(
      res => {
        if (res) {
          //  this._coursStudent.getAllLinks().subscribe(value => value.includes())
          this._coursService.association(this.dataForm.value["student"], this.dataForm.value["cours"]).subscribe(
            value => console.log("cc")
          );
        }
      });

  }
}
