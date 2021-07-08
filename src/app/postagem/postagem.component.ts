import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Comentario } from '../model/Comentario';
import { Usuario } from '../model/Usuario';
import { ComentarioService } from '../service/comentario.service';
import { PaginaComentario } from '../model/PaginaComentario';


@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css'],
  providers: [DatePipe]
})
export class PostagemComponent implements OnInit {

  displayComentarios = "none"

  paginaPostagem: PaginaPostagem = new PaginaPostagem()
  usuario: Usuario = new Usuario()
  idUsuarioLogado = environment.id
  postagem = new Postagem()
  idPostagem = environment.idPostagem
  comentario: Comentario  = new Comentario()
  listaComentarios: Comentario[]

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private dateTipe: DatePipe,
    private comentarioService: ComentarioService
  ) { }


  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/login'])
      console.log(environment.id)
    
    }
    
    this.postagemService.refreshToken()
    this.buscarPaginaPostagem(0, 5)
  }
  
  buscarPaginaPostagem(pagina: number, size: number) {
    this.postagemService.getPostagemPaginado(pagina, size).subscribe((resp: PaginaPostagem) => {
      resp.content?.forEach((item) => {
        if (item.tipoMidia == 'video') {
          item.midia = this.sanitizer.bypassSecurityTrustResourceUrl(item.midia);
        }
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaPostagem.content?.push(item)
      })
      this.paginaPostagem = resp
    })
  }

  definirIdPostagem(id: number) {
    this.postagem.id = id
    this.obterPostagemPorId(this.postagem.id)
  }

  definirTipoMidiaPostagem(event: any) {
    this.postagem.tipoMidia = event.target.value
  }

  atualizarPostagem() {
    this.postagem.usuario.id = environment.id
    this.postagem.titulo = null
    if (this.postagem.midia == null || this.postagem.midia == '') {
      this.postagem.tipoMidia = null
    }
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem atualizada com sucesso!')
      this.postagemService.refreshToken()
      this.buscarPaginaPostagem(0, 5)
      this.postagem = new Postagem()
    })
  }

  obterPostagemPorId(id: number) {
    this.postagemService.getById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  excluirPostagem() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      alert('Postagem apagada com sucesso!')
      this.postagemService.refreshToken()
      this.buscarPaginaPostagem(0, 5)
      this.postagem = new Postagem()
    })
  }


  /* ========================================================================== */
  /* ===============================COMENTARIOS================================ */
  

  paginaComentario: PaginaComentario = new PaginaComentario()

  buscarPaginaComentario(pagina: number, size: number){
    this.comentarioService.getComentariosPaginado(pagina,size).subscribe((resp: PaginaComentario) => {
      resp.content?.forEach((item) => {
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaComentario.content?.push(item)
      })
      this.paginaComentario = resp
    })
  }

  comentar(id: number) {
    this.usuario.id = this.idUsuarioLogado
    this.comentario.usuario = this.usuario
    this.postagem.id = id
    this.comentario.postagem = this.postagem
     this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.comentario = new Comentario()
      this.buscarPaginaPostagem(this.paginaPostagem.number, 5)
    }) 
  }
  
  definirIdComentario(id:number) {
    this.comentario.id = id
    console.log(this.comentario.id)
    this.obterComentarioPorId(this.comentario.id)
  }
  
  atualizarComentario(){
    this.comentario.usuario.id = environment.id
    this.comentarioService.putComentario(this.comentario).subscribe((resp: Comentario)=>{
      this.comentario = resp
      alert('Comentário atualizado com sucesso!')
      this.comentarioService.refreshToken()
      this.buscarPaginaComentario(0,5)
      this.comentario = new Comentario()
    })
  }

  excluirComentario(){
  
    this.comentarioService.deleteComentario(this.comentario.id).subscribe(() => {
      alert('Comentário apagado com sucesso!')
      this.buscarPaginaPostagem(this.paginaPostagem.number, 5)
      this.comentarioService.refreshToken()
      this.buscarPaginaComentario(0,5)
      this.comentario = new Comentario()
    })
  }
  obterComentarioPorId(id: number) {
    this.comentarioService.getComentario(id).subscribe((resp: Comentario) => {
      this.comentario = resp
    })
  }

}
