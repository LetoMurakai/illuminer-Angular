import { Component, OnInit } from '@angular/core';
import { Comentario } from '../model/Comentario';
import { Usuario } from '../model/Usuario';
import { ComentarioService } from '../service/comentario.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {
  
  comentario: Comentario = new Comentario
  usuario: Usuario = new Usuario
  textoDoComentario = this.comentario.texto
  listaComentario: Comentario[] 
  displayComentarios = "none"
  constructor(
    private comentarioService: ComentarioService
  ) { }

  ngOnInit() {
  }
  findAllComentarios(){
    this.comentarioService.getAllComentario().subscribe((resp: Comentario[])=>{
      this.listaComentario = resp
  }
    )}
}

