import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  uri = environment.uri
  id = environment.id
  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

    getComentario(idPostagem: number):Observable<Comentario>{
      return this.http.get<Comentario>(`${this.uri}/:${idPostagem}/comentarios`,this.token)
    }
    postComentario(comentario: Comentario): Observable<Comentario>{
      return this.http.post<Comentario>(`${this.uri}/comentarios`, this.token)
    }
    putComentario(comentario: Comentario): Observable<Comentario>{
      return this.http.put<Comentario>(`${this.uri}/comentarios`, this.token)
    }
    deleteComentario(id:number){
      this.http.delete<Comentario>(`${this.uri}/${id}/comentarios`, this.token)
    }
}
