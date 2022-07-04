import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {Router} from "@angular/router";

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

  constructor(private router: Router,  private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.addForm = this._formBuilder.group({
      lastName:[null, Validators.required],
      firstName : [null, Validators.required],
      date : [null, Validators.required],
      address : [null, Validators.required],
      formation : [null, Validators.min(500)],
      email: [null, Validators.required]
    },{
      updateOn:'blur'
    });

  }

  onSubmit() {
    this.loading = !this.loading;
    console.log(this.addForm.value);
    this.addForm.reset();
  }


  onRest() {
    this.loading = !this.loading;
    this.addForm.reset();
  }
}
