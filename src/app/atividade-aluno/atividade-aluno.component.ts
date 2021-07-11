import { Comentario } from './../model/Comentario';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {

  usuario: Usuario = new Usuario()
  coment: Comentario = new Comentario()

  constructor() { }

  ngOnInit(): void {
  }

}
