import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {
  color = 'white';
  mode = 'indeterminate';
  value = 50;
  statustime: boolean = false;
  constructor( private _router: Router) { 
  }

  ngOnInit() {

  }

  gotoHome() {
    this._router.navigate(['/home']);
  }

}
