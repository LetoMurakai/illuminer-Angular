import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { PaginaComentario } from '../model/PaginaComentario';
import { ComentarioService } from '../service/comentario.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  paginaComentario: PaginaComentario = new PaginaComentario()
  comentario : Comentario = new Comentario
  listaComentario: Comentario[]
  foto = environment.foto
  idPostagem = environment.idPostagem
  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    private dateTipe: DatePipe,
    private postagemService: PostagemService
  ) { }

  ngOnInit(){
    this.comentarioService.refreshToken()
    this.buscarPaginaComentario(0,5)
  }


  buscarPaginaComentario(pagina: number, size: number){
    this.comentarioService.getComentariosPaginado(pagina,size).subscribe((resp: PaginaComentario) => {
      resp.content?.forEach((item) => {
        item.data = this.dateTipe.transform(item.data, 'dd/MM/yyyy HH:mm')
        this.paginaComentario.content?.push(item)
      })
      this.paginaComentario = resp
    })
  }

  findAllComentario(idPostagem: number){
    this.postagemService.getAllComentarios(idPostagem).subscribe((resp: Comentario[])=>{
      this.listaComentario = resp
    })
  }
  publicarComentario(){
    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) =>{
      this.comentario = resp
      this.comentario = new Comentario()
    })
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
      this.comentarioService.refreshToken()
      this.buscarPaginaComentario(0,5)
      this.comentario = new Comentario()
    })
  }

}
