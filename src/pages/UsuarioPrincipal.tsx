
import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Home.scss';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import LogoOle from '../assets/ole-logo.png';
import LogoAvatar from '../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import ChampGif from '../assets/playy.gif';
import Footer from '../components/Footer';
import SubMenu from '../components/SubMenu';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-dark.png';
import api from '../services/api';
import Alert from "../components/Alert";

import SideNavBar from '../components/Navbar/SideNavBar';
import NavbarDashHeader from '../components/Navbar/NavbarDashHeader';

export default function UsuarioPrincipal() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);




  //=========== fução get ==================================//
  async function GetUsuarios() {
    await api
      .get("/api/Account")
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
 
    //==========================================================//
  return (
    <>
      
      
      <div className='content-global'>
     
        <div className='conteudo-cotainner'>
         <div className=''>
         <SideNavBar/> 
         </div>
         <NavbarDashHeader/>
         <div className='titulo-page'>
            <h1>Portal Grupo Alyne</h1>
            </div>
         <div className="contain">
            <div className='plano-fundo-usuario'>

            </div>
            
       
         </div>
        </div>
      
      
      </div>
      
      <Footer/>
    </>
    
  );
}
