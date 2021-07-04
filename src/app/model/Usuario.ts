import { Postagem } from "./Postagem"

export class Usuario{
    public id: number
    public nome: string
    public email: string
    public senha: string
    public foto: string
    public fotoCapa: string
    public postagem: Postagem[]
}