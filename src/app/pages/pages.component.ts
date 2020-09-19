import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { UsuarioClass } from '../models/usuario.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  constructor( public authService: AuthService, private router: Router, public usuarioService: UsuariosService,
               private chatService: ChatService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((logged: boolean) => {
      if (!logged){
        this.cerrarSesion();
      }
    } );

    this.getUsuarios();
  }

  getUsuarios(){

    this.usuarioService.getUsuarios().subscribe(() => {});

  }

  usuarioPara(usuario: UsuarioClass){
    this.chatService.usuarioPara = usuario;

    this.chatService.getMensajes(this.chatService.usuarioPara.uid).subscribe(() => {
      this.router.navigate(['home']);

    });
  }

  cerrarSesion(){
    this.authService.logOut();
    this.router.navigate(['login']);
  }

}
