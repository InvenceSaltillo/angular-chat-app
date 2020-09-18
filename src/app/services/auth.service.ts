import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;
  autenticando = false;
  apiUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }


  public get _autenticando(): boolean {
    return this.autenticando;
  }

  public set _autenticando(value: boolean) {
    this.autenticando = value;
  }

  login(email: string, password: string, recordar = false ): Observable<boolean> {

    this.autenticando = true;


    if ( recordar ) {
      localStorage.setItem('correo', email );
    } else {
      localStorage.removeItem( 'correo' );
    }

    const data = {email, password};
    const headers = {'Content-Type': 'application/json'};

    return this.http.post<boolean>(`${this.apiUrl}login/`, JSON.stringify(data), { headers});

  }


  mostrarSwal( title: string, html: string, icon: SweetAlertIcon, confirmButtonText: string ) {
    Swal.fire({
      title,
      html,
      icon,
      confirmButtonText,
      confirmButtonColor: '#3669EB'
    }).then( ( result ) => {
      if ( result.value ) {
        return result.value;
      }
    });
  }
}
