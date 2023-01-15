import internal from "stream"

export interface iDadosUsuario {
  
  username: string,
  email: string,
  grupo: string,
  status: string,
  funcao:string,
  admin: boolean,
  usuario: boolean,
  comercial: boolean,
  representante: boolean,
  password: string,
  nomeCompleto: string,
  token: string
  imagemURL: string,
}
export interface iUsuarios {
id: number,
username: string,
nomeCompleto: string,
grupo: string,
funcao: string,
email: string,
telefone: string,
imagemURL: string,
admin: boolean,
representante: boolean,
usuario:boolean
comercial: boolean,
status: string,
}

