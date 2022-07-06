import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Cours } from "../../model/cours";
import { CoursService } from "../../service/cours.service";
import { MatSelectChange } from "@angular/material/select";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { CourseLink } from 'src/app/model/course-link.model';
import { DialogService } from "../../shared/dialog.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  dataCours !: Observable<Cours[]>;
  dataLinksObs !: Observable<CourseLink[]>;
  dataStudentsObs !: Observable<Student[]>;
  dataSource: Student[] = [];
  studentArray: Student[] = [];


  loading: boolean = false;
  dataForm !: FormGroup;

  displayedColumns: string[] = ['nom', 'prenom', 'dateofbirth', 'adresse'];
  isValid!: boolean;
  msg !: string;

  constructor(private _courService: CoursService,
    private _dialogService: DialogService,
    private _studentService: StudentService, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    // Get all students, links and courses
    this.dataStudentsObs = this._studentService.getAll();
    this.dataCours = this._courService.getAll();
    this.dataLinksObs = this._courService.getAllLinks();

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
    let linksArray: CourseLink[] = [];
    this._courService.getByCourse($event.value).subscribe({
      next: (res) => {
        linksArray = res;
        if (linksArray.length == 0) {
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
              if (res != null) {
                this.studentArray.push(res);
                this.dataSource = this.studentArray;
              }              
            },
            error : (error) => console.log(error)
          });
        });
      },
      error: (error) => console.log(error)
    });
  }

  onChangeStudent($event: MatSelectChange) {
    console.log($event.value);
  }

  resetFilter(){
    this.dataSource.slice(0, this.dataSource.length);
    this.dataSource = [];
    this.ngOnInit();
    this.dataForm.reset();
  }

  add() {

    this._dialogService.openConfirmDialog("Voulez-vous associer cette étudiant ?").afterClosed().subscribe(
      res => {
        if (res) {
          this._courService.getAllLinks().subscribe(value => {
            if (value.some(e => e.idStudent == this.dataForm.value["student"] && e.idCourse == this.dataForm.value["cours"])) {
              console.log('Exists');
              this.isValid = false;
              this.msg = "L'étudiant suit déjà ce cours";

            } else {
              this._courService.association(this.dataForm.value["student"], this.dataForm.value["cours"]).subscribe(
                value => console.log('not Exists')
              );
              this.isValid = true;
              this.msg = " Le cours a bien été associé à cet étudiant.";
            }
          })

        }
        setTimeout(() => {
          this.msg = '';
          this.isValid = false;
          this.ngOnInit();
        }, 4000);
      });

  }


}
