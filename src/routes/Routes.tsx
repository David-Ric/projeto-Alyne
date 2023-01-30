import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPrincipal from '../pages/AdminPrincipal';
import CadUsuarios from '../pages/CadastroUsuarios';
import ComercialPrincipal from '../pages/ComercialPrincipal';
import Home from '../pages/Home';
import RecuperarSenha from '../pages/RecuperarSenha';
import RepresentantePrincipal from '../pages/RepresentantePrincipal';
import UsuarioPrincipal from '../pages/UsuarioPrincipal';
import { iDadosUsuario } from '../@types';
import RedefinirSenha from '../pages/RedefinirSenha';
import MeuPerfil from '../pages/MeuPerfil';
import CadastroGruposProdutos from '../pages/Cadastros/CadastroGruposProd';
import CadastroParceiros from '../pages/Cadastros/CadastroParceiros';
import CadastroProdutos from '../pages/Cadastros/CadastroProdutos';
import CadastroVendedores from '../pages/Cadastros/CadastroVendedores';
import CadastroConcorrentes from '../pages/Cadastros/CadastroConcorrentes';
import CadastroProdutosConcorrentes from '../pages/Cadastros/CadastroProdutosConcorrentes';
import CadastroTipoNegociacao from '../pages/Cadastros/TipoNegociacao';
import TabelaPreco from '../pages/Cadastros/TabelaPreco';
import CadastroTipoEmpresa from '../pages/Cadastros/CadastroTipoEmpresa';
import CadastroTabelaPrecoCliente from '../pages/Cadastros/CadastroTabelaPrecoCliente';
import CadastroPaginasBase from '../pages/Cadastros/CadastroPaginasBase';
import MontarMenu from '../pages/Cadastros/MontarMenu';

export interface IApplicationProps { }
const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );
const Router: React.FunctionComponent<IApplicationProps> = (props) => {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin-home' element={<AdminPrincipal />} />
            <Route path='/inicial-home' element={<UsuarioPrincipal />} />
            <Route path='/comercial-home' element={<ComercialPrincipal />} />
            <Route path='/representante-home' element={<RepresentantePrincipal />} />
            <Route path='/recuperar-senha' element={<RecuperarSenha />} />
            <Route path='/redefinir-senha' element={<RedefinirSenha />} />
            <Route path='/meu-perfil' element={<MeuPerfil />} />

            {/* ====== Cadastros =============================================== */}
            <Route path='/cadastro-usuarios' element={<CadUsuarios />} />
            <Route path='/cadastro-grupos-produtos' element={<CadastroGruposProdutos />} />
            <Route path='/cadastro-parceiros' element={<CadastroParceiros />} />
            <Route path='/cadastro-produtos' element={<CadastroProdutos />} />
            <Route path='/produtos-concorrentes' element={<CadastroProdutosConcorrentes />} />
            <Route path='/cadastro-concorrentes' element={<CadastroConcorrentes />} /> 
            <Route path='/cadastro-vendedores' element={<CadastroVendedores />} /> 
            <Route path='/cadastro-tipo-negociacao' element={<CadastroTipoNegociacao />} /> 
            <Route path='/tabela-de-preco' element={<TabelaPreco />} /> 
            <Route path='/cadastro-tipo-empresa' element={<CadastroTipoEmpresa />} /> 
            <Route path='/tabela-de-preco-cliente' element={<CadastroTabelaPrecoCliente />} /> 
            <Route path='/cadastro-de-paginas' element={<CadastroPaginasBase />} /> 
            <Route path='/montar-menu' element={<MontarMenu />} /> 
     
        </Routes>

    </BrowserRouter>
};

export default Router;