import { Postagem } from "./Postagem";

export class PaginaPostagem {
  content?: Postagem[]
  last: boolean
  totalElements: number
  totalPages: number
  size?: number
  number: number
  first: boolean
  numberOfElements?: number
  empty?: boolean
}