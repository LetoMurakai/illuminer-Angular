import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { ComentarioService } from '../service/comentario.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  comentario : Comentario = new Comentario
  listaComentario: Comentario[]
  foto = environment.foto
  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){
  }
  findAllComentario(id:number){
    this.postagemService.getAllComentarios(id).subscribe((resp: Comentario[])=>{
      this.listaComentario = resp
    })
  }
  publicarComentario(){
    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) =>{
      this.comentario = resp
      this.comentario = new Comentario()
    })
  }

}
