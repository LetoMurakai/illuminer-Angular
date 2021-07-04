import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {
  
  comentario: Comentario = new Comentario
  usuario: Usuario = new Usuario
  fotoUsuario = this.comentario.usuario.foto
  nomeUsuario = this.comentario.usuario.nome
  textoDoComentario = this.comentario.texto
  
  displayComentarios = "none"
  constructor() { }

  ngOnInit(): void {
  }

}
