import { Comentario } from "./Comentario"
import { Curtida } from "./Curtida"
import { Usuario } from "./Usuario"

export class Postagem {
    public id: number
    public texto: string
    public titulo: any
    public data: any
    public midia: any
    public tipoMidia: any
    public localizacao: string
    public comentarios: Comentario[]
    public curtidas: Curtida[]
    public usuario: Usuario
    public isCurtida: any

}