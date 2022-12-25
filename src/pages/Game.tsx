import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Game.scss';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EquipeShow from '../assets/equipeshow.gif';
import SubMenu from '../components/SubMenu';

export default function Game() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <div className='content-game'>
      <SubMenu/>
        <div className='conteudo-game'>
          <div className='equipe'>
          <h1 style={{color:'gold'}}><b style={{color:'#fff'}}>Equipe:</b> Almoxarifado de Embalagens</h1>
          </div>
          <div className='pontos'>
            <div className='notas'>
              <div className='conjunto-notas'>
              <div className='total-pontos'>
            <div className='colocacao'>
            <h1>23º</h1>
            </div>
            <h2>Colocação</h2>
            </div>
            <div className='total-pontos'>
            <div className='colocacao nota-ole'>
            <h1>7,7</h1>
            </div>
            <h2>Nota mensal Olé</h2>
            </div>
              </div>
           
            <div className='resultado'>
              <h1>Resultado do dia: 21/12/2022</h1>
            </div>
            <button className='btn btn-entrar btn-classific'>Classificação Geral</button>
            </div>
          </div>
        </div>
      </div>
      <div className='conrteudo-frame'>
      <iframe id='gif-equipe' src={EquipeShow} frameBorder='0' ></iframe>
      </div>
      <Footer/>
    </>
    
  );
}
