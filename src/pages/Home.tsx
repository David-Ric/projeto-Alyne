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
import Logo from '../assets/logo-dark.png';
import api from '../services/api';
import Alert from "../components/Alert";
import { iDadosUsuario } from '../@types';
import { Si1Password } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import Loading from "../components/Loading";

export default function Home() {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  let [user, setUser] = useState('');
  let [senha, setSenha] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    logado();
   // console.log('usuario', usuario)
  },[]);

  function logado(){
   
    if(usuario.token && usuario.status=="1"&& usuario.grupoId==1){
      history('/admin-home'); 
    }
    if(usuario.token && usuario.status=="1"&& usuario.grupoId==2){
      history('/comercial-home'); 
    }
    if(usuario.token && usuario.status=="1"&& usuario.grupoId==3){
      history('/representante-home'); 
    }
    if(usuario.token && usuario.status=="1"&& usuario.grupoId==4){
      history('/inicial-home'); 
    }
  }

  function LimparErro(){
    setAlertErro(false);
  }
  function Entrar(){
  history('/login'); 
}


  //=========== fução login ==================================//
  async function Login() {
   setLoading(true);
     if(user ==''){
      setLoading(false);
      let usuario: any;
      usuario = document.getElementById("user");
      //usuario.style.borderColor = "red";
      document.getElementById("user")?.focus();
      setAlertErro(true);
      setMsgErro("Usuario não informado.");
      return;
     }
     if(senha ==''){
      setLoading(false);
      let usuario: any;
      usuario = document.getElementById("senha");;
      document.getElementById("senha")?.focus();
      setAlertErro(true);
      setMsgErro("Senha não informada.");
      return;
     }
     await api.post("/api/Auth/login",{
      username: user,
      password: senha
     })
     .then((response) => {
      setLoading(false);
    //  console.log(response.data);
     if(response.data.status =="1"){
      localStorage.setItem(
        "@Portal/usuario",
        JSON.stringify(response.data)
      );
       if(response.data.grupoId ==1){
        history('/admin-home'); 
       }
       if(response.data.grupoId ==2){
        history('/comercial-home'); 
       }
       if(response.data.grupoId ==3){
        history('/representante-home'); 
       }
       if(response.data.grupoId ==4){
        history('/inicial-home'); 
       }
     }else{
      setUser('');
    user='';
    setSenha('');
    senha='';
     document.getElementById("user")?.focus();
     setAlertErro(true);
     setMsgErro("Usúario inativado, entre em contato com o suporte.");
     return;
     }
     
    })
    .catch((error) => {
      setLoading(false);
      if (error.response?.status != 400) {
        setAlertErro(true);
        setMsgErro("Ops... aconteceu um erro inesperado, tente novamente mais tarde.");
        setUser('');
        user='';
        setSenha('');
        senha='';
         document.getElementById("user")?.focus();
         return;
      }
      console.log(error.response.data );
      if (error.response?.status === 400) {
        setUser('');
    user='';
    setSenha('');
    senha='';
     document.getElementById("user")?.focus();
     setAlertErro(true);
     const  data  = error.response.data;
    setMsgErro(data);
    //  setMsgErro("Usúario ou senha invalidos.");
     return;
      }
    });
     
    
    }
 
    //==========================================================//
  return (
    <>
      <Navbar />
      
      <div className='content-home'>
      
      <div className='content'>
        
          <div></div>
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
      <div style={{marginBottom:20}} className='bloco-input'>
      <p className="labelform" >Usuario</p>
        <input className='form-coontrol inputlogin' 
        id='user'
        type="text"
        name='user' 
        value={user}
        onKeyDown={LimparErro} 
        onChange={(e)=>{ 
          setUser(e.target.value.toLowerCase());
        }}
        />
      </div>
      <div className='bloco-input'>
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
      <button className='btn btn-entrar' disabled={loading} onClick={Login}>
      {loading ? "Carregando " : "Entrar "}
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
       </button>
       <p className="center register-link">
            <a href="/recuperar-senha">Esqueci minha senha <Si1Password/> </a>
          </p> 
      </div>
         

        </div>
      </div>
      
      <Footer/>
    </>
    
  );
}
