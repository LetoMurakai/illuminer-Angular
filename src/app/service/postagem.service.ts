import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PaginaPostagem } from '../model/PaginaPostagem';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})

export class PostagemService {
  uri = environment.uri
  idPostagem = environment.idPostagem
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }
  postagem: Postagem = new Postagem()
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getPostagemPaginado(pagina: number, size: number): Observable<PaginaPostagem> {
    return this.http.get<PaginaPostagem>(`${environment.uri}/postagens/pagina?page=${pagina}&size=${size}&sort=data,desc`, this.token)
  }

  getPostagensProfessor(id: number, pagina: number, size: number): Observable<PaginaPostagem> {
    return this.http.get<PaginaPostagem>(`${environment.uri}/usuarios/${id}/postagens?page=${pagina}&size=${size}&sort=data,desc`, this.token)
  }

  getByTexto(texto: string, pagina: number, size: number): Observable<PaginaPostagem> {
    return this.http.get<PaginaPostagem>
      (`${environment.uri}/postagens/texto/${texto}?page=${pagina}&size=${size}&sort=data,desc`, this.token)
  }

  getById(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${environment.uri}/postagens/${id}`, this.token)
  }

  getAllPostagem(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.uri}/postagens`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.uri}/postagens`, postagem, this.token)
  }

  /* ========================================================================== */
  /* ===============================COMENTARIOS================================ */
  getAllComentarios(idPostagem: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.uri}/postagens/${idPostagem}/comentarios`, this.token)
  }


  getComentariosPaginado(idPostagem: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.uri}/${idPostagem}/comentarios/paginado`)
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>(`${environment.uri}/postagens`, postagem, this.token)
  }

  deletePostagem(id: number) {
    return this.http.delete(`${environment.uri}/postagens/${id}`, this.token)
  }
}
