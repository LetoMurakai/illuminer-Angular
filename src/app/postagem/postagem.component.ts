import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  displayComentarios = "none"

  constructor() { }

  ngOnInit(){
  }

  comentar() {
    this.displayComentarios = "block"
  }

  verComentarios() {
    if(this.displayComentarios == "none") {
      this.displayComentarios = "block"
    } else {
      this.displayComentarios = "none"
    }
  }
}
