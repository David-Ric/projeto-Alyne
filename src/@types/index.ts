import internal from "stream"

export interface iDadosUsuario {
  userName: string,
  email: string,
  grupo: string,
  ativo: string,
  funcao:string,
  admin: boolean,
  usuario: boolean,
  comercial: boolean,
  representante: boolean,
  password: string,
  primeiroNome: string,
  ultimoNome: string,
  token: string
}
export interface iUsuarios {
id: number,
userName: string,
primeiroNome: string,
ultimoNome: string,
grupo: string,
funcao: string,
email: string,
phoneNumber: string,
imagemURL: string,
admin: boolean,
representante: boolean,
usuario:boolean
comercial: boolean,
ativo: string,
}

