
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {Observable} from "rxjs";
@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  investmentForm !: FormGroup;
  dataProjects !: any ;

  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  constructor(private router: Router,  private _formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.investmentForm = this._formBuilder.group({
      society:[null, Validators.required],
      project : [null, Validators.required],
      location : [null, Validators.required],
      title : [null, Validators.required, Validators.minLength(5),
        Validators.pattern('[a-zA-Z]*')],
      amount : [null, Validators.min(500)],
      budgeted: [false, Validators.required]
    },{
      updateOn:'blur'
    });

  }

  onSubmit() {
    console.log(this.investmentForm.value);
  }

}
