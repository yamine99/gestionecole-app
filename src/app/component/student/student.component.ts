import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {Student} from "../../model/student";
import {ActivatedRoute} from "@angular/router";
import {Cours} from "../../model/cours";
import {CoursService} from "../../service/cours.service";

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
    student !: Student;
    ready: boolean = false;
    uuid !: string;
    courseList !: Cours[];
    coursestudent: Cours[] = [];
     displayedColumns: string[] = ['name', 'nbr'];
     dataSource !: any[];
    constructor(private _studentService: StudentService, private _courseService: CoursService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.uuid = this.route.snapshot.params['id'];

        this._studentService.getByUuid(this.uuid).subscribe(value => {
            this.student = value;
        });


        this._courseService.getAll().subscribe(value => {
            this.courseList = value
        });

        this._courseService.getAllLinksStudent(this.uuid).subscribe(value => {

            value.forEach((element, index) => {

                this.courseList?.forEach(item => {
                    if (item.id === element.idCourse) {
                        console.log(item);
                        this.coursestudent.push(item);
                    }
                });


            });

            this.ready = !this.ready;
        });


    }
}
