import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-mini-perfil',
  templateUrl: './mini-perfil.component.html',
  styleUrls: ['./mini-perfil.component.css']
})
export class MiniPerfilComponent implements OnInit {

  usuario: Usuario = new Usuario

  constructor(
    public http: HttpHeaders
  ) { }

  ngOnInit(){
  }

}
