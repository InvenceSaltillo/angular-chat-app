import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  usuario = {
    correo: '',
    password: '',
    recuerdame: false
  };

  constructor( private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.usuario.correo = localStorage.getItem( 'correo' ) || '';
    if ( this.usuario.correo.length > 1 ) { this.usuario.recuerdame = true; }
  }

  onSubmit(loginForm: NgForm){

    if (loginForm.invalid) { return; }
    this.spinner.show();

    const correo = loginForm.controls.correo.value;
    const password = loginForm.controls.password.value;
    const recordar = loginForm.controls.recuerdame.value;

    this.authService.login(correo, password, recordar).subscribe(() => {

      this.spinner.hide();
    }, () => {
      this.spinner.hide();
      this.authService.mostrarSwal('', 'Email y/o contraseña incorrecta', 'error', 'Entendido');
    });

  }

}
