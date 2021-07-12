import { Postagem } from "./Postagem"
import { Usuario } from "./Usuario"

export class Comentario{
    public id: number
    public texto: string
    public data: any
    public usuario: Usuario
    public postagem: Postagem

}
