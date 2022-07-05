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
  msg !: string;
  constructor(private _formBuilder: FormBuilder, private router: Router, private _auth: AuthService) { }

  ngOnInit(): void {

    if (this._auth.getToken('token') != null) {
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
          console.log(response.body);
          this._auth.saveToken(response.body);

          this.router.navigateByUrl('').then(r => console.log(r));
               this._auth.countdown();
        },
        error: (error) => {
          this.msg = "Accès refusée !"

          setTimeout(() => {
            this.msg = "";
          }, 3000);

          console.log(error);
        }
      }
    )
  }

  register() {
    this.router.navigateByUrl("/enregistrer").then(r => console.log(r));
  }
}
