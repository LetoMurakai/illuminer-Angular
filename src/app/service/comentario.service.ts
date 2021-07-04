import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  comentario: Comentario = new Comentario
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllComentario(): Observable<Comentario[]>{
    return this.http.get<Comentario[]>('http://localhost:8080/comentarios',this.token)
  }
  postComentario(comentario: Comentario):Observable<Comentario>{
    return this.http.post<Comentario>('http://localhost:8080/comentarios', this.token)

  }
}
