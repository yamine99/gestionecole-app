import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  addForm !: FormGroup;
  dataProjects !: any ;

  loading = false;
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  msg !: string;
  constructor(private router: Router,  private _formBuilder: FormBuilder, private _studentService: StudentService,        private _dialogService: DialogService) { }

  ngOnInit() {

    this.addForm = this._formBuilder.group({
      lastName:[null, Validators.required],
      firstName : [null, Validators.required],
      date : [null, Validators.required],
      address : [null, Validators.required],
      formation : [null],
      phone : [null, Validators.required],
      email: [null, Validators.required]
    },{
      updateOn:'blur'
    });

  }

  onSubmit() {
    this._dialogService.openConfirmDialog("Voulez-vous vraiment ajouter ?").afterClosed().subscribe(
        res => {
          if (res) {
            this.loading = true;
            this._studentService.addStudent(this.addForm.value).subscribe( value => {

              this.msg="L'étudiant à été bien enregistrer ";
              console.log(this.addForm.value);
              setTimeout(() => {
                this.msg = "";
                this.loading = !this.loading;
                this.addForm.reset();
                this.router.navigateByUrl("").then(r => console.log(r));
              }, 2000);

            })


          }
        })



  }


  onRest() {
    this.msg ="";
    this.addForm.reset();
  }
}
