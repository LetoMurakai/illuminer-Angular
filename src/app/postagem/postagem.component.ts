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
import { AlertaService } from '../service/alerta.service';
import { CurtidasService } from '../service/curtidas.service';
import { Curtida } from '../model/Curtida';
import { CurtidaPK } from '../model/CurtidaPK';



@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css'],
  providers: [DatePipe]
})
export class PostagemComponent implements OnInit {

  displayComentarios = "none"
  displaySpinner = "block"
  displayNavPag = "none"
  displayLoader = "none"

  paginaPostagem: PaginaPostagem = new PaginaPostagem()
  usuario: Usuario = new Usuario()
  idUsuarioLogado = environment.id
  idUsuarioPerfil = environment.idUsuarioPerfil
  textoPesquisaPostagem = environment.textoPesquisaPostagem
  postagem = new Postagem()
  idPostagem = environment.idPostagem
  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]
  curtida: Curtida = new Curtida()
  curtidas: Curtida[]


  displayDivTituloPesquisa: string

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private dateTipe: DatePipe,
    private comentarioService: ComentarioService,
    private alerta: AlertaService,
    private curtidaService: CurtidasService
  ) { }


  ngOnInit() {

    if (environment.token == '') {
      this.router.navigate(['/login'])
    }
    if (environment.textoPesquisaPostagem != '') {
      this.displayDivTituloPesquisa = "block"
    } else {
      this.displayDivTituloPesquisa = "none"
    }

    if (environment.idDestaqueComentario != 0) {
      this.postagemEngajada(0)
    } else if (environment.textoPesquisaPostagem != '') {
      this.textoPesquisaPostagem = environment.textoPesquisaPostagem
      this.postagemService.refreshToken()
      this.pesquisar(0)
    } else if (environment.idUsuarioPerfil != 0) {
      this.postagemService.refreshToken()
      this.idUsuarioPerfil = environment.idUsuarioPerfil
      this.buscarPaginaPostagemProfessor(environment.idUsuarioPerfil, 0, 5)
    } else {
      this.postagemService.refreshToken()
      this.buscarPaginaPostagem(0, 5)
    }
  }

  buscarPaginaPostagem(pagina: number, size: number) {
    this.displaySpinner = "block"
    this.displayNavPag = "none"
    this.postagemService.refreshToken()
    this.postagemService.getPostagemPaginado(pagina, size).subscribe((resp: PaginaPostagem) => {
      resp.content?.forEach((item) => {
        if (item.tipoMidia == 'video') {
          item.midia = this.sanitizer.bypassSecurityTrustResourceUrl(item.midia);
        }
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaPostagem.content?.push(item)
        this.definirCurtidasUsuarioLogado(item)
      })
      this.paginaPostagem = resp
      this.displaySpinner = "none"
      this.displayNavPag = ""
    })
  }

  curtirOuDescurtir(isCurtir: boolean, idPostagem: number) {
    this.curtida.id = new CurtidaPK()
    this.curtida.id.usuario = new Usuario()
    this.curtida.id.usuario.id = environment.id
    this.curtida.id.postagem = new Postagem()
    this.curtida.id.postagem.id = idPostagem
    isCurtir = isCurtir == false || isCurtir == undefined ? true : false
    if (isCurtir) {
      this.curtidaService.refreshToken()
      this.curtidaService.postCurtidas(this.curtida).subscribe((resp: Curtida) => {
        this.curtida = resp
        this.curtida.id.postagem.isCurtida = true
      })
    } else {
      this.curtidaService.refreshToken()
      this.curtidaService.deleteCurtidas(this.curtida.id).subscribe(() => { 
        this.curtida.id.postagem.isCurtida = false
      })
    }
    this.redirecionar()
  }

  definirCurtidasUsuarioLogado(postagem: Postagem) {
    postagem.curtidas.forEach((item) => {
      if (item.id.usuario.id == environment.id) {
        postagem.isCurtida = true
      }
    })
  }


  buscarPaginaPostagemProfessor(idProfessor: number, pagina: number, size: number) {
    this.displaySpinner = "block"
    this.displayNavPag = "none"
    this.postagemService.refreshToken()
    this.postagemService.getPostagensProfessor(idProfessor, pagina, size).subscribe((resp: PaginaPostagem) => {
      resp.content?.forEach((item) => {
        if (item.tipoMidia == 'video') {
          item.midia = this.sanitizer.bypassSecurityTrustResourceUrl(item.midia);
        }
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaPostagem.content?.push(item)
        this.definirCurtidasUsuarioLogado(item)
      })
      this.paginaPostagem = resp
      this.displaySpinner = "none"
      this.displayNavPag = ""
    })
  }

  postagemEngajada(pagina: number) {
    this.displaySpinner = "block"
    this.displayNavPag = "none"
    this.postagemService.getByIdPaginado(environment.idDestaqueComentario, pagina, 1).subscribe((resp: PaginaPostagem) => {
      resp.content?.forEach((item) => {
        if (item.tipoMidia == 'video') {
          item.midia = this.sanitizer.bypassSecurityTrustResourceUrl(item.midia);
        }
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaPostagem.content?.push(item)
        this.definirCurtidasUsuarioLogado(item)
      })
      this.paginaPostagem = resp
      this.displaySpinner = "none"
      this.displayNavPag = ""
    })
  }


  pesquisar(pagina: number) {
    this.displaySpinner = "block"
    this.displayNavPag = "none"
    this.postagemService.getByTexto(this.textoPesquisaPostagem, pagina, 5)
      .subscribe((resp: PaginaPostagem) => {
        resp.content?.forEach((item) => {
          if (item.tipoMidia == 'video') {
            item.midia = this.sanitizer.bypassSecurityTrustResourceUrl(item.midia);
          }
          item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
          this.paginaPostagem.content?.push(item)
          this.definirCurtidasUsuarioLogado(item)
        })
        this.paginaPostagem = resp
        this.displaySpinner = "none"
        this.displayNavPag = ""
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
    this.postagem.comentarios = []
    if (this.postagem.midia == null || this.postagem.midia == '') {
      this.postagem.tipoMidia = null
    }
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alerta.showAlertSuccess('Postagem atualizada com sucesso!')
      this.postagemService.refreshToken()
      this.postagem = new Postagem()
      this.redirecionar()
    })
  }

  obterPostagemPorId(id: number) {
    this.postagemService.getById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  excluirPostagem() {
    this.postagemService.deletePostagem(this.postagem.id).subscribe(() => {
      this.alerta.showAlertSuccess('Postagem apagada com sucesso!')
      this.postagemService.refreshToken()
      this.postagem = new Postagem()
      this.redirecionar()
    })
  }

  getCurtidasPostagem(idPostagem: number) {
    this.postagemService.refreshToken()
    this.postagemService.getCurtidasPostagem(idPostagem).subscribe((resp: Curtida[]) => {
      this.curtidas = resp
    })
  }

  /* ========================================================================== */
  /* ===============================COMENTARIOS================================ */


  paginaComentario: PaginaComentario = new PaginaComentario()
  foto = environment.foto

  buscarPaginaComentario(pagina: number, size: number) {
    this.comentarioService.getComentariosPaginado(pagina, size).subscribe((resp: PaginaComentario) => {
      resp.content?.forEach((item) => {
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaComentario.content?.push(item)
      })
      this.paginaComentario = resp
    })
  }

  comentar(id: number) {
    this.displayLoader = "none"
    this.usuario.id = this.idUsuarioLogado
    this.comentario.usuario = this.usuario
    this.postagem.id = id
    this.comentario.postagem = this.postagem
    this.comentarioService.refreshToken()
    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.comentario = new Comentario()
      this.comentarioService.refreshToken()
      this.redirecionar()
    })
  }

  atualizarFeed() {
    setTimeout(() => {
      
   
    this.router.navigate(['/pagina-inicio'])
    setTimeout(() => {
      this.router.navigate(['/feed'])
    }, 1);
  }, 1000);
  }

  definirIdComentario(id: number) {
    this.comentario.id = id
    this.obterComentarioPorId(this.comentario.id)
  }

  atualizarComentario() {
    this.comentario.usuario = new Usuario()
    this.comentario.usuario.id = environment.id
    this.comentarioService.refreshToken()
    this.comentarioService.putComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.alerta.showAlertSuccess('Comentário atualizado com sucesso!')
      this.comentarioService.refreshToken()
      //this.buscarPaginaPostagem(this.paginaPostagem.number, 5)
      this.comentarioService.refreshToken()
     // this.buscarPaginaComentario(0, 5)
      this.comentario = new Comentario()
      this.redirecionar()
    })
  }

  excluirComentario() {
    this.comentarioService.refreshToken()
    this.comentarioService.deleteComentario(this.comentario.id).subscribe(() => {
      this.alerta.showAlertSuccess('Comentário apagado com sucesso!')
     // this.buscarPaginaPostagem(this.paginaPostagem.number, 5)
      this.comentarioService.refreshToken()
      //this.buscarPaginaComentario(0, 5)
      this.comentario = new Comentario()
      this.redirecionar()
    })
  }
  obterComentarioPorId(id: number) {
    this.comentarioService.refreshToken()
    this.comentarioService.getComentario(id).subscribe((resp: Comentario) => {
      this.comentario = resp
    })
  }


  redirecionar() {
    if (environment.idUsuarioPerfil != 0) {
      this.buscarPaginaPostagemProfessor(environment.idUsuarioPerfil, this.paginaPostagem.number, 5)
      
      this.displayLoader ="block"
      setTimeout(() => {
        this.router.navigate(['/feed'])
        setTimeout(() => {
          this.router.navigate([`/perfil/${this.idUsuarioPerfil}`])
          this.displayLoader ="none"
        }, 1);
      }, 1000);
      
    } else if (environment.idDestaqueComentario != 0) {
      this.postagemEngajada(0)
      this.displayLoader ="block"
      this.atualizarFeed()
    } else if(environment.textoPesquisaPostagem != '') {
      this.pesquisar(0)
      this.displayLoader ="block"
      this.atualizarFeed()
    } else {
      this.buscarPaginaPostagem(this.paginaPostagem.number, 5)
      this.displayLoader ="block"
      this.atualizarFeed()
    }
    
  }

  abrirUsuario(idUsuario:number){
    environment.idUsuarioPerfil = idUsuario
    environment.textoPesquisaPostagem = ''
    environment.idDestaqueComentario = 0
    this.router.navigate(['/feed'])
        setTimeout(() => {
          this.router.navigate([`/perfil/${idUsuario}`])
        }, 30);
  }

}

