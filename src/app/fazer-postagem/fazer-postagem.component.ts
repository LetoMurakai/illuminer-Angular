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
  usuario: Usuario = new Usuario()
  nomeUsuarioLogado = environment.nome
  listaPostagem: Postagem[]
  tipoMidia: string
  constructor(
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    

  }

  findAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp
    })
  }
  cancelar() {
    this.postagem = new Postagem()
  }

  publicar() {
    if ((this.postagem.midia != null || this.postagem.midia != undefined) && (this.postagem.tipoMidia == null ||
      this.postagem.tipoMidia == '')) {
      alert('selecione um tipo de midia')
    } else {
      this.postagemService.refreshToken()
      this.postagem.usuario = new Usuario()
      this.postagem.usuario.id = environment.id
      console.log("id autor psotagem" + this.postagem.usuario.id) 
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        alert('Postagem feita com sucesso')
        this.postagem = new Postagem()
        this.router.navigate(['/pagina-inicio'])
        setTimeout(() => {
          this.router.navigate(['/feed'])
        }, 30);
      })

    }

  }

  selecionaMidia(event: any) {
    this.tipoMidia = event.target.value


  }
}

