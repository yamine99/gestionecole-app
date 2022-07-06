import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
    selector: 'app-expire',
    templateUrl: './expire.component.html',
    styleUrls: ['./expire.component.scss']
})
export class ExpireComponent implements OnInit {

    date !: Date;
    isValid: boolean = false;

    constructor(private router: Router, public _auth: AuthService) {
    }

    ngOnInit(): void {
      this.countdown();
    }

    countdown() {
        // check for token
        if (this._auth.getToken('token')) {
            // @ts-ignore
            let tokenDate = new Date(this._auth.getToken('expiration'));
            this.isValid = false;
            this.date = new Date(tokenDate.getTime() - Date.now());
            if (this.date.getMinutes() <= 14 && this.date.getSeconds() < 20) {
                this.isValid = true;
            }

            if (this.date.getMinutes() == 13 && this.date.getSeconds() == 0) {
                this.router.navigateByUrl('/connexion').then(() => {
                    this.isValid = false;
                    this._auth.removeToken();
                });
            }
        } else {
            this.router.navigateByUrl('/connexion').then(() => {
                this.isValid = false;
                this._auth.removeToken();
            });
        }

      setTimeout(() => {
        this.countdown();
      }, 1000);
    }


}
