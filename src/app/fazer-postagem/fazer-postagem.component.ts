import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-fazer-postagem',
  templateUrl: './fazer-postagem.component.html',
  styleUrls: ['./fazer-postagem.component.css']
})
export class FazerPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem
  usuario: Usuario = new Usuario
  nomeUsuarioLogado = environment.nome
  listaPostagem: Postagem[]

  constructor(
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    this.findAllPostagens()
  }
  
  findAllPostagens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }
  cancelar(){
    this.postagem =new Postagem()
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

