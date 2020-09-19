import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario, UsuarioClass } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';


import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioClass;
  apiUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }


  login(email: string, password: string, recordar = false ): Observable<boolean> {

    if ( recordar ) {
      localStorage.setItem('correo', email );
    } else {
      localStorage.removeItem( 'correo' );
    }

    const data = {email, password};
    const headers = {'Content-Type': 'application/json'};

    return this.http.post<boolean>(`${this.apiUrl}login/`, JSON.stringify(data), { headers})
    .pipe( map( (resp: any ) => {
      this.usuario = resp.usuario;
      this.guardarToken(resp.token);
      return true;

    }), catchError( e => {
      return throwError(e);
    }));

  }

  register(nombre: string, email: string, password: string ): Observable<boolean> {

    const data = {nombre, email, password};
    const headers = {'Content-Type': 'application/json'};

    return this.http.post<boolean>(`${this.apiUrl}login/new`, JSON.stringify(data), { headers})
    .pipe( map( (resp: any ) => {
      this.usuario = resp.usuario;
      this.guardarToken(resp.token);
      return true;

    }), catchError( e => {
      return throwError(e);
    }));

  }

  isLoggedIn( ): Observable<boolean> {

    const token = localStorage.getItem('token');

    const headers = {'x-token': token};

    return this.http.get<boolean>(`${this.apiUrl}login/renew`, {headers})
    .pipe( map( (resp: any ) => {
      console.log(resp);
      this.usuario = resp.usuario;
      this.guardarToken(resp.token);
      return true;

    }), catchError( e => {
      return throwError(e);
    }));
  }

  async guardarToken(token: string){
    await localStorage.setItem('token', token);
    return;
  }

  logOut(){
    localStorage.removeItem('token');
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
