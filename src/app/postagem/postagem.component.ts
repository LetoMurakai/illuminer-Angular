import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css'],
  providers: [DatePipe]
})
export class PostagemComponent implements OnInit {

  displayComentarios = "none"

  paginaPostagem: PaginaPostagem = new PaginaPostagem()
  idUsuarioLogado = environment.id
  postagem = new Postagem()
  idPostagem = environment.idPostagem

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private dateTipe: DatePipe
  ) { }


  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/login'])
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

  comentar() {
    this.displayComentarios = "block"
  }

  verComentarios() {
    if (this.displayComentarios == "none") {
      this.displayComentarios = "block"
    } else {
      this.displayComentarios = "none"
    }
  }

  excluirPostagem() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      alert('Postagem apagada com sucesso!')
      this.postagemService.refreshToken()
      this.buscarPaginaPostagem(0, 5)
      this.postagem = new Postagem()
    })
  }

}
