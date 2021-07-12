import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Curtida } from '../model/Curtida';

@Injectable({
  providedIn: 'root'
})
export class CurtidasService {

  uri = environment.uri
  token ={
    headers : new HttpHeaders().set('Authorization', environment.token)
  }

  constructor(
    private router:Router,
    private http: HttpClient
  ) { }

   postCurtidas(curtidas: Curtida): Observable<Curtida>{
    return this.http.post<Curtida>(`${this.uri}/curtidas`, this.token)
  }
  deleteCurtidas(id:number){
    return this.http.delete(`${this.uri}/curtidas/${id}`,this.token)
  }
  getCurtidasPostagens(id:number){
    return this.http.get(`${this.uri}/postagens/${id}/curtidas`, this.token)
  }
  getCurtidasUsuario(id:number){
    return this.http.get(`${this.uri}/usuarios/${id}/curtidas`,this.token)
  } 
}
