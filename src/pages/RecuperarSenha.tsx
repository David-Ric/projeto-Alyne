import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/RecuperarSenha.scss';
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
import { iDadosUsuario } from '../@types';
import { BsBackspaceFill } from "react-icons/bs";

export default function RecuperarSenha() {
  const history = useNavigate();
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    //console.log('usuario', usuario)
  },[]);

  function LimparErro(){
    setAlertErro(false);
  }
  function Entrar(){
  history('/login'); 
}


  //=========== fução login ==================================//
  async function Login() {
     if(email ==''){
      let usuario: any;
      usuario = document.getElementById("user");
      //usuario.style.borderColor = "red";
      document.getElementById("user")?.focus();
      setAlertErro(true);
      setMsgErro("E-mail não informado.");
      return;
     }
     
     api.post("/api/Account/Login",{
      username: email,
     
     })
     .then((response) => {
      console.log(response.data);
     if(response.data.ativo=="true"){
      localStorage.setItem(
        "@Portal/usuario",
        JSON.stringify(response.data)
      );
       if(response.data.grupo ='1'){
        history('/admin-home'); 
       }
       if(response.data.grupo ='2'){
        history('/comercial-home'); 
       }
       if(response.data.grupo ='3'){
        history('/representante-home'); 
       }
       if(response.data.grupo ='3'){
        history('/inicial-home'); 
       }
     }else{
      setEmail('');
    email='';
    
     document.getElementById("email")?.focus();
     setAlertErro(true);
     setMsgErro("Usúario inativado, entre em contato com o suporte.");
     return;
     }
     
    })
    .catch((error) => {
      console.log("Ocorreu um erro ");
      if (error.response?.status === 401) {
        setEmail('');
    email='';
    
     document.getElementById("email")?.focus();
     setAlertErro(true);
     setMsgErro("E-mail não enviado.");
     return;
      }
    });
     
    
    }
 
    //==========================================================//
  return (
    <>
      <Navbar />
      
      <div className='content-home'>
      
      <div className='contentrec'>
        
          <div className='logo-recuperar'></div>
          <div className='bloco-login'>
          <img src={Logo} alt="" width={140} style={{marginBottom:10}}/>
          <div className='bloco-title'>
          <h1 style={{fontWeight:"bold", 
          textAlign: "left", 
          marginLeft:33, 
          fontSize: 18,
          color: "red"
          }}>ESQUECEU SUA SENHA?</h1>

          <h1 style={{fontWeight:"bold", textAlign: "left", marginLeft:33}}>RECUPERAR SENHA</h1>
          <h1 style={{textAlign: "left", marginLeft:33,maxWidth:280, lineHeight:2, fontSize:14, marginTop: 10 }}>informe seu e-mail cadastrado para recuperar sua senha:</h1>

          </div>
          {alertErro && (
					<div className="mt-3 mb-0" >
						<Alert msg={msgErro} setAlertErro={setAlertErro} />
					</div>
					)}
      <div style={{marginBottom:20, marginTop:10}} className='bloco-input'>
      <p className="labelform" >E-mail</p>
        <input className='form-coontrol inputlogin' 
        id='email'
        type="text"
        name='user' 
        value={email}
        onKeyDown={LimparErro} 
        onChange={(e)=>{ 
          setEmail(e.target.value.toLowerCase());
        }}
        />
      </div>
      
      
      <button style={{marginTop:0, marginBottom:10}} className='btn btn-enviar'onClick={Login}>Enviar</button>
      <p className="center register-link">
            <a href="/">Voltar ao login <BsBackspaceFill/> </a>
          </p>
      </div>
      

        </div>
      </div>
      
      <Footer/>
    </>
    
  );
}
