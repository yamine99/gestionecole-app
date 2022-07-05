import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Router} from "@angular/router";
import {StudentService} from "../../service/student.service";

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
  constructor(private router: Router,  private _formBuilder: FormBuilder, private _studentService: StudentService,  ) { }

  ngOnInit() {

    this.addForm = this._formBuilder.group({
      lastName:[null, Validators.required],
      firstName : [null, Validators.required],
      date : [null, Validators.required],
      address : [null, Validators.required],
      formation : [null],
      phone : [null],
      email: [null, Validators.required]
    },{
      updateOn:'blur'
    });

  }

  onSubmit() {
    this.loading = !this.loading;
    this._studentService.addStudent(this.addForm.value).subscribe( value => {
      this.loading = !this.loading;
      this.msg="L'étudiant à été bien enregistrer ";
      console.log(value);
      console.log(this.addForm.value);
      this.addForm.reset();
    })


  }


  onRest() {
    this.msg ="";
    this.loading = !this.loading;
    this.addForm.reset();
  }
}
