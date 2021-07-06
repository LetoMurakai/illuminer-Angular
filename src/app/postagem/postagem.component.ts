import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  displayComentarios = "none"
  paginaPostagem: PaginaPostagem
  idUsuarioLogado = environment.id

  constructor(
    private postagemService: PostagemService,
    private router: Router
  ) { }

  ngOnInit(){
    if(environment.token == '') {
      this.router.navigate(['/login'])
    }
    this.postagemService.refreshToken()
    this.buscarPaginaPostagem(0, 5)
  }

  buscarPaginaPostagem(pagina: number, size: number) {
      this.postagemService.getPostagemPaginado(pagina, size).subscribe((resp: PaginaPostagem) => {
        console.log(resp)
        this.paginaPostagem = resp
      })
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
}
