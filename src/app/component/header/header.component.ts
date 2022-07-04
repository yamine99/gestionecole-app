import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from "../../service/layoutService";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  token !: string | undefined;
  mail !: string | undefined;


  constructor(

      public _layout: LayoutService,
      private router: Router,
      private _dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
   /* this._authService.user.subscribe(value => {
      this.token = value?.token;
      this.mail = value?.email
    });*/
  }

  logout(): void {
    this._dialogService.openConfirmDialog("Voulez-vous vraiment quitter ?").afterClosed().subscribe(
        res => {
          if (res) {
            this.router.navigateByUrl('logout').then(() => {
          //    this._authService.logout(this.token);
            });
          }
        })


  }
}
