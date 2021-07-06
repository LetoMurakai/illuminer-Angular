import { Comentario } from "./Comentario"
import { Usuario } from "./Usuario"

export class Postagem {
    public id: number
    public texto: string
    public data: Date
    public midia: string
    public tipoMidia: string
    public localizacao: string
    public comentarios: Comentario
    public usuario = new Usuario()
}