import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.css']
})
export class MiniPerfilComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo


  constructor() { }

  ngOnInit() {
  }

}
