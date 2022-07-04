import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  constructor( private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this._formBuilder.group({
      lastName:[null, Validators.required],
      firstName:[null, Validators.required],
      mail:[null, Validators.required],
      password : [null, Validators.required],
      confirmPassword : [null, Validators.required],
    },{
      updateOn:'blur'
    });

  }
  onSubmit() {
    console.log(this.registerForm.value);
  }
  back(){
    this.router.navigateByUrl("/connexion").then(r => console.log(r));
  }
}
