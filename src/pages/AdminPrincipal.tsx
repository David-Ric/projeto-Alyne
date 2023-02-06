import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Admin-home.scss';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { fad } from '@fortawesome/pro-duotone-svg-icons'
// import {
//   faCoffee,
//   faCog,
//   faSpinner,
//   faQuoteLeft,
//   faSquare,
//   faCheckSquare
// } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core';

// library.add(
//   fab,
//   fad,
//   faCoffee,
//   faCog,
//   faSpinner,
//   faQuoteLeft,
//   faSquare,
//   faCheckSquare
// )
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default function AdminPrincipal() {
  const history = useNavigate();
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);




  //=========== fução login ==================================//
 
 
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
            <h1>Administrativo</h1>
            
            </div>
         <div style={{justifyContent:'center'}} className="contain">
            <div style={{margin:"auto"}} className='logo-admin'></div>
            
       
         </div>
        </div>
      
      
      </div>
      
      <Footer/>
    </>
    
  );
}
