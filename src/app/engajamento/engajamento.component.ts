import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Curtida } from '../model/Curtida';
import { CurtidaPK } from '../model/CurtidaPK';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { PostagemDestaqueComentario } from '../model/PostagemDestaqueComentario';
import { PostagemDestaqueCurtida } from '../model/PostagemDestaqueCurtida';
import { UsuarioDestaque } from '../model/UsuarioDestaque';
import { EngajamentoService } from '../service/engajamento.service';
import { PostagemService } from '../service/postagem.service';
@Component({
  selector: 'app-engajamento',
  templateUrl: './engajamento.component.html',
  styleUrls: ['./engajamento.component.css']
})
export class EngajamentoComponent implements OnInit {
  darkMode = environment.darkMode
  usuarioDestaque: UsuarioDestaque = new UsuarioDestaque
  destaqueComentario: PostagemDestaqueComentario = new PostagemDestaqueComentario
  destaqueCurtida: PostagemDestaqueCurtida = new PostagemDestaqueCurtida
  paginaPostagem: PaginaPostagem

  constructor(
    private engajamentoService: EngajamentoService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.engajamentoService.refreshToken()
    this.obterUsuarioDestaque()
    this.obterPostagemDestaqueComentario()
    this.obterPostagemDestaqueCurtida()
  }

  findByIdUsusarioDestaque(id: number){
    this.engajamentoService.refreshToken()
    this.engajamentoService.getById(id).subscribe((resp: UsuarioDestaque) =>{
      console.log(resp)
      this.usuarioDestaque = resp
    })
  }

  obterUsuarioDestaque(){
    this.engajamentoService.refreshToken()
    this.engajamentoService.usuarioMaisEngajado().subscribe((resp: UsuarioDestaque) => {
      this.usuarioDestaque = resp
    })

  }

  obterPostagemDestaqueComentario(){
    this.engajamentoService.postagemDestaque().subscribe((resp: PostagemDestaqueComentario) => {
      this.destaqueComentario = resp

    })

  }
  obterPostagemDestaqueCurtida(){
    this.engajamentoService.postagemDestaqueCurtida().subscribe((resp: PostagemDestaqueCurtida) =>{
      this.destaqueCurtida = resp
    })

  }




  pegarId(id: any) {
    environment.idDestaqueComentario = id
    environment.textoPesquisaPostagem = ''
    environment.idUsuarioPerfil = 0
    this.router.navigate(['/pagina-inicio'])
    setTimeout(() => {
      this.router.navigate(['/feed'])
    }, 1);
  }


  abrirPerfil(idUsuario: number) {
    environment.idUsuarioPerfil = idUsuario
    environment.textoPesquisaPostagem = ''
    environment.idDestaqueComentario = 0
    environment.posicaoScroll = 0
    this.router.navigate(['/feed'])
        setTimeout(() => {
          this.router.navigate([`/perfil/${idUsuario}`])
        }, 30);
  }
  }

