import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  postagem: Postagem = new Postagem
  foto = environment.foto
  nome = environment.nome
  data = this.postagem.data
  texto = this.postagem.texto
  midia = this.postagem.midia
  displayComentarios = "none"
  listaPostagem: Postagem[]
  constructor(
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){
    this.findAllPostagens()
  }

  comentar() {
    this.displayComentarios = "block"
  }

  verComentarios() {
    if(this.displayComentarios == "none") {
      this.displayComentarios = "block"
    } else {
      this.displayComentarios = "none"
    }
  }
  findAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }
}
