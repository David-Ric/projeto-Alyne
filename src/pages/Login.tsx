import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Login.scss';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import Logo from '../assets/logo-login.png';
import Footer from '../components/Footer';
import api from '../services/api';
import Alert from "../components/Alert";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  function LimparErro(){
    setAlertErro(false);
  }

   //=========== fução login ==================================//
   async function Login() {
   if(user ==''){
    let usuario: any;
    usuario = document.getElementById("user");
    //usuario.style.borderColor = "red";
    document.getElementById("user")?.focus();
    setAlertErro(true);
    setMsgErro("Usuario não informado.");
    return;
   }
   if(senha ==''){
    let usuario: any;
    usuario = document.getElementById("senha");;
    document.getElementById("senha")?.focus();
    setAlertErro(true);
    setMsgErro("Senha não informada.");
    return;
   }
   if(user !='carlos' && senha !='cigel'){
    setUser('');
    user='';
    setSenha('');
    senha='';
     document.getElementById("user")?.focus();
     setAlertErro(true);
     setMsgErro("Usúario ou senha invalidos.");
     return;
   }else{
    history('/game'); 
    localStorage.setItem('@Ole/Usuario','Carlos');
   }
    //  api.post('?serviceName=MobileLoginSP.login&outputType=json', {})
    //    .then(response => {
   
    //    })
    //    .catch(error => {
        
    //    })
   }

   //==========================================================//


  return (
    <>
      <Navbar />
      
      <div className='content-login'>
        <div className='bloco-login'>
          <img src={Logo} alt="" width={140} style={{marginBottom:10}}/>
          <div className='bloco-title'>
          <h1>LOGIN</h1>
          </div>
          {alertErro && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErro} />
					</div>
					)}
      <div className='bloco-imput'>
      <p className="labelform" >Usuario</p>
        <input className='form-coontrol inputlogin' 
        id='user'
        type="text"
        name='user' 
        value={user}
        onKeyDown={LimparErro} 
        onChange={(e)=>{
          setUser(e.target.value);
        }}
        />
      </div>
      <div className='bloco-imput'>
      <p className="labelform" >Senha</p>
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
      <button className='btn btn-entrar'onClick={Login}>Logar</button>
      <p className="center register-link">
            Não tem uma conta cadastrada? <a href="">Cadastre Aqui</a>
          </p>
      </div>
     
      </div>
      <Footer/>
    </>
    
  );
}
