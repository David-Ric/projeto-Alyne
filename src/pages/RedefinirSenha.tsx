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
import Modal from 'react-bootstrap/Modal';

export default function RedefinirSenha() {
  const history = useNavigate();
  let [confirmaSenha, setConfirmaSenha] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  let [username, setUsername] = useState('');

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );
  const token: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/token-reset") || "{}"
  );
  const tokenReset = JSON.parse(
    localStorage.getItem("@Portal/token-reset-now") || "{}"
  );
  useEffect(() => {
    logado();
    window.scrollTo(0, 0);

    if(tokenReset !='portalgrupoalyne')
    {
      history('/'); 
    }
    //console.log('usuario', usuario)
  },[]);

  function logado(){
   
    if(usuario.token && usuario.status=="1"&& usuario.grupo=="1"){
      history('/admin-home'); 
    }
    if(usuario.token && usuario.status=="1"&& usuario.grupo=="2"){
      history('/comercial-home'); 
    }
    if(usuario.token && usuario.status=="1"&& usuario.grupo=="3"){
      history('/representante-home'); 
    }
    if(usuario.token && usuario.status=="1"&& usuario.grupo=="4"){
      history('/inicial-home'); 
    }
  }

  function LimparErro(){
    setAlertErro(false);
  }

function handleCloseMensage(){
  setShowMensage(false)
  //history('/'); 
  Login()
}


  //=========== fução login ==================================//
  async function Redefinir() {
    if(senha != confirmaSenha){
      setAlertErro(true);
      setMsgErro(
        "As senhas não conferem."
        );
        return
      }
     
      api.post("/api/Auth/reset-password",{
       token: token,
       password: senha,
       confirmPassword: confirmaSenha
      })
      .then((response) => {
     //  console.log(response.data);
       setUsername(response.data.data);
       username=response.data.data.username;
       setShowMensage(true)
      setAlertErroMensage(true);
      setMsgErro(response.data.resposta);
      
    })
     .catch((error) => {
     //  console.log('resposta', error.response.data)
       setAlertErro(true);
     const  data  = error.response.data;
    setMsgErro(data);
     return;
 
     });
     

    }
 
    //============Logar Direto==========================================//
    async function Login() {
      localStorage.getItem("@Portal/token-reset-now")
      localStorage.removeItem("@Portal/token-reset") 
      api.post("/api/Auth/login",{
       username: username,
       password: senha
      })
      .then((response) => {
       console.log(response.data);
      if(response.data.status =="1"){
       localStorage.setItem(
         "@Portal/usuario",
         JSON.stringify(response.data)
       );
        if(response.data.grupo =='1'){
         history('/admin-home'); 
        }
        if(response.data.grupo =='2'){
         history('/comercial-home'); 
        }
        if(response.data.grupo =='3'){
         history('/representante-home'); 
        }
        if(response.data.grupo =='4'){
         history('/inicial-home'); 
        }
     
      
     } })
     .catch((error) => {
       console.log(error.response.data );
       if (error.response?.status === 400) {
   
      document.getElementById("user")?.focus();
      setAlertErro(true);
      const  data  = error.response.data;
     setMsgErro(data);

      return;
       }
     });
      
     
     }


    //==========================================================
  return (
    <>
      <Navbar />
      
      <div className='content-home'>
      
      <div className='contentrec'>
        
          <div className='logo-redefinir'></div>
          <div className='bloco-login'>
          <img src={Logo} alt="" width={140} style={{marginBottom:10}}/>
          <div className='bloco-title'>
          <h1 style={{fontWeight:"bold", 
          textAlign: "center", 
          
          fontSize: 18,
          color: "red"
          }}>REDEFINIR SENHA</h1>

         

          </div>
          {alertErro && (
					<div className="mt-3 mb-0" >
						<Alert msg={msgErro} setAlertErro={setAlertErro} />
					</div>
					)}
      <div style={{marginBottom:20, marginTop:10}} className='bloco-input'>
      <p className="labelform" >Nova senha</p>
        <input className='form-coontrol inputlogin' 
        id='senha'
        type="password" 
        name='password'
        value={senha}
        onKeyDown={LimparErro} 
        onChange={(e)=>{
          setSenha(e.target.value);
        }}
        />
      </div>
      <div style={{marginBottom:20, marginTop:10}} className='bloco-input'>
      <p className="labelform" >Repetir senha</p>
        <input className='form-coontrol inputlogin' 
        id='confirmaSenha'
        type="password" 
        name='password'
        value={confirmaSenha}
        onKeyDown={LimparErro} 
        onChange={(e)=>{
          setConfirmaSenha(e.target.value);
        }}
        />
      </div>
      
      
      <button style={{marginTop:0, marginBottom:10}} className='btn btn-enviar'onClick={Redefinir}>Redefinir</button>
      {/* <p className="center register-link">
            <a href="/">Voltar ao login <BsBackspaceFill/> </a>
          </p> */}
      </div>
      

        </div>
        {/* ================Modal Cofirmação ============================================== */}

  <Modal className='modal-confirm' show={showMensage} onHide={handleCloseMensage}>
        <Modal.Header  closeButton>
          <h1>Status da solicitação</h1>
        </Modal.Header>
        <Modal.Body>
        {alertErroMensage && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
					</div>
					)}
          <button style={{width:130}} className='btn btn-primary' onClick={handleCloseMensage}>Ok</button>
        </Modal.Body>
      
      </Modal>
      </div>
      
      <Footer/>
    </>
    
  );
}
