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
menuPermissao: [
  {
    id: number,
    userId: number,
    codigo: number,
    nome: string,
    subMenu: [
      {
        id: number,
        codigo: number,
        nome: string,
        menuPermissaoId: number,
        pagina: [
          {
            id: number,
            codigo: number,
            nome: string,
            menuPermissaoId: number,
            subMenuPermissaoId: number
          }
        ]
      }
    ],
    pagina: [
      {
        id: number,
        codigo: number,
        nome: string,
        menuPermissaoId: number,
        subMenuPermissaoId: number
      }
    ]
  }
]

}

export interface iGrupos {
  id: number,
  nameGrupo: string,
  atualizadoEm:string,
  }

  export interface iTipoNegociacao {
    id: number,
    descricao: string,
    atualizadoEm:string,
    }
  export interface iConcorrentes {
    id: number,
    nome: string,
    atualizadoEm:string,
    }
    export interface iProdutoConcorrente{
      id: number,
      codProduto: string,
      nomeProduto: string,
      codConcorrente: string,
      nomeConcorrente: string,
      codProdutoConcorrente: string,
      nomeProdutoSimilar: string,
      atualizadoEm:string,
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
      codVendedor:number,
      atualizadoEm:string
    }
  export interface iVendedores {
     id:number,
     codVendedor:number,
     nome: string,
     status: string,
     regiao: string,
     email: string,
     tipo: string,
     atuaCompras: boolean,
     atualizadoEm:string
    }
    export interface  iDataSelect {
      value?: string;
      label?: string;
    }

    export interface iProdutos {
      id: number,
      codigo: string,
      nome: string,
      grupoId: string,
      nomeGrupo: string,
      atualizadoEm:string
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
        atualizadoEm:string,
        itemTabela: [
          {
            id: number,
            idTabelaPreco: number,
            idProd: number,
            atualizadoEm:string,
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
            atualizadoEm:string,
            produtos: {
              nome: string,
            },
            preco: number
      }
      export interface  iEmpresa {
        id: number;
        descricao: string;
        atualizadoEm:string,
      }
      export interface iTabelaCliente{
        id: number,
        codEmpresa: number,
        codParceiro: number,
        atualizadoEm:string,
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
            pagina: [
              {
                id: number,
                codigo: number,
                nome: string,
                url: string,
                icon: string,
                menuId: number,
                subMenuId:number
              }
            ]
          }],
        pagina: [
          {
            id: number,
            codigo: number,
            nome: string,
            url: string,
            icon: string,
            menuId: number,
            subMenuId:number
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
                 menuId: number,
                 subMenuId:number
               }
             ]
       }
       export interface iPaginas{
        id: number,
        codigo: number,
        nome: string,
        url: string,
        icon: string,
        menuId: number,
        subMenuId:number
       }
      
      export interface IMenuPermissao  {
        id: number,
        userId: number,
        codigo: number,
        nome: string,
        subMenu: [
          {
            id: number,
            codigo: number,
            nome: string,
            menuPermissaoId: number,
            userId: number,
            pagina: [
              {
                id: number,
                codigo: number,
                nome: string,
                menuPermissaoId: number,
                subMenuPermissaoId: number,
                userId: number
              }
            ]
          }
        ],
        pagina: [
          {
            id: number,
            codigo: number,
            nome: string,
            menuPermissaoId: number,
            subMenuPermissaoId: number,
            userId: number
          }
        ]
      }
      export interface iSubMenuPermissao{
        id: number,
        codigo: number,
        nome: string,
        menuPermissaoId: number,
        userId: number,
        pagina: [
          {
            id: number,
            codigo: number,
            nome: string,
            menuPermissaoId: number,
            subMenuPermissaoId: number,
            userId: number
          }
        ]
      }
      export interface iPaginaPermissao{
        id: number,
            codigo: number,
            nome: string,
            menuPermissaoId: number,
            subMenuPermissaoId: number,
            userId: number
      }