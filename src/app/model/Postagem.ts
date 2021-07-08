import { Comentario } from "./Comentario"
import { Usuario } from "./Usuario"

export class Postagem {
    public id: number
    public texto: string
    public titulo: any
    public data: any
    public midia: any
    public tipoMidia: any
    public localizacao: string
    public comentarios: Comentario
    public usuario = new Usuario()

}