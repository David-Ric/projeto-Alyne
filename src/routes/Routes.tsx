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
            <Route path='/cadastro-usuarios' element={<CadUsuarios />} />
            
            
            
            
        </Routes>

    </BrowserRouter>
};

export default Router;