import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../component/dialog-confirm/dialog-confirm.component";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    openConfirmDialog(msg: string) {
        return this.dialog.open(DialogConfirmComponent, {
            width: '500px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                message: msg
            }
        });
    }

}