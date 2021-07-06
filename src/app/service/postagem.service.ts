import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})

export class PostagemService {
  uri = environment.uri
  idPostagem = environment.idPostagem
  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }
  postagem: Postagem = new Postagem()
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllPostagem(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${this.uri}/postagens`, this.token)
  }
  postPostagem( postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>(`${this.uri}/postagens`,postagem ,this.token)
  }

  /* ========================================================================== */
  /* ===============================COMENTARIOS================================ */
  getAllComentarios(idPostagem:number):Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.uri}/${idPostagem}/comentarios`, this.token)
  }
  getComentariosPaginado(idPostagem:number):Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.uri}/${idPostagem}/comentarios/paginado`)
    
  }
}
