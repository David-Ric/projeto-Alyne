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

export default function RecuperarSenha() {
  const history = useNavigate();
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [showMensage, setShowMensage] = useState(false);



  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  useEffect(() => {
    logado();
    window.scrollTo(0, 0);
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
  history('/'); 
}

  //=========== fução login ==================================//
  async function EnviarEmail() {
     if(email ==''){
      let usuario: any;
      usuario = document.getElementById("email");
      //usuario.style.borderColor = "red";
      document.getElementById("email")?.focus();
      setAlertErro(true);
      setMsgErro("E-mail não informado.");
      return;
     }
     
     api.post(`/api/Auth/forgot-password?email=${email}`)
     .then((response) => {
     // console.log(response.data);
    
      localStorage.setItem(
        "@Portal/token-reset",
        JSON.stringify(response.data)
      );
      Redefinir();
      setShowMensage(true)
      setAlertErroMensage(true);
      setMsgErro("Enviamos um email para redefinição de senha, verifique sua caixa de e-mail.");
      setEmail('');
     
    })
    .catch((error) => {
      //console.log('resposta', error.response.data)
    //  console.log("Ocorreu um erro ");
      if (error.response?.status === 400) {
      //  setEmail('');
   // email='';
     document.getElementById("email")?.focus();
     setAlertErro(true);
     const  data  = error.response.data;
    setMsgErro(data);
    //  setMsgErro("E-mail não enviado.");
     return;
      }
    });
     
    
    }
 
    //========envio de email==================================================//
    async function Redefinir() {
      
        api.post("/api/Email",{
          emails: [
            email
          ],
          subject: "Redefinição de senha",
          body: "<div ><h2>Falta pouco para redefinir sua senha!!!<a href=\"http://localhost:3000/redefinir-senha\"> Clique aqui para redefinir...</a></h2></br></br><img src=\"https://lh3.googleusercontent.com/OZZIYLByQqWZzXxXOrQLJBz-xkcTD5Tf74yGzP2Y-pWSigjKxiTfUNHvcANSviS2tZFY48vsneoTf1YmVScFAU0gphNM_Gn3PtkJvXBjFeajkDw7Zg8B53Q13GlfINekMLXU7g5tDqOO4mB9OKjHAGPQtDyeKwc1FJ3BF_RuR4hUhmDq4b1i1zfKJkb0_lNGCy7822x3TLqMfL20GVhnXaFIeKTKAlNQYIA7KlFJgmCCZo_rGcr-5ToztL8ZKx65T9hes9xILi5k-5v24dH84sIPbjQIoqlLGqpQcHOtTVHonQ00yQnhZfqFWto7cuCdakORIl8Bc79JXjNMN5z72FO6e3ctg4J0Ik_Kzv9knyO3X5T-9XM2c8wv4PSfNnuiyzPemXx69O9yf8j5iWGa1xTkIFKNoYYL-AX9l4B47uluhBH1ApzSbCyZDSNe1Q_oARhTMu2ocgLNwQ7InPxZHSm5-RJD7H2XgAsgOOzmLclgnZhKJrbU0tvtVj40WAiuJCAtsrZQWSPHxR0o8AzWbwHqF_wohSdWpIyUqyogDwVUtajEpO_AAdDbDnHtlY3s0CeVeE4YczV9ZW02Q2C1ukuTRmNy2iLeUzCjC91JtzfxCaa4RawxFkfL0GkmFbCtFZ_2xMYNYSbzoTnAheo79798KACMF8PamNuEimoyzu8F1WEgLnlh7d-LK85Y0L44yFcSQ9rdtMzdIww84_RLvkAoGDCZIdPd8UOvndOxqDa6Tpyd5zNYvkBbvyWaDSrslRIIHYRbHQTTGEv3vV3VIzrTstZoyGXP6DSWhtjkL7SFcbYmrx3Dc3HEatZZP35xs_YdFBDo8nwf3fANdloAGHDHj5hUL058sI-aAJW0dw9z3sLQaN1JTy4BbYKR4Ll0bYzMgadzuLFMqBS1EhpuBzfpWHD9HrJ83ivngUvsVtHN=w742-h494-no?authuser=0\" height=\"500\" width=\"800\"></div>",
          "isHtml": true
        })
        .then((response) => {
       console.log(response.data);
       localStorage.setItem(
        "@Portal/token-reset-now",
        JSON.stringify(response.data)
      );
        
      })
       .catch((error) => {
     
         setAlertErro(true);
       const  data  = error.response.data;
      setMsgErro(data);
       return;
   
       });
       
  
      }
    //==========================================================
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
      
      
      <button style={{marginTop:0, marginBottom:10}} className='btn btn-enviar'onClick={EnviarEmail}>Enviar</button>
      <p className="center register-link">
            <a href="/">Voltar ao login <BsBackspaceFill/> </a>
          </p>
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
