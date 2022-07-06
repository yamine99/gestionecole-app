import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Cours} from "../../model/cours";
import {CoursService} from "../../service/cours.service";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from 'src/app/model/student';
import {StudentService} from 'src/app/service/student.service';
import {CourseLink} from 'src/app/model/course-link.model';
import {DialogService} from "../../shared/dialog.service";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
    dataCours !: Observable<Cours[]>;
    dataLinksObs !: Observable<CourseLink[]>;
    dataStudentsObs !: Observable<Student[]>;
    searchStudentList !: Array<Student>;


    loading: boolean = false;
    dataForm !: FormGroup;

    displayedColumns: string[] = ['nom', 'prenom', 'dateofbirth', 'adresse'];
    dataSource !: any[];
    isValid!: boolean;
    msg !: string;

    constructor(private _courService: CoursService,
                private _dialogService: DialogService,
                private _studentService: StudentService, private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.searchStudentList = new Array<Student>();
        this.dataCours = this._courService.getAll();
        this.dataStudentsObs = this._studentService.getAll();
        this.dataLinksObs = this._courService.getAllLinks();


        this.dataLinksObs.forEach((value) => {
                console.log(value);
            }
        )

        this.dataForm = this._formBuilder.group({
            cours: [null, Validators.required],
            student: [null, Validators.required]
        }, {
            updateOn: 'blur'
        });


    }

    onChangeCours($event: MatSelectChange) {
        // Todo
        console.log($event.value)

        let linksArray: CourseLink[];
        // search for students linked to this course
        this.dataLinksObs.forEach((value: CourseLink[]) => {
            // get all matching link with course
            value.filter((link) => {
                if (link.idCourse == $event.value) {
                    linksArray.push(link);
                }

                linksArray.forEach(link => {
                    // this.dataStudentsObs()
                })
                // get all matching student
                console.log(linksArray);
            });

        });

        // get all students


        console.log("id cource from event : " + $event.value)
    }

    onChangeStudent($event: MatSelectChange) {
        console.log($event.value);
    }

    add() {
        console.log(this.dataForm.value);

        this._dialogService.openConfirmDialog("Voulez-vous associer cette étudiant ?").afterClosed().subscribe(
            res => {
                if (res) {
                    this._courService.getAllLinks().subscribe(value => {
                        if (value.some(e => e.idStudent == this.dataForm.value["student"] && e.idCourse == this.dataForm.value["cours"])) {
                            console.log('Exists');
                            this.isValid = true;
                        }
                    });

                    if (!this.isValid) {
                        console.log('not Exists');
                        this._courService.association(this.dataForm.value["student"], this.dataForm.value["cours"]).subscribe(
                            value => console.log("cc")
                        );
                    }

                }


                this.msg = this.isValid ? "L'étudiant suit déjà ce cours" : " Le cours a bien été associé à cet étudiant."

                setTimeout(() => {
                    this.msg = "";
                }, 3000);
            });

    }
}
