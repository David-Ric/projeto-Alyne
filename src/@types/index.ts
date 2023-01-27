import internal from "stream"

export interface iDadosUsuario {
  id: number,
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

export interface iGrupos {
  id: number,
  nameGrupo: string,
  }

  export interface iTipoNegociacao {
    id: number,
    descricao: string,
    }
  export interface iConcorrentes {
    id: number,
    nome: string,
    }
    export interface iProdutoConcorrente{
      id: number,
      codProduto: string,
      nomeProduto: string,
      codConcorrente: string,
      nomeConcorrente: string,
      codProdutoConcorrente: string,
      nomeProdutoSimilar: string
    }
    export interface iParceiros {
      id: number,
      nome: string,
      tipoPessoa: string,
      nomeFantasia: string,
      cnpj_Cpf: string,
      email: string,
      fone: string,
      canal: string,
      classificacao: string,
      tamanhoLoja: string,
      endereco: string,
      bairro: string,
      municipio: string,
      uf: string,
      lat: string,
      long: string,
      status: string,
      semVisita: boolean,
      primeiraSem: boolean,
      segundaSem: boolean,
      terceiraSem: boolean,
      quartaSem: boolean,
      quintaSem: boolean,
      segunda: boolean,
      terca: boolean,
      quarta: boolean,
      quinta: boolean,
      sexta: boolean,
      sabado: boolean
      tipoNegociacao: string,
      empresa: string,
      codVendedor:number
    }
  export interface iVendedores {
     id:number,
     codVendedor:number,
     nome: string,
     status: string,
     regiao: string,
     email: string,
     tipo: string,
     atua_Compras: boolean,
    }
    export interface  iDataSelect {
      value?: string;
      label?: string;
    }

    export interface iProdutos {
      id: number,
      codigo: string,
      nome: string,
      idGrupo: string,
      nomeGrupo: string
    }

    export interface iMenu {
      id: number,
      menu: string,
      subMenu:[
        {
        id: number,
        idMenu: number,
        menu: string,
        link:string,
        icon:string,
        }
      ]
      }
      export interface IFile {
        uploaded?: boolean;
        preview: string;
        file: File | Blob | string;
        progress?: number;
        error?: boolean;
        url: string;
      }

      export interface ITabelaPreco {
        id: number,
        codigo: number,
        descricao: string,
        dataInicial: string,
        dataFinal: string,
        itemTabela: [
          {
            id: number,
            idTabelaPreco: number,
            idProd: number,
            produtos: {
              id: number,
              codigo: string,
              nome: string,
              idGrupo: string,
              nomeGrupo: string
            },
            preco: number
          }
        ]
      }
      export interface IItemTabelaPreco {
            id:number,
            idTabelaPreco: number,
            idProd: number,
            produtos: {
              nome: string,
            },
            preco: number
      }