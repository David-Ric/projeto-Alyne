import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Game.scss';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubMenu from '../components/SubMenu';

export default function Interno() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <div className='content-sobre'>
      <SubMenu/>
        <div className='conteudo-sobre'>
            
        
      </div>
      </div>
      <Footer/>
    </>
    
  );
}
