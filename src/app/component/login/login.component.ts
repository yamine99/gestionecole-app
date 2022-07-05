import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(private _formBuilder: FormBuilder, private router: Router, private _auth: AuthService) { }

  ngOnInit(): void {

    if (this._auth.getToken() != null) {
      this.router.navigateByUrl("").then(r => console.log(r));
    } else {
      this.loginForm = this._formBuilder.group({
        mail: [null, Validators.required, Validators.email],
        password: [null, Validators.required],
      }, {
        updateOn: 'blur'
      });
    }

  }

  onSubmit() {
    this._auth.login(this.loginForm.value["mail"], this.loginForm.value["password"]).subscribe(
      {
        next: (response) => {
          this._auth.saveToken(response.body);
          this.router.navigateByUrl('/accueil').then(r => console.log(r));
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  register() {
    this.router.navigateByUrl("/enregistrer").then(r => console.log(r));
  }
}
