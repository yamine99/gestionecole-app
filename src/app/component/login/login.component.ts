import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor( private _formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this._formBuilder.group({
      mail:[null, Validators.required],
      password : [null, Validators.required],
    },{
      updateOn:'blur'
    });

  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  register(){
    this.router.navigateByUrl("/enregistrer").then(r => console.log(r));
  }
}
