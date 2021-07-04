import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  postagem: Postagem = new Postagem
  usuario: Usuario = new Usuario
  nomeUsuario = environment.nome
  nome = this.postagem.usuario.nome
  data = this.postagem.data
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
  publicar(){
      
    this.postagem.usuario.id = environment.id
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
    this.postagem = resp
    alert('Postagem feita com sucesso')
    this.findAllPostagens()
    this.postagem = new Postagem()

  })
}
}
