import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components-styles/Navbar.scss';
import LogoAvatar from '../assets/avatar1.png';
import Messeger from '../assets/messege.png';

import api from '../services/api';
//import Alert from "../../src/components/Alert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { BiFootball } from "react-icons/bi";
import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { setSourceMapRange } from 'typescript';


export default function Navbar() {
  const [active, setMode] = useState(false);
  const [pageTop, setPageTop] = useState(false);
  const [soluction, setSoluction] = useState(false);
  const [transparence, setTransparence] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const navBar = document.querySelector("#navBarTop")
  const user = localStorage.getItem('@Ole/Usuario');
  const history = useNavigate();
  console.log('user',user)

  useEffect(() => {
    
  })

  window.addEventListener("scroll", rooling);
  
  function Deslogar(){
    localStorage.clear();
    history('/'); 
  }

  function rooling() {
    if (window.pageYOffset > 0) {
      setPageTop(true);
    } else {
      setPageTop(false);
    }

  }

  // history.push("/");

  function LimpaMessegeError() {
    setAlertErro(false);
  }

  const ToggleMode = () => {
    setMode(!active);
  };
  function arrowSolucTrue() {
    setSoluction(true);
  }

  function arrowSolucFalse() {
    setSoluction(false);
  }
  function arrowTranspTrue() {
    setTransparence(true);
  }
  function arrowTranspFalse() {
    setTransparence(false);
  }



  return (
    <div className='total-nav'>

      <div id='navBarTop' className={pageTop || active ? "Nav Nav-scroll " : "Nav Nav-fixed"}>
        <div className='logo-lik'>
          <a className='logo-a' href='/'>
            <div className='logo-navbar'></div>
          </a>
        </div>

        <div className='menu'>
          <ul>
            <li><a href='/'><GoHome style={{marginRight:10}}/>Início</a></li>
            {user !=null?(<>
            <li><a href='/game'><TbDeviceGamepad2 style={{marginRight:10}}/> Game </a></li>
            </>):(<></>)}
            <li><a href='/sobre'><BiFootball style={{marginRight:10}}/>Sobre o Olé</a></li>
          </ul>
          {user !=null?(<>
            <div className='menu-fixo'>
           <a className='menuic' href='/interno'> 
              <img className='img-navmess' src={Messeger} alt="" />   
              </a>
           <div className='menu-user' onClick={Deslogar}>
              <img className='img-nav' src={LogoAvatar} alt="" /><div><h2>{user}</h2> <span>Sair <MdOutlineExitToApp style={{marginLeft: 10}}/></span></div> 
              </div>
          </div>
          </>):(<></>)}
         
        </div>
      
        <div
          className={active ? "iconMenu iconActive" : "iconMenu"}
          onClick={ToggleMode}
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="hamburguer hamburguerIcon"></span>
        </div>

        {/* =============== Menu Mobile =========================================================================== */}

        <div className={active ? 'menu-mobile' : 'not-menu'}>
          <ul className='menu-ul-mobile'>
            <div className='menu-mobile-li'>
            <li onClick={ToggleMode}><a href='/'><GoHome style={{marginRight:10}}/>Início</a></li><br></br>
            {user !=null?(<>
            <li  onClick={ToggleMode}><a href='/game'><TbDeviceGamepad2 style={{marginRight:10}}/> Game </a></li><br></br>
            </>):(<></>)}
            {/* <li><a href='/'><TbDeviceGamepad2 style={{marginRight:10}}/> Adm Game </a></li><br></br> */}
            <li  onClick={ToggleMode}><a href='/sobre'><BiFootball style={{marginRight:10}}/>Sobre o Olé</a></li>
            </div>
          </ul>
        </div>



      </div>
    </div>
  );
}
