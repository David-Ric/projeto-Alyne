import internal from "stream"

export interface iDadosUsuario {
  id: number,
  username: string,
  email: string,
  grupoId: number,
  status: string,
  funcao:string,
  password: string,
  nomeCompleto: string,
  token: string
  imagemURL: string,
}
export interface iUsuarios {
id: number,
username: string,
nomeCompleto: string,
grupoId: number,
funcao: string,
email: string,
telefone: string,
imagemURL: string,
status: string,
permissoes: [
  {
    id: number,
    usuarioId: number,
    menuId: number,
    descMenu: string
  }
]
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
      export interface  iEmpresa {
        id: number;
        descricao: string;
      }
      export interface iTabelaCliente{
        id: number,
        codEmpresa: number,
        codParceiro: number,
        parceiros: {
         id: number,
          nome: string,
        },
        codTabelaPreco: number,
        tabelaPreco: {
          id: number,
          codigo: number,
          descricao: string,
        }
      }
      export interface iPaginaBase{
        id: number,
        codigo: number,
        nome: string,
        url: string,
        icon: string
      }
      export interface iMenu{
        id: number,
        codigo: number,
        ordem: number,
        nome: string,
        icon: string,
        subMenu:[{
            id: number,
            codigo: number,
            ordem: number,
            nome: string,
            icon: string,
            menuId: number,
          }],
        pagina: [
          {
            id: number,
            codigo: number,
            nome: string,
            url: string,
            icon: string,
            menuId: number
          }
        ]
      }
      export interface iSubMenu{
             id: number,
             codigo: number,
             ordem: number,
             nome: string,
             icon: string,
             menuId: number,
            pagina: [
               {
                 id: number,
                 codigo: number,
                 nome: string,
                 url: string,
                 icon: string,
                 menuId: number
               }
             ]
       }
       export interface iPaginas{
        id: number,
        codigo: number,
        nome: string,
        url: string,
        icon: string,
        menuId: number
       }
      