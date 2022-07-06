import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";


import {MatTableDataSource} from "@angular/material/table";
import {Student} from "../../model/student";
import {Store} from "../../shared/store";
import {Observable, ReplaySubject, Subscription} from "rxjs";
import {StudentService} from "../../service/student.service";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {DialogService} from "../../shared/dialog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public displayedColumns: string[] = ['lastName', 'firstName', 'date', 'email','addresse', 'phone','action'];
  private students: Student[] = [];
  private store = new Store();
  msg !: string;

    public nameValues: string[] = [];

  constructor(private _studentService: StudentService,
              private router: Router, private _auth: AuthService,
              private _dialogService: DialogService,
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
      if(this._auth.getToken('token')===null){
          this.router.navigateByUrl("/connexion").then(r => console.log(r));
      }
      this.subscription.add(
          this.formGroup.valueChanges.subscribe(result => {
              this.filterstudents(result);
          }))
      this.refresh();
  }

  refresh(){
      this.subscription.add(
          this.dataTable.subscribe(
              (result) => {
                  console.log(result);
                  //  result = result.filter(value => value.state === false && value.refuse === false);
                  this.dataSource.data = result;
                  this.students = result;
                  this.createOptions(result);
                  this.ready.next(true);
              }
          )
      )
  }

    delete(uuid: string) {
        this._dialogService.openConfirmDialog("Voulez-vous vraiment supprimer !").afterClosed().subscribe(
            res => {
                if (res) {
                    this.ngOnInit();
                    this._studentService.deleteStudent(uuid).subscribe(value => {

                        this.msg = value.result;
                        setTimeout(() => {
                            this.msg = '';
                            this.refresh();
                        }, 4000);
                    });
                }
            });



    }


    public get formGroup(): FormGroup {
        return this.store.get(
            'filterForm',
            new FormGroup({
                nameValues: new FormControl('', Validators.required),


            })
        );
    }

    private createOptions(students: Student[]) {

        students.map(value => {
            this.nameValues.includes(value.prenom+" "+value.nom) ? true : this.nameValues.push(value.prenom+" "+value.nom);

        });
       // Utils.array.sort(this.nameValues);

    }

    public resetFilter(formValue: any, event: Event) {
        this.formGroup.get(formValue)?.setValue('');
        event.stopPropagation();

    }

    private filterstudents(result: any) {
        this.dataSource.data = this.students;
        if (result.nameValues !== '') {
            this.dataSource.data = this.dataSource.data.filter(value => value.prenom+" "+value.nom === result.nameValues)
        }

        console.log(this.dataSource.data);
    }
}
