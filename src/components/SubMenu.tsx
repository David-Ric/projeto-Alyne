import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Home.scss';
import '../styles/global.scss';
import LogoAvatar from '../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function SubMenu() {
  const history = useNavigate();
  const user = localStorage.getItem('@Ole/Usuario');

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  function Deslogar(){
    localStorage.clear();
    history('/'); 
  }

  return (
    <>
      <div className='content-sub'>
      <div className=' menu-mob submenu' style={{marginBottom: 40}}>
           <a className='menuic' href='/interno'> 
              <img className='img-navmess' src={Messeger} alt="" />   
              </a>
              <div className='menu-user' onClick={Deslogar}>
              <img className='img-nav' src={LogoAvatar} alt="" /><div><h2>{user}</h2> <span>Sair <MdOutlineExitToApp style={{marginLeft: 10}}/></span></div> 
              </div>
          </div>
      </div>
    </>
    
  );
}
