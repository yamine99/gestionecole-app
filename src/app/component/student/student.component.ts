import { Component, OnInit } from '@angular/core';
import {DialogService} from "../../shared/dialog.service";
import {LayoutService} from "../../service/layoutService";
import {StudentService} from "../../service/student.service";
import {Observable, ReplaySubject} from "rxjs";
import {Student} from "../../model/student";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  student !: Student;
  ready : boolean =false;
  uuid !: string;
  constructor( private _studentService: StudentService,    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uuid =  this.route.snapshot.params['id'];
    this._studentService.getByUuid(this.uuid).subscribe(value =>{
          this.student =value;
          this.ready = !this.ready
    }

    );
  }



}
