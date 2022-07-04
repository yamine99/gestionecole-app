import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogFormComponent} from "../dialog-form/dialog-form.component";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {Student} from "../../model/student";
import {Store} from "../../shared/store";
import {Observable, ReplaySubject, Subscription} from "rxjs";
import {StudentService} from "../../service/student.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'class'];
  private students: Student[] = [];
  private store = new Store();
  constructor(private _studentService: StudentService,

            public dialog: MatDialog) {
  }




  public get dataSource(): MatTableDataSource<Student> {
    return this.store.get('data_source', new MatTableDataSource<Student>());
  }



  private get subscription(): Subscription {
    return this.store.get('subscription', new Subscription());
  }

  private get dataTable(): Observable<Student[]> {

      return this.store.get('data_table', this._studentService.getAll());

  }

  public get ready(): ReplaySubject<boolean> {
    return this.store.get('ready', new ReplaySubject<boolean>());
  }

  ngOnInit(): void {

    this.subscription.add(
        this.dataTable.subscribe(
            (result) => {
            //  result = result.filter(value => value.state === false && value.refuse === false);
              this.dataSource.data = result;
              this.students = result;
              this.ready.next(true);
            }
        )
    )
  }


  openDialogForm() {
    this.dialog.open(DialogFormComponent,

        {
          width: '300px',
          panelClass: 'confirm-dialog-container',
          disableClose: true
        });
  }
}
