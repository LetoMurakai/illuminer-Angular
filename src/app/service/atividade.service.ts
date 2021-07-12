import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Atividade } from '../model/atividade';
import { PagAtividade } from '../model/PagAtividade';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  uri = environment.uri
  idAluno = environment.id

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  constructor(
    private http: HttpClient
  ) { }

  //obterComentarioAluno(idAluno:number, pagina: number, size: number) :Observable<Atividade>{
    //return this.http.get<Atividade>(`${environment.uri}/usuarios/${idAluno}/atividades?page=${pagina}&size=${size}&//sort=data,desc`, this.token)
  //}

  obterAtividadesAluno(idAluno:number, pagina: number, size: number): Observable<PagAtividade>{
    return this.http.get<PagAtividade>(`${environment.uri}/usuarios/${idAluno}/atividades?page=${pagina}&size=${size}&//sort=data,desc`, this.token)
  }

}
