import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NotificationsComponent]
})

@NgModule({
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ]
})

export class LoginComponent implements OnInit {
  options: FormGroup;
  statusLogin: boolean;
  // Instanciando Formulario Reactivo
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  constructor(fb: FormBuilder, private _notification:NotificationsComponent, private _router: Router) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  // Variable For Password
  hide = true;
  ngOnInit() {
  }
private _dataUsers:any;
  login() {
    this._dataUsers = this.loginForm.value;

    let user = "admin";
    let pass = "admin";
      if(user == this._dataUsers.username && pass == this._dataUsers.password){
        this.statusLogin = true;
      } else {
        this.statusLogin = false;
      }

      this.statusLogin ? this._router.navigate(['/loading']) : this._notification.notificationOpen('error', 'Error!', 'Error al iniciar sesion');

  }
}
