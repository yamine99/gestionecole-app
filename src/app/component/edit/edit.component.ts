import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {CoursService} from "../../service/cours.service";
import {Student} from "../../model/student";
import {Cours} from "../../model/cours";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  updateForm !: FormGroup;
  dataProjects !: any ;

  loading = false;
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  msg !: string;
  uuid !: string;

  student !: Student;
  ready : boolean =false;
  constructor(private router: Router,      private _dialogService: DialogService,
              private _formBuilder: FormBuilder, private _studentService: StudentService,
              private _courseService: CoursService,   private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.uuid =  this.route.snapshot.params['id'];

    this.updateForm = this._formBuilder.group({
      uuid:[ null],
      lastName:[ null, Validators.required],
      firstName : [null, Validators.required],
      date : [null, Validators.required],
      address : [null, Validators.required],
      phone : [null, Validators.required],
      email: [null, Validators.required]
    },{
      updateOn:'blur'
    });

    this._studentService.getByUuid(this.uuid).subscribe(value =>{
      this.student =value;
      this.ready = !this.ready;
      this.updateForm.controls['uuid'].setValue( this.student.uuid);
      this.updateForm.controls['lastName'].setValue( this.student.nom);
      this.updateForm.controls['firstName'].setValue( this.student.prenom);
      this.updateForm.controls['date'].setValue( this.student.dateNaissance);
      this.updateForm.controls['email'].setValue( this.student.email);
      this.updateForm.controls['address'].setValue( this.student.adresse);
      this.updateForm.controls['phone'].setValue( this.student.telephone);


    });






  }

  onSubmit() {

    this._dialogService.openConfirmDialog("Voulez-vous vraiment modifier cet étudiant ?").afterClosed().subscribe(
        res => {
          if (res) {
            this.loading = !this.loading;
            this._studentService.updateStudent(this.updateForm.value).subscribe( value => {
              this.loading = !this.loading;
              this.msg="L'étudiant à été bien modifier ";
              console.log(this.updateForm.value);
              setTimeout(() => {
                this.msg = "";
              }, 3000);
              this.updateForm.reset();
            });

          }
        })



  }


  onRest() {
    this.msg ="";
    this.updateForm.reset();
  }
}
