import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-expire',
  templateUrl: './expire.component.html',
  styleUrls: ['./expire.component.scss']
})
export class ExpireComponent implements OnInit {

  constructor(private router: Router, public _auth: AuthService) { }

  ngOnInit(): void {

  }

  number(sec : any){
    return Math.floor(sec / 60);
  }
}
