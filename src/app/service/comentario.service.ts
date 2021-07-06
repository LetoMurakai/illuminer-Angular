import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  uri = environment.uri
  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  constructor(
    private http: HttpClient
  ) { }

 
  postComentario(comentario: Comentario): Observable<Comentario>{
    return this.http.post<Comentario>(`${this.uri}/comentarios`, this.token)
  }
  putComentario(comentario: Comentario): Observable<Comentario>{
    return this.http.put<Comentario>(`${this.uri}/comentarios`, this.token)
}
}
