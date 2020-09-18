import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario = {
    nombre: '',
    correo: '',
    password: '',
  };

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm){

    console.log(registerForm.value);

    // if (loginForm.invalid) { return; }
    // this.spinner.show();

    // const correo = loginForm.controls.correo.value;
    // const password = loginForm.controls.password.value;
    // const recordar = loginForm.controls.recuerdame.value;

    // this.authService.login(correo, password, recordar).subscribe(() => {

    //   this.spinner.hide();
    // }, () => {
    //   this.spinner.hide();
    //   this.authService.mostrarSwal('', 'Email y/o contraseña incorrecta', 'error', 'Entendido');
    // });

  }
}
