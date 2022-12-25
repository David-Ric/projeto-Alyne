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


export default function Home() {
  const history = useNavigate();
  const user = localStorage.getItem('@Ole/Usuario');

  useEffect(() => {
    window.scrollTo(0, 0);
  });
function Entrar(){
  history('/login'); 
}
  return (
    <>
      <Navbar />
      
      <div className='content-home'>
      {user !=null?(<>
        <SubMenu/>
      </>):(<></>)}
      <div className='content'>
        <div className='logoOle'>
          <img src={LogoOle} alt="" />
        </div>
        <div className='bloco2'>
        <div className='logoAvatar'>
          <img src={LogoAvatar} alt="" />
        </div>
        <div className='text-btn'>
        <h2>Entre nesse game sensacional!!</h2>
        {user !=null?(<></>):(<>
        <button className='btn btn-entrar' onClick={Entrar}>Entrar</button>
        </>)}
        <iframe src={ChampGif} frameBorder='0' width='200' height='200'></iframe>
        </div>
      </div>
      </div>
      </div>
      <Footer/>
    </>
    
  );
}
