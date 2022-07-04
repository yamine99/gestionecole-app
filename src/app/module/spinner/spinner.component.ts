import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() public loading!: boolean | null;
  @Input() public diameter?: number;

  /**
   * SpinnerComponent constructor
   */
  public constructor() { }
}