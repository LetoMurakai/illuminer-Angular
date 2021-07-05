import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.css']
})
export class MiniPerfilComponent implements OnInit {

  foto = environment.foto
  nome = environment.nome
  tipo = environment.tipo

  constructor() { }

  ngOnInit(){
  }

}
