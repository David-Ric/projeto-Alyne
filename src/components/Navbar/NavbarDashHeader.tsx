
import React, { useEffect, useState } from 'react';
import { MdOutlineAccountCircle } from "react-icons/md";
import "../../styles/Navbar/navbarDashHeader.scss";
import { GoThreeBars } from "react-icons/go";
import { Link, } from "react-router-dom";
import { iDadosUsuario } from '../../@types';
import { useNavigate } from 'react-router-dom';


const NavbarDashHeader = () => {
  const history = useNavigate();
  const [active, setMode] = useState(false);
  const [nome, setNome] = useState('');
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );
  

  useEffect(() => {
    
  //  console.log('usuario', usuario)

  });
function Deslog(){
  localStorage.clear();
  history('/'); 
}

  const ToggleMode = () => {
    setMode(!active);
  };

  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const dataAtual = dia + "/" + mes + "/" + ano;

  return (
    <header id="navbar-header-dashboard">
      <div className="container-fluid d-flex flex-wrap flex-xl-nowrap justify-content-between align-content-center py-4 px-xl-4 px-0 mb-4 conteudo-nav">
        
        <div className="d-flex content-user">
          {/* <p className="saudacao">Bem-vindo {PrimeiroNome}. </p> */}
          
        </div>
        <ul className="navbar-nav ms-auto">
      {/* <li className="nav-item">
          <Link
            to="/"
            className={"nav-link dark nav-item menu-home"}
          >
            Home
          </Link>
        </li> */}
        </ul>
        <div className="d-flex align-items-center alinhamentoDropD">
          {/* <DropDownLogado /> */}
        </div>
        <div className='logo-lik2'>
          <a className='logo-b' href='/'>
            <div className='logo-navbar2'></div>
          </a>
        </div>
        <h1 onClick={Deslog} className='usuario-logado'>Bem-vindo! <span style={{color:'#054f77'}}>{usuario.primeiroNome}</span></h1>
      </div>
    </header>
  );
};

export default NavbarDashHeader;
