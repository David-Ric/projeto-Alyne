import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Sobre.scss';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import LogoSobre from '../assets/gif-sobre.gif';
import Footer from '../components/Footer';
import SubMenu from '../components/SubMenu';

export default function Game() {
  const user = localStorage.getItem('@Ole/Usuario');

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Navbar />
      <div className='content-sobre'>
      {user !=''?(<>
        <SubMenu/>
      </>):(<></>)}

        <div className='conteudo-sobre'>
            <h1>Programa Olé</h1>
            <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.</p><br />
            <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.</p>
        </div>
        <div className='div-gif'>
        <iframe id='gif-sobre' src={LogoSobre} frameBorder='0' height={200}></iframe>
        </div>
        
      </div>
      <Footer/>
    </>
    
  );
}