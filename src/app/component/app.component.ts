import { Component } from '@angular/core';
import {DialogService} from "../shared/dialog.service";
import {LayoutService} from "../service/layoutService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gestionecole-app';
constructor(private _dialogService: DialogService,     public _layout: LayoutService,) {
}
  logout(): void {
    this._dialogService.openConfirmDialog("Voulez-vous vraiment quitter ?").afterClosed().subscribe(
        res => {
          if (res) {
            /*this.router.navigateByUrl('logout').then(() => {
              this._authService.logout(this.token);
            });*/
          }
        })


  }
}
