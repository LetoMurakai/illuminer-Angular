


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

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]
  usuario: Usuario = new Usuario()

  nome = environment.nome
  foto = environment.foto
  id = environment.id
  
  constructor(
    private router: Router,
    private PostagemService: PostagemService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert('sua sessão expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }
    this.PostagemService.refreshToken()
    this.findAllPostagens()
  }
  findAllPostagens(){
    this.PostagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }
  publicar(){
      
      this.PostagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem feita com sucesso')
      this.findAllPostagens()
      this.postagem = new Postagem()

    })
  }

}