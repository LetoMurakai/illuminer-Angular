import { Comentario } from "./Comentario";

export class PaginaComentario {
    content?: Comentario[]
    last: boolean
    totalElements: number
    totalPages: number
    size?: number
    number: number
    first: boolean
    numberOfElements?: number
    empty?: boolean
}