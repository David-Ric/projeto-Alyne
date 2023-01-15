
import React, { useEffect, useState } from 'react';
import { MdOutlineAccountCircle } from "react-icons/md";
import "../../styles/Navbar/navbarDashHeader.scss";
import { HiArrowCircleDown,HiArrowCircleUp } from "react-icons/hi";
import { Link, } from "react-router-dom";
import { iDadosUsuario } from '../../@types';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';


const NavbarDashHeader = () => {
  const history = useNavigate();
  const [active, setMode] = useState(false);
  const [dropActive, setDropActive] = useState(false);
 // const [nome, setNome] = useState('');
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );
  const nome = usuario.username
  const nomeUser= nome[0].toUpperCase() + nome.substring(1);
  useEffect(() => {

  },[]);
function Deslog(){
  AtivaDrop();
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
 
function AtivaDrop(){
  if(!dropActive){
    setDropActive(true)
   
  }
  else{
    setDropActive(false)

  }

}
function AtivaDropFalse(){
 // setDropActive(false)
}


  return (
    <header id="navbar-header-dashboard" >
      <div onClick={AtivaDropFalse} className="container-fluid d-flex flex-wrap flex-xl-nowrap justify-content-between align-content-center py-4 px-xl-4 px-0 mb-4 conteudo-nav">
        
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
        <OverlayTrigger
          placement={"left"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Mais ações</Tooltip>}
        >
        <h1  className='usuario-logado' onClick={AtivaDrop}>Bem-vindo! <span style={{color:'#054f77'}}>{nomeUser}</span>{dropActive?(<><HiArrowCircleUp fontSize={23} style={{marginLeft:5}}/></>):(<><HiArrowCircleDown fontSize={23} style={{marginLeft:5}}/></>)}</h1>
        </OverlayTrigger>
        <div className={dropActive?'dropdow':'no-dropdow'}>
        <ul>
          <li>Perfil</li>
          <li onClick={Deslog}>Sair</li>
        </ul>
      </div>
      </div>
      
    </header>
  );
};

export default NavbarDashHeader;
