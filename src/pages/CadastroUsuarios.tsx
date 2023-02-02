import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/CadastroUser.scss';
import '../styles/global.scss';
import Navbar from '../components/Navbar';
import LogoOle from '../assets/ole-logo.png';
import PhotoUser from '../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import ChampGif from '../assets/playy.gif';
import Footer from '../components/Footer';
import SubMenu from '../components/SubMenu';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-dark.png';
import api from '../services/api';
import Alert from "../components/Alert";
import SideNavBar from '../components/Navbar/SideNavBar';
import NavbarDashHeader from '../components/Navbar/NavbarDashHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TfiNewWindow } from "react-icons/tfi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import Table from 'react-bootstrap/Table';
import { iMenu, iUsuarios } from '../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from "../components/Paginacao";
import { phoneMask } from '../Masks/Masks';
import { FaSearchPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { iDadosUsuario, iDataSelect } from '../@types';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function CadUsuarios() {
  const history = useNavigate();

  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [senhaConfirm, setSenhaConfirm] = useState('');
  const [urlPerfil, setUrlPerfil] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ativo, setAtivo] = useState('1');
  const [funcao, setFuncao] = useState('');
  const [grupo, setGrupo] = useState('');
  const [admin, setAdmin] = useState(false);
  const [comercial, setComercial] = useState(false);
  const [representante, setRepresentante] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(false);
  let [menuPrincipal, setMenuPrincipal] = useState<iMenu[]>([]);

  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);


  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [usuarios, setUsuarios] = useState<iUsuarios[]>([]);
  const [usuariosget, setUsuariosget] = useState<iUsuarios[]>([]);
  let [usuariosCount, setUsuariosCount] = useState<iUsuarios[]>([]);
  let [usuariosFilter, setUsuariosFilter] = useState<iUsuarios[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);
  let [totalPaginasPerm, setTotalPaginasPerm] = useState(0);


   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [searchStatus, setSearchStatus] = useState('');
   const [filter, setFilter] = useState(false);
   

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);
   const [qtdePagMenu, setQtdePagMeu] = useState(5);

  

   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaStatus, setPesquisaStatus] = useState(false);

   let [selectGrupo, setSelectGrupo] = useState<iDataSelect>();

   //======options dos selects ===================//
   const status = [
    { value: '1', label: 'Ativo' },
    { value: '2', label: 'Inativo' }
  ];
   const grupos = [
     { value: '1', label: 'ADMINISTRATIVO' },
     { value: '2', label: 'COMERCIAL' },
     { value: '3', label: 'REPRESENTANTE' },
     { value: '4', label: 'USUÁRIO' }
    
   ];

   const grupoCreate:iDataSelect[] = [
     { value: '2', label: 'COMERCIAL' },
     { value: '3', label: 'REPRESENTANTE' },
     { value: '4', label: 'USUÁRIO' }
    
   ];
  // const [grupoCreate, setGrupoCreate] = useState<iDataSelect[]>([
  //    { value: '2', label: 'COMERCIAL' },
  //    { value: '3', label: 'REPRESENTANTE' },
  //    { value: '4', label: 'USUÁRIO' }
  // ]);
  //  const [grupos, setGrupos] = useState<iDataSelect[]>([
  //    { value: '1', label: 'ADMINISTRATIVO' },
  //    { value: '2', label: 'COMERCIAL' },
  //    { value: '3', label: 'REPRESENTANTE' },
  //    { value: '4', label: 'USUÁRIO' }
  //  ]);

  //================================================//

   const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  // const handleShow = () => setShow(true);
  useEffect(() => { 
    logado()
   
   // GetUsuariosAcount();
  },[]);
  async function GetMontarMenu() {
    setFilter(false);

    await api

      .get(`/api/Menu?pagina=${pagina}&totalpagina=${qtdePagMenu}`)
      .then((response) => {

        setMenuPrincipal(response.data.data);
        menuPrincipal=response.data.data;
      //  console.log("vendedor",menuPrincipal)


        setTotalPaginasPerm(Math.ceil(response.data.total / qtdePagMenu));

      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
  async function GetPaginaId(id:any) {
    // setIdPagina(0);
    // setCodigo('');
    // setNome('');
    // setUrl('');
    // setIcon('');

    setEdit(true);
    setShowEdit(true);
    setLoadingUpdate(false);
    await api
      .get(`/api/Menu/${id}`)
      .then((response) => {
        // setMenuIdGet(response.data.pagina);
        //  menuIdGet=response.data.pagina;
        //   setIdPagina(response.data.id);
        //    setNome(response.data.nome);
        //    setNomeMenuEdit(response.data.nome);
        //    nomeMenuEdit=response.data.nome;
        //     setNomeSubMenuEdit(response.data.subMenu[0]?.nome);
        //     nomeSubMenuEdit=response.data.subMenu[0]?.nome;
        //     setCodMenuEdit(response.data.codigo);
        //     codMenuEdit=response.data.codigo;
        //     setIdSubMenuEdit(response.data.subMenu[0]?.id);
        //     idSubMenuEdit=response.data.subMenu[0]?.id;
        //     setIdMenuEdit(response.data.id);
        //     idMenuEdit=response.data.id;
        //    setCodigo(String(response.data.codigo));
        //    setUrl(response.data.url);
        //    setIcon(response.data.icon);
        //    GetSubMenuEdit()
        console.log('menu Id',response.data);
        // console.log("menu get id",menuIdGet);
        // GetPaginasEdite();
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  function logado(){
   
    //  if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupoId==1){
    //    history('/admin-home'); 
    //  }
    //  if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupoId==2){
    //    history('/comercial-home'); 
    //  }
    //  if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupoId==3 ){
    //    history('/representante-home'); 
    //  }
    //  if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupoId==4){
    //    history('/inicial-home'); 
    //  }
  }
 
  useEffect(() => {
    window.scrollTo(0, 0);
    GetMontarMenu();
    if(!filter){
      GetUsuarios();
    }else{
      GetUsuariosFilter();
    }
    
  },[pagina]);
  function handleShowMensage(){
   
    setShowMensage(true);
    setTimeout(function() {
            
   //   setShowMensage(false);
      
     }, 1200);
  }

  function SenhanaoCofere(){
    if(senha != senhaConfirm){
    setAlertErroRegister(true);
    setMsgErro(
      "As senhas não conferem."
      );
       let senha: any;
       senha = document.getElementById("senha");
     senha.style.backgroundColor = "#ff6961";
    let senhaconf: any;
      senhaconf = document.getElementById("confirma");
    senhaconf.style.backgroundColor = "#ff6961";
    }
  }
  function LimpaerroSenhaConfirm(){
    setAlertErroRegister(false);
     let senha: any;
       senha = document.getElementById("senha");
     senha.style.backgroundColor = "#ffff";
    let senhaconf: any;
      senhaconf = document.getElementById("confirma");
    senhaconf.style.backgroundColor = "#ffff";
    senhaconf.style.backgroundColor = "#ffff";
  }
 function LimparTodos(){
  setAlertErroRegister(false);
 }
  function handleShow(){
    setPrimeiroNome('');
    setUltimoNome('');
    setNomeUsuario('');
    setUsuario('');
    setEmail('');
    setSenha('');
    setSenhaConfirm('');
    setUrlPerfil('');
    setTelefone('');
     setAtivo('1');
     setFuncao('');
     setGrupo('');
     setIdUser(0);
     setAdmin(false);
    setComercial(false);
    setRepresentante(false);
    setTipoUsuario(false);
    setSenha('');
    setSenhaConfirm('');
    setShow(true);
  }
 

  async function GetUsuarios() {
    setFilter(false);
    await api
    
      .get(`/api/Usuarios?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setUsuarios(response.data.data);
     //   console.log('dados',response.data);
        usuarios=response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        // setTotalPaginas(response.data.total / qtdePagina);
     //  console.log('total de paginas',totalPaginas);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

  async function GetUsuariosFilter() {
    setFilter(true);
    await api
      .get(`/api/Usuarios/filter?pagina=${pagina}&totalpagina=999&filter=${search}`)
      .then((response) => {
        setUsuarios(response.data.data);
        usuarios=response.data.data;
       // setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
      //  setUsuariosFilter(response.data);
      //  usuariosFilter=response.data;
       console.log('usuarios pesquisa',response.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
 
  
    //=========== get usuarios por ID ==================================//
  async function GetUsuarioId(id:any) {
    setPrimeiroNome('');
    setUltimoNome('');
    setNomeUsuario('');
    setUsuario('');
    setEmail('');
    setSenha('');
    setSenhaConfirm('');
    setUrlPerfil('');
    setTelefone('');
     setAtivo('Ativo');
     setFuncao('');
     setGrupo('');
     setIdUser(0);
     setAdmin(false);
    setComercial(false);
    setRepresentante(false);
    setTipoUsuario(false);
    setEdit(true);
    setShowEdit(true);
    
    await api
      .get(`/api/Usuarios/${id}`)
      .then((response) => {
          setUsuariosget(response.data)
          setIdUser(response.data.id);
          setPrimeiroNome(response.data.nomeCompleto);
          setEmail(response.data.email);
          setNomeUsuario(response.data.username);
          setUsuario(response.data.username);
          setUrlPerfil(response.data.imagemURL);
          setTelefone(response.data.telefone);
          setAtivo(response.data.status);
          setFuncao(response.data.funcao);
          setGrupo(String(response.data.grupoId));
    
          setAdmin(response.data.admin);
          setComercial(response.data.comercial);
          setRepresentante(response.data.representante);
          setTipoUsuario(response.data.usuario);


      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar Usuario ===============================//
  async function editUser(){
    setLoadingUpdate(true)
  await api.put(`/api/Usuarios/${idUser}`, {
  id: idUser,
  username:usuario,
  password: senha,
  nomeCompleto:primeiroNome ,
  email: email,
  telefone:telefone,
  grupoId: Number(grupo),
  status: ativo,
  funcao: funcao,
  admin: admin,
  usuario: tipoUsuario,
  comercial: comercial,
  representante: representante,
  imagemURL: urlPerfil
  })
    .then(response => {
      handleCloseEdit()
     // GetUsuariosAcount();
      GetUsuarios();
      setLoadingUpdate(false)
     // console.log('resposta', response)
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Dados do usuário atualizados com sucesso.");
    })
    .catch((error) => {
      setLoadingUpdate(false)
      handleCloseEdit()
      window.scrollTo(0, 0);
      handleShowMensage()
      setAlertErroMensage(true);
      //console.log('resposta', error.response.data)
      //setAuthenticated(false);
    const { data } = error.response;
    setMsgErro(data.message);
      //setMsgErro(
        // error.response.data.message
        //   ? error.response.data.message
        //   : "Houve um erro ao tentar editar o usuário. Tente novamente mais tarde."
      //);
     
      return;
    });
  }
    //============ Criar Usuario ===============================//
    async function CreateUsuario(){

      if(primeiroNome==''){
        let senhaconf: any;
        senhaconf = document.getElementById("prinome");
        document.getElementById("prinome")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o primeiro nome.");
      return
      }

      if(email==''){
        let senhaconf: any;
        senhaconf = document.getElementById("email");
        document.getElementById("email")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o E-mail.");
      return
      }
      if(usuario==''){
        let senhaconf: any;
        senhaconf = document.getElementById("usuario");
        document.getElementById("usuario")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o usuário.");
      return
      }
      if(senha==''){
        let senhaconf: any;
        senhaconf = document.getElementById("senha");
        document.getElementById("senha")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar a senha.");
      return
      }
      if(senhaConfirm==''){
        let senhaconf: any;
        senhaconf = document.getElementById("confirma");
        document.getElementById("confirma")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório confirmar a senha.");
      return
      }
      if(grupo==''){
        let senhaconf: any;
        senhaconf = document.getElementById("grupo-create");
        document.getElementById("grupo-create")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o grupo que o usuário pertence.");
      return
      }
  setLoadingCreate(true)
  await api.post("/api/Auth/register",{
        username: usuario,
        email: email,
        grupoId: Number(grupo),
        status: ativo,
        funcao: funcao,
        admin: admin,
        usuario: tipoUsuario,
        comercial: comercial,
        representante: representante,
        password: senha,
        nomeCompleto: primeiroNome,
       })
       
        .then(response => {
          setLoadingCreate(false)
         // GetUsuariosAcount();
          GetUsuarios();
          handleClose ();
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro("Usuário criado com sucesso.");
        })
        .catch((error) => {
         // handleClose()
          window.scrollTo(0, 0);
          handleShowMensage()
          setAlertErroMensage(true);
  
          if(error.response.data){
            setLoadingCreate(false)
            console.log(error.response.data)
            setMsgErro(error.response.data);
          }else{
            setMsgErro(
              "Houve um erro ao tentar criar o usuário. Tente novamente mais tarde."
              );
          }
          
          setLoadingCreate(false)
         
          return;
        });
      }
    //==========================================================//
function LimparPesquisa(){
  setSearch('');
  setSearchStatus('');
  setPagina(1);
  PesquisaNome();
  setFilter(false);
  GetUsuarios();
}

function PesquisaNome(){
  setSearch('');
  GetUsuarios();
  setPesquisaNome(true);
  setPesquisaStatus(false);
  let pesquisar: any;
  pesquisar = document.getElementById("nomePesquisa");
  document.getElementById("nomePesquisa")?.focus();
}
 
function PesquisaStatus(){
  setSearch('');
  GetUsuarios();
  setPesquisaNome(false);
  setPesquisaStatus(true);
  let pesquisa: any;
  pesquisa = document.getElementById("statusPesquisa");
  document.getElementById("statusPesquisa")?.focus();
}

  return (
    <>
    
  
      
      <div className='content-global'>
     
        <div className='conteudo-cotainner'>
         <div className=''>
         <SideNavBar/> 
         </div>
         <div>
         <NavbarDashHeader/>
         <div className='titulo-page'>
            <h1>Cadastro de Usuários</h1>
            </div>
            {loading ? (
          <div className="d-flex justify-content-center total-loading">
          <div className='div-loading'>
          <div className="spinner-border" role="status">
            
          </div>
          <h2 className="sr-only">Carregando...</h2>
          </div>
        </div>
                 
                          ) : (
            <div style={{justifyContent:'center'}} className="contain d-flex">
              <div className='logo-cadastro'></div>
          <div className='conteudo'>
            <div className='div-button-top'>
              <div className='pesBloco'>
                <div className='title-pesBloco'>
                <span style={{fontSize:14}}>Pesquisar por:</span>
                </div>
                <div className='d-flex'>
                  <input  name='pesquisa' type="radio" checked={pesquisaNome}  onChange={PesquisaNome} /><p style={{fontSize:13,marginLeft:8}} >Nome</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaStatus}  onChange={PesquisaStatus} /><p style={{fontSize:13,marginLeft:8}} >Status</p>
                  </div>
              </div>
          <OverlayTrigger
          placement={"top"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Novo Usuário</Tooltip>}
        >
      <button className='btn btn-dark btn-direito'  onClick={handleShow}>
        Novo <TfiNewWindow style={{marginLeft: 8,marginBottom:5}}/>
      </button>
      </OverlayTrigger>
      </div>
            <div style={{marginTop:10, width:"100%"}} className='conteudo-botoes'>
              <div className='bloco-pesquisa-input'>
             {pesquisaNome?(<>
              <div>
              <p className="title-input"  >Pesquisar por nome: </p>
            <input  id="nomePesquisa"  
            type="text" 
            className='form-control inputlogin' 
             name=""
             value={search}
             onChange={(e)=>{ 
              setSearch(e.target.value);
              
            }}
              />
            </div>
             </>):(<></>)}
              {pesquisaStatus?(<>
                <div className='div-pesquisa-status'>
            <p className="title-input"  >Pesquisar por status: </p>
            {/* <select  
            id="statusPesquisa" 
             placeholder='Status' 
             className="form-select select campo-select" 
             aria-label="Escolha o número de quartos" 
             value={search}
             onChange={(e)=>{ 
              setSearch(e.target.value);           
             }}
                        >
                        <option value=""></option>
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>  */}
                     <Select 
                     id="statusPesquisa"  
                     className="select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={status}  
                      onChange={(value: any)=>{ 
                        setSearch(value.value); 
                        console.log('Select',value)          
                      }} 
                    />
                    </div>
              </>):(<></>)}
              </div>

                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas btn-pesquisar'onClick={()=>{setPagina(1);GetUsuariosFilter()}}>Pesquisar<FaSearchPlus style={{marginLeft: 6}} fontSize={17}/></button>
                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas' onClick={LimparPesquisa}>Limpar<AiOutlineClear style={{marginLeft: 6}} fontSize={20}/></button>
                   
                    </div>
          
          <div className="table-responsive table-scroll tabela-responsiva">
      <div className=' table-wrap'>
      <Table responsive className='table-global table  main-table'>
      <thead>
      <tr className="tituloTab">
        
          <th className="th1 Nome-completo">Nome</th>
          <th style={{textAlign:'center'}} className="th2">Grupo</th>
          <th style={{textAlign:'center'}} className="th3">Função</th>
          <th style={{textAlign:'center'}} className="th4">Status</th>
          <th  className="th4">E-mail</th>
          <th  className="th4">Telefone</th>
          <th  className="th4">.</th>
          <th style={{textAlign:'center'}} className="th4 fixed-table">Ações</th>
      </tr>
      </thead>
      <tbody>
      {usuarios.length > 0 ? (
                        <>
      {usuarios.map((usuarios,index)=> (
        <tr key={index}>
         <td className='Nome-completo'>{usuarios.nomeCompleto}</td> 
          <td style={{textAlign:'center'}}>
            {usuarios.grupoId ==1?'Administrativo'
            :usuarios.grupoId ==2?"Comercial"
            :usuarios.grupoId ==3?"Representante":"Usuario"}
            </td>
            <td style={usuarios.funcao ==null ||usuarios.funcao ==""?{color:'red',textAlign:'center'}:{color:'#000',textAlign:'center'}}>{usuarios.funcao?usuarios.funcao:"Não informado"}</td>
            <td style={usuarios.status =='1'?{color:'#008000', textAlign:"center"}:{color:'red', textAlign:"center"}}>{usuarios.status =="1"?"Ativo":"Inativo"}</td>
            <td >{usuarios.email}</td>
            <td style={usuarios.telefone ==null?{color:'red'}:{color:'#000'}} >
            {usuarios.telefone
                            ? phoneMask(usuarios.telefone)
                            : "Não informado"}</td>
            <td style={{color: "transparent"}} >.............</td>
            <td style={{textAlign:'center'}} className="fixed-table td-fixo">
            
            <OverlayTrigger
              placement={"top"}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Editar</Tooltip>}
            >
              <button 
              className='btn btn-table btn-edit' 
              style={{marginRight:15,marginLeft:15}}
              onClick={()=>{
                GetUsuarioId(usuarios.id);
                }}>
                <HiOutlinePencilSquare/>
              </button>
              </OverlayTrigger>

{/* 
              <OverlayTrigger
              placement={"top"}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Deletar</Tooltip>}
            >
              <button 
              className='btn btn-table btn-delete'>
                <RiDeleteBin5Line/>
              </button>
              </OverlayTrigger> */}
              </td>
        </tr>
        ))}
        </> 
        ): (
                        
          <div style={{margin:"auto"}} className="alert alert-warning alerta-user" role="alert">
            Nenhum usuário encontrado.
          </div>
        
        
      )}
      </tbody>
    </Table>
    <Paginacao
                    total={totalPaginas}
                    limit={1}
                    paginaAtual={pagina}
                    setPagina={setPagina}
                  />
      </div>
      </div>
          </div>
            </div> 

            )}
        </div>   
        </div>

      {/* ================Modal Register ============================================== */}

      <Modal className='modal-cadastro-user ' show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <h1>Cadastro de Usuário</h1>
        </Modal.Header>
        <Modal.Body>
        {loadingCreate ? (
          <div className="d-flex justify-content-center total-loading total-loadingCreate">
          <div className='div-loading'>
          <div className="spinner-border" role="status">
            
          </div>
          <h2 className="sr-only">Salvando...</h2>
          </div>
        </div>
                 
                          ) : (<>
        {alertErroRegister && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErroRegister} />
					</div>
					)}
          <div className='conteudo-modal-cadastro-user'>
        <div  className='coluna-dados-user' >
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome Completo: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='prinome'
              type="text"
              //name='user' 
              value={primeiroNome}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setPrimeiroNome(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>


            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input" >Email:<span style={{color:'red'}}>*</span> </p>
              <input className='form-control inputlogin' 
              id='email'
              type="text"
              //name='user' 
              value={email}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setEmail(e.target.value.toLowerCase());
                LimparTodos();
              }}
              />
            </div>

            <div className='bloco-input'>
            <p className="title-input"  >Usuário: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='usuario'
              type="text"
             // name='user' 
              value={usuario}
             // onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setUsuario(e.target.value.toLowerCase());
                LimparTodos();
              }}
              />
            </div>
            
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input'>
            <p className="title-input" >Senha:<span style={{color:'red'}}>*</span> </p>
              <input className='form-control inputlogin' 
              id='senha'
              type="password"
              //name='user' 
              value={senha}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setSenha(e.target.value);
                LimpaerroSenhaConfirm();
                LimparTodos();
              }}
              />
            </div>
            <div className='bloco-input'>
            <p className=" title-input"  >Confirma Senha: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputlogin' 
              id='confirma'
              type="password"
             // name='user' 
              value={senhaConfirm}
              onBlur={SenhanaoCofere}
             // onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setSenhaConfirm(e.target.value);
                LimpaerroSenhaConfirm();
                LimparTodos();
              }}
              />
              
               </div>
               {/* <div  className='bloco-input bloco-btn-perm'>
               <button disabled={loadingCreate || grupo=='1'} id='' className='btn btn-permissao-criar '>Permissões</button>
               </div> */}
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p id="grupos" className=" title-input"  >Grupo de Acesso: <span style={{color:'red'}}>*</span></p>

                     <Select 
                     id='grupo-create'
                     className=" select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={grupoCreate}  
                      onChange={(value: any)=>{ 
                        setGrupo(value.value); 
                        LimparTodos();
                        console.log('Select',value)          
                      }} 
                    />
                   </div>
                   <div  className='bloco-input'>
            <p style={{marginTop:2, marginBottom:5}} className="title-input"  >Função: </p>
              <input className='form-coontrol inputlogin' 
              id='funcao'
              type="text"
              //name='user' 
              value={funcao}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setFuncao(e.target.value);
              }}
              />
         
            </div>
            
                   
                    
                    </div> 
                    <div className='coluna-botoes-cad-user'>
                    
                    <button disabled={loadingCreate} type='button' id='' className='btn btn-cadastrar btn-user' onClick={CreateUsuario}>Cadastrar</button>                  
                    </div>
            </div>
            <div className='acesso-personalizado'>
              <h2>Conceder permissões:</h2>
            <div className="table-responsive table-scroll tabela-responsiva">

<div className=' table-wrap'>
<Table responsive className='table-global table  main-table'>
<thead>
<tr className="tituloTab">
<th style={{width: 100}} className="th1 cod-grupo">Codigo</th>
<th className="th1 Nome-completo">Nome</th>
<th style={{textAlign:'center',color:"transparent"}} className="th4 ">..........</th>
<th style={{textAlign:'center',color:"transparent"}} className="th4 ">..........</th>
<th style={{textAlign:'center'}} className="th4 fixed-table">Ações</th>
</tr>
</thead>
<tbody>

{menuPrincipal.length > 0 ? (
              <>
{menuPrincipal.map((pagina_Base)=> (
<tr >
<td style={{textAlign:"center"}} className=''>{pagina_Base.codigo}</td>
<td className='Nome-completo'>{pagina_Base.nome}</td>


{/* <td style={pagina_Base.parceiroNome ==null ||pagina_Base.parceiroNome ==""?{color:'red',textAlign:'center'}:{color:'#000',textAlign:'center'}}>{pagina_Base.parceiroNome?vendedores.parceiroNome:"Não informado"}</td> */}



  <td style={{textAlign:'center'}} className="fixed-table td-fixo">

  <OverlayTrigger
    placement={"top"}
    delay={{ show: 100, hide: 250 }}
    overlay={<Tooltip>Editar</Tooltip>}
  >
    <button
    className='btn btn-table btn-edit'
    style={{marginRight:15,marginLeft:15}}
    onClick={()=>{

      GetPaginaId(pagina_Base.id);
    //  console.log("id ",pagina_Base.id)
    // ShowModalEdit();
      }}>
      <HiOutlinePencilSquare/>
    </button>
    </OverlayTrigger>


    {/* <OverlayTrigger
    placement={"top"}
    delay={{ show: 100, hide: 250 }}
    overlay={<Tooltip>Deletar</Tooltip>}
  >
    <button onClick={()=>{
     DeletePagina(pagina_Base.id);
    }}

    className='btn btn-table btn-delete'>
      <RiDeleteBin5Line/>
    </button>
    </OverlayTrigger> */}
    </td>
</tr>
))}
</>
): (

<div style={{margin:"auto"}} className="alert alert-warning alerta-Vendedor" role="alert">
  Nenhum menu encontrado.
</div>


)}
</tbody>
</Table>
<Paginacao
          total={totalPaginasPerm}
          limit={1}
          paginaAtual={pagina}
          setPagina={setPagina}
        />
</div>
</div>   
                
                    </div>
            </div>
            </>    )}
        </Modal.Body>
      
      </Modal>
      {/* ================Modal Edit ============================================== */}

      <Modal className='modal-edit-user' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Dados do Usuário</h1>
        </Modal.Header>
        <Modal.Body>
        {loadingUpdate ? (
          <div className="d-flex justify-content-center total-loading total-loadingCreate">
          <div className='div-loading'>
          <div className="spinner-border" role="status">
            
          </div>
          <h2 className="sr-only">Carregando...</h2>
          </div>
        </div>
                 
                          ) : (<>
          <div className='conteudo-user'>
            <img src={PhotoUser} alt="" width={150} />
            <h2>{usuario}</h2>
            <h2>{email}</h2>
            
            <button disabled={loadingCreate || grupo=='1'} id='' className='btn btn-permissao '>Permissões</button>
          
          </div>
        <div  className='form-cadastro-user' >
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome Completo: </p>
              <input className='form-control inputlogin' 
              id=''
              type="text"
              //name='user' 
              value={primeiroNome}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setPrimeiroNome(e.target.value);
              }}
              disabled
              />
            </div>
            <div  className='bloco-input'>
            <p className="title-input" >Nome de Usuário: </p>
              <input className='form-control inputlogin' 
              id=''
              type="text"
              //name='user' 
              value={nomeUsuario}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setNomeUsuario(e.target.value);
              }}
              disabled
              />
              
            </div>
            
            </div>


            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input" >Função: </p>
              <input className='form-control inputlogin' 
              id=''
              type="text"
              //name='user' 
              value={funcao}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setFuncao(e.target.value.toLowerCase());
              }}
              disabled
              />
            </div>

            <div className='bloco-input'>
            <p className="title-input"  >Telefone: </p>
              <input className='form-control inputlogin' 
              id=''
              type="text"
             // name='user' 
              value={telefone}
             // onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setTelefone(e.target.value.toLowerCase());
              }}
              disabled
              />
            </div>
            
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input'>
            <p className="title-input" >Status </p>
              
              <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
            value={ativo}
            disabled={grupo=='1'}
                         onChange={(e) => {setAtivo(e.target.value);}}
                        >
                        <option value="1">Ativo</option>
                        <option value="2">Inativo</option>
                    </select>   
            </div>
            <div className='bloco-input'>
            <p className=" title-input"  >Grupo de Acesso: <span style={{color:'red'}}>*</span></p>
            {grupo=="1"?(<>

              {/* <Select 
                     id='grupo-create'
                     className=" select campo-select" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={grupos}
                     isDisabled={grupo=='1'}  
                      onChange={(value: any)=>{ 
                        setGrupo(value.value); 
                        LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> */}
              <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
            value={String(grupo)}
            disabled={grupo=='1'}
                         onChange={(e) => {setGrupo(e.target.value);
                        }}
                        >
                        <option value="">---</option>
                        <option value="1">ADMINISTRATIVO</option>
                        <option value="2">COMERCIAL</option>
                        <option value="3">REPRESENTANTE</option>
                        <option value="4">USUÁRIO</option>
                    </select>  
            </>):(<>
              {/* <Select 
                     id='grupo-create'
                     className=" select campo-select" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum status encontrado"}
                     options={grupoCreate}
                     value={selectGrupo}
                      onChange={(value: any)=>{ 
                        setGrupo(value.value); 
                        LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> */}
               <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
            value={String(grupo)}
            disabled={grupo=='1'}
                         onChange={(e) => {setGrupo(e.target.value);
                        }}
                        >
                        <option value="">---</option>
                        {/* <option value="1">ADMINISTRATIVO</option> */}
                        <option value="2">COMERCIAL</option>
                        <option value="3">REPRESENTANTE</option>
                        <option value="4">USUÁRIO</option>
                    </select> 
            </>)}
              
              
               </div>
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input'>
            <button disabled={loadingUpdate||grupo=='1'}  id='' className='btn btn-cadastrar 'onClick={editUser}>Editar</button>
            </div>
            <div  className='bloco-input'>
            <button disabled={loadingUpdate}  id='' className='btn btn-cancelar 'onClick={handleCloseEdit}>Cancelar</button>
            </div>
           
                    {/* <div  className='bloco-input'>
                    <p className=" title-input"  >Acesso Personalizado: </p>
                    <div className='acesso-personalizado-edit'>
                      
                    {grupo !="1"?(<>
                      <div className='check-grupo'>
                      <input 
                      type="checkbox" name="grupo" 
                      id="grupo" 
                      disabled={grupo=='1'}
                      checked={admin}  
                      onChange={({ target }) => {
                      setAdmin(target.checked);
                      }} 
                      />
                      <p className='text'>Administrativo</p>
                      </div>
                      </>):(<></>)}
                      {grupo !="2"?(<>
                      <div className='check-grupo'>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={grupo=='1'}
                      checked={comercial}  
                      onChange={({ target }) => {
                      setComercial(target.checked);
                      }}  
                      />
                      <p className='text'>Comercial</p>
                      </div>
                      </>):(<></>)} 
                      {grupo !="3"?(<>
                      <div className='check-grupo'>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={grupo=='1'}
                      checked={representante}  
                      onChange={({ target }) => {
                      setRepresentante(target.checked);
                      }}  
                      />
                      <p className='text'>Representante</p>
                      </div>
                      </>):(<></>)} 
                      {grupo !="4"?(<>
                      <div className='check-grupo'>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo" 
                      disabled={grupo=='1'}
                      checked={tipoUsuario}  
                      onChange={({ target }) => {
                      setTipoUsuario(target.checked);
                      }} 
                      />
                      <p className='text'>Usuário</p>
                      </div>
                      </>):(<></>)} 
                    </div>
                    </div> */}
                    </div> 
                    {/* <button disabled={loadingUpdate ||grupo=='1'} type='button' id='btn-mob' className='btn btn-cadastrar' onClick={editUser}>Editar</button>                  
                    <button disabled={loadingUpdate} style={{marginTop: 135}} id='btn-mob' className='btn btn-cancelar 'onClick={handleCloseEdit}>Cancelar</button> */}
            </div>
           </>)}
        </Modal.Body>
         {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>  */}
      </Modal>
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
