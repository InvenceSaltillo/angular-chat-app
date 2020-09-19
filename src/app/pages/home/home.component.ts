import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('message') message: ElementRef;

  usuarioId = '';
  messageToSend = '';
  loading = true;


  constructor( public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
               public chatService: ChatService) {

    this.activatedRoute.params.subscribe( params => {

      this.usuarioId = params.id;
      this.loading = false;
    });

    console.log(this.chatService.usuarioPara);
  }

  ngOnInit(): void {
    this.usuarioId = this.authService.usuario.uid;
    console.log(this.usuarioId);
  }

  agregarMensaje(mensaje: any){
  }

  triggerFunction(event: KeyboardEvent){
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('ENTER!!!');
      this.messageToSend = '';
    }
  }

  send(){
    console.log(this.messageToSend);
    this.messageToSend = '';
    this.message.nativeElement.focus();
  }

}
