import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    public isSidenavOpen: boolean = false;


    /**
     * LayoutService constructor
     */
    public constructor() {
    }

    /**
     * Methods
     */
    public toggleSidenav(): void {
        this.isSidenavOpen = !this.isSidenavOpen;

    }
}