import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { PaginaComentario } from '../model/PaginaComentario';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  uri = environment.uri
  id = environment.id
  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

    getComentario(idPostagem: number):Observable<Comentario>{
      return this.http.get<Comentario>(`${this.uri}/comentarios/${idPostagem}`,this.token)
        }
        
    postComentario(comentario: Comentario): Observable<Comentario>{
      return this.http.post<Comentario>(`${this.uri}/comentarios`, comentario, this.token)
    }
    putComentario(comentario: Comentario): Observable<Comentario>{
      return this.http.put<Comentario>(`${this.uri}/comentarios`, comentario, this.token)
    }
    deleteComentario(id:number){
      return this.http.delete<Comentario>(`${this.uri}/comentarios/${id}`, this.token) 
     }

    getComentariosPaginado(pagina: number, size: number): Observable<PaginaComentario>{
      return this.http.get<PaginaComentario>(`${environment.uri}/comentarios/pagina?page=${pagina}&size=${size}&sort=data,desc`, this.token)
    }

    getById(id: number): Observable<Comentario>{
      return this.http.get<Comentario>(`${environment.uri}/comentarios/${id}`, this.token)
    }
}
