import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Curtida } from '../model/Curtida';
import { CurtidaPK } from '../model/CurtidaPK';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { PostagemDestaqueComentario } from '../model/PostagemDestaqueComentario';
import { PostagemDestaqueCurtida } from '../model/PostagemDestaqueCurtida';
import { Usuario } from '../model/Usuario';
import { UsuarioDestaque } from '../model/UsuarioDestaque';

@Injectable({
  providedIn: 'root'
})
export class EngajamentoService {



  constructor(

    private http: HttpClient

  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }



  usuarioMaisEngajado(): Observable<UsuarioDestaque>{
    return this.http.get<UsuarioDestaque>('http://localhost:8080/usuarios/engajamento/postagens', this.token)
  }

  postagemDestaque(): Observable<PostagemDestaqueComentario>{
    return this.http.get<PostagemDestaqueComentario>('http://localhost:8080/postagens/engajamento/comentarios', this.token)
  }

  postagemDestaqueCurtida(): Observable<PostagemDestaqueCurtida>{
    return this.http.get<PostagemDestaqueCurtida>('http://localhost:8080/postagens/engajamento/curtidas', this.token)
  }
	

  getById(id: number): Observable<UsuarioDestaque>{
    return this.http.get<UsuarioDestaque>(`http://localhost:8080/usuarios/engajamento/postagens`, this.token)

  }
}
