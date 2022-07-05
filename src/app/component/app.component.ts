import { Component } from '@angular/core';
import {DialogService} from "../shared/dialog.service";
import {LayoutService} from "../service/layoutService";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestionecole-app';
    constructor(
        public _auth: AuthService,
        public _layout: LayoutService,
        private router: Router,
        private _dialogService: DialogService
    ) {

    }


    logout(): void {
        this._dialogService.openConfirmDialog("Voulez-vous vraiment quitter ?").afterClosed().subscribe(
            res => {
                if (res) {
                    this.router.navigateByUrl('/connexion').then(() => {
                        this._auth.removeToken();
                    });
                }
            })


    }




}

