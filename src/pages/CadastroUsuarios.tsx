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
import { iDadosUsuario, iDataSelect,iPaginaBase,iPaginas } from '../@types';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TiInputChecked } from 'react-icons/ti';


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
  let [pagina_Base, setPagina_Base] = useState<iPaginaBase[]>([]);

  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  let [pagina_BaseEdite, setPagina_BaseEdite] = useState<iPaginaBase[]>([]);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showMensageCadPermi, setShowMensageCadPermi] = useState(false);
  
  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  let [usuarios, setUsuarios] = useState<iUsuarios[]>([]);
  let [usuariosget, setUsuariosget] = useState<iUsuarios[]>([]);
  let [usuariosCount, setUsuariosCount] = useState<iUsuarios[]>([]);
  let [usuariosFilter, setUsuariosFilter] = useState<iUsuarios[]>([]);
  let [menuIdGet, setMenuIdGet] = useState<iPaginas[]>([]);

  let [permissoesUser, setPermissoesUser] = useState<iMenu[]>([]);

  let [totalPaginas, setTotalPaginas] = useState(0);
  let [totalPaginasPerm, setTotalPaginasPerm] = useState(0);


   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseEditMenu = () => setShowEditMenu(false);

   //=========modal edite permissoes ===========================//
   const handleCloseModalEditePer = () => setShowModalEditePer(false);
   const [showModalEditePer, setShowModalEditePer] = useState(false);
   //==========================================================//
   const handleCloseMensage = () => setShowMensage(false);
   const handleCloseMensageCadPermi = () => setShowMensageCadPermi(false);
   
   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [searchStatus, setSearchStatus] = useState('');
   const [filter, setFilter] = useState(false);
   
   let [codPagina, setCodPagina] = useState(0);
let [nomePagina, setNomePagina] = useState('');
let [urlPagina, setUrlPagina] = useState('');

let [idPaginaExcluir, setIdPaginaExcluir] = useState(0);

   let [codMenu, setCodMenu] = useState(0);
let [nomeMenu, setNomeMenu] = useState('');
let [iconMenu, setIconMenu] = useState('');
let [codSubMenu, setCodSubMenu] = useState(0);
let [nomeSubMenu, setNomeSubMenu] = useState('');
let [iconSubMenu, setIconSubMenu] = useState('');
let [menuGetID, setMenuGetID] = useState<iMenu[]>([]);

let [nomeMenuEdit, setNomeMenuEdit] = useState('');
let [nomeSubMenuEdit, setNomeSubMenuEdit] = useState('');
let [codMenuEdit, setCodMenuEdit] = useState(0);
let [idSubMenuEdit, setIdSubMenuEdit] = useState(0);
let [idMenuEdit, setIdMenuEdit] = useState(0);
let [idMenu, setIdMenu] = useState(1);

let [idMenuSub, setIdMenuSub] = useState(0);

const [idPagina, setIdPagina] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  let [salvar, setSalvar] = useState(false);

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);
   const [qtdePagMenu, setQtdePagMeu] = useState(5);
   let [subMenuPesquisa, setSubMenuPesquisa] = useState<iDataSelect[]>([]);
  //  let [eMenu, setEmenu] = useState<iPermissoes[]>([]);
  //  let [esubMenu, setEsubMenu] = useState<iPermissoes[]>([]);
   

   const [url, setUrl] = useState("");
   const [icon, setIcon] = useState("");
   let [idMenuExistente, setIdMenuExistente] = useState(0);

   let [codMenuPrincipal, setCodMenuPrincipal] = useState(0);

   let [idMenuPrincipal, setIdMenuPrincipal] = useState(0);
   let [idSubMenu, setIdSubMenu] = useState(0);
  
   let [userIdPermit, setUserIdPermit] = useState(0);
   let [userGrupoId, setUserGrupoId] = useState(0);
   
   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaStatus, setPesquisaStatus] = useState(false);
   let [permissoesOk, setPermissoesOk] = useState(false);

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
  async function ContinuarCreate(){
    // console.log('codigo menu',codMenu)
       await api
           .get(`/api/Menu/Get-Codigo?pagina=${pagina}&totalpagina=999&Codigo=${codMenu}`)
           .then((response) => {
            console.log('menu',response.data)
           
             setIdMenuExistente(response.data.data[0].id)
             idMenuExistente=response.data.data[0].id
             console.log('menu existente',idMenuExistente);
          
           })
           .catch((error) => {
            console.log("Ocorreu um erro");
              // setCriar(true);
              // criar=true;
   
           });
   }
  // const handleShow = () => setShow(true);
  useEffect(() => { 
    logado()
   
   // GetUsuariosAcount();
  },[]);
function PermissoesOk(){
  setPermissoesOk(true);
  permissoesOk=true;
}

  async function GetMontarMenu() {
    setFilter(false);

    await api

      .get(`/api/Menu?pagina=${pagina}&totalpagina=${qtdePagMenu}`)
      .then((response) => {

        setMenuPrincipal(response.data.data);
        menuPrincipal=response.data.data;
       console.log("menu geral",menuPrincipal)

    
        setTotalPaginasPerm(Math.ceil(response.data.total / qtdePagMenu));

      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
   //=========== get usuarios por ID ==================================//
   async function GetPaginaId(id:any) {
    setIdPagina(0);
    setCodigo('');
    setNome('');
    setUrl('');
    setIcon('');

    setEdit(true);
    setShowEditMenu(true);
    setLoadingUpdate(true);
    await api
      .get(`/api/Menu/${id}`)
      .then((response) => {
        setMenuGetID(response.data.subMenu);
        setCodMenuPrincipal(response.data.codigo);
        codMenuPrincipal=response.data.codigo;
        menuGetID=response.data.subMenu;
        console.log("submenu",menuGetID)
        setMenuIdGet(response.data.pagina);
         menuIdGet=response.data.pagina;
          setIdPagina(response.data.id);
           setNome(response.data.nome);
           setNomeMenuEdit(response.data.nome);
           nomeMenuEdit=response.data.nome;
            setNomeSubMenuEdit(response.data.subMenu[0]?.nome);
            nomeSubMenuEdit=response.data.subMenu[0]?.nome;
            setCodMenuEdit(response.data.codigo);
            codMenuEdit=response.data.codigo;
            setIdSubMenuEdit(response.data.subMenu[0]?.id);
            idSubMenuEdit=response.data.subMenu[0]?.id;
            setIdMenuEdit(response.data.id);
            idMenuEdit=response.data.id;
           setCodigo(String(response.data.codigo));
           setUrl(response.data.url);
           setIcon(response.data.icon);
           GetSubMenuEdit()
        console.log('menu Id',response.data);
        console.log("menu get id",menuIdGet);
        setLoadingUpdate(false);
        // GetPaginasEdite();
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingUpdate(false);
      });
  }
  //============================================================
  async function GetSubMenuEdit() {
    setFilter(true);
    await api
      .get(`/api/Pagina_Base?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
      //  console.log('sub',response.data.data)
        if (response.data.data.length > 0) {
           let pagina = response.data.data.filter((p:any)=>p.url ==""&& p.codigo!=codMenuEdit)
          let options:Array<iDataSelect>=new Array<iDataSelect>();
          pagina.map((pagina:any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(pagina.codigo);
            // rowGrupo.label = String(pagina.codigo)+ " - " + pagina.nome ;
            rowGrupo.label = pagina.nome ;

             options.push(rowGrupo);
            setSubMenuPesquisa(options);
            subMenuPesquisa=options
        //   console.log("Menu",subMenuPesquisa)
          })
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
  //===========Editar Menu =====================================//
async function EditeMenu(){
    setLoadingUpdate(true)
  await api.put(`/api/Menu/${idMenuExistente}`, {
    id: idMenuExistente,
   codigo:codMenu,
   ordem:0,
   nome: nomeMenu,
   icon:iconMenu
  })
    .then(response => {
      console.log("Editado com sucesso");
    //  localStorage.setItem('@Portal/usuario/atualiza-menu','1')
    })
    .catch((error) => {

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
  
  // useEffect(() => {
  //   GetPermissoesPorUser1();
    
  // });
  useEffect(() => {
    window.scrollTo(0, 0);
    GetMontarMenu();
    GetPaginasEdite();
    GetSubMenu();
    GetPaginas();
    if(!filter){
      GetUsuarios();
    }else{
      GetUsuariosFilter();
    }
    
  },[pagina]);


  async function GetPaginasEdite() {
    setFilter(true);
    await api
      .get(`/api/Pagina_Base?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
    //    console.log('sub',response.data.data)
        if (response.data.data.length > 0) {
           let pagina = response.data.data.filter
           ((p:any)=>p.url !=="" && 
           p.codigo !== menuIdGet[0]?.codigo&&
           p.codigo !== menuIdGet[1]?.codigo&&
           p.codigo !== menuIdGet[2]?.codigo&&
           p.codigo !== menuIdGet[3]?.codigo&&
           p.codigo !== menuIdGet[4]?.codigo&&
           p.codigo !== menuIdGet[5]?.codigo&&
           p.codigo !== menuIdGet[6]?.codigo&&
           p.codigo !== menuIdGet[7]?.codigo&&
           p.codigo !== menuIdGet[8]?.codigo&&
           p.codigo !== menuIdGet[9]?.codigo&&
           p.codigo !== menuIdGet[10]?.codigo&&
           p.codigo !== menuIdGet[11]?.codigo&&
           p.codigo !== menuIdGet[12]?.codigo&&
           p.codigo !== menuIdGet[13]?.codigo&&
           p.codigo !== menuIdGet[14]?.codigo&&
           p.codigo !== menuIdGet[15]?.codigo&&
           p.codigo !== menuIdGet[16]?.codigo&&
           p.codigo !== menuIdGet[17]?.codigo&&
           p.codigo !== menuIdGet[18]?.codigo&&
           p.codigo !== menuIdGet[19]?.codigo&&
           p.codigo !== menuIdGet[20]?.codigo&&
           p.codigo !== menuIdGet[21]?.codigo&&
           p.codigo !== menuIdGet[22]?.codigo&&
           p.codigo !== menuIdGet[23]?.codigo&&
           p.codigo !== menuIdGet[24]?.codigo&&
           p.codigo !== menuIdGet[25]?.codigo&&
           p.codigo !== menuIdGet[26]?.codigo&&
           p.codigo !== menuIdGet[27]?.codigo&&
           p.codigo !== menuIdGet[28]?.codigo&&
           p.codigo !== menuIdGet[29]?.codigo&&
           p.codigo !== menuIdGet[30]?.codigo&&
           p.codigo !== menuIdGet[31]?.codigo&&
           p.codigo !== menuIdGet[32]?.codigo&&
           p.codigo !== menuIdGet[33]?.codigo&&
           p.codigo !== menuIdGet[34]?.codigo&&
           p.codigo !== menuIdGet[35]?.codigo&&
           p.codigo !== menuIdGet[36]?.codigo&&
           p.codigo !== menuIdGet[37]?.codigo&&
           p.codigo !== menuIdGet[38]?.codigo&&
           p.codigo !== menuIdGet[39]?.codigo&&
           p.codigo !== menuIdGet[40]?.codigo
           )

            setPagina_BaseEdite(pagina);
            pagina_BaseEdite=pagina
          // console.log("pagina",pagina_Base)
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }

  async function AdicionarPaginaEdite(){
   
    setLoadingUpdate(true)
  await api.put(`/api/Menu/${idMenuEdit}`, {
    // id: idMenuEdit,
    // codigo:codMenuEdit,
    // ordem:0,
    // nome: nomeMenuEdit,
    // icon:iconMenu,
    //     pagina: [
    //       {
    //         codigo: codPagina,
    //         nome: nomePagina,
    //         url: urlPagina,
    //         icon:iconPagina,
    //         menuId: idMenuEdit
    //       }
    //     ]
  })
    .then(response => {
      console.log("Pagina criada com sucesso");
      localStorage.setItem('@Portal/usuario/atualiza-menu','1')
      GetPaginaId(idMenuEdit);
      setLoadingUpdate(false);
    })
    .catch((error) => {
      setLoadingUpdate(false)
    });
  }
function AdicionarRemoverPag(){
  if(document.getElementById("grupo")?.toggleAttribute(':checked')){
    console.log("narcado");
} else {
  console.log("desmarcado");
}
  // var chkPag = document.getElementById("addPag");


  //   if (chkPag.che) {
  //       console.log("escolheu 'bike'");
  //   } else {
  //       console.log("não escolheu 'bike'");
  //   }

}
  async function GetSubMenu() {
    setFilter(true);
    await api
      .get(`/api/Pagina_Base?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
      //  console.log('sub',response.data.data)
        if (response.data.data.length > 0) {
           let pagina = response.data.data.filter((p:any)=>p.url ==""&& p.codigo!=codMenu)
          let options:Array<iDataSelect>=new Array<iDataSelect>();
          pagina.map((pagina:any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(pagina.codigo);
            // rowGrupo.label = String(pagina.codigo)+ " - " + pagina.nome ;
            rowGrupo.label = pagina.nome ;

             options.push(rowGrupo);
            setSubMenuPesquisa(options);
            subMenuPesquisa=options
        //   console.log("Menu",subMenuPesquisa)
          })
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
   //====EXCLUIR PAGINA POR ID ============================================================
   async function DeletePaginaId(id: any,IdMenu: any){
    setLoadingUpdate(true)
  await api.delete(`/api/Paginas/${id}`)
    .then(response => {
   GetPaginaId(IdMenu);
 //  localStorage.setItem('@Portal/usuario/atualiza-menu','1')
    })
    .catch((error) => {
    });
  }

  //========adicionar páginas na edição com submenu ================================//

  async function AdicionarPaginaEditeSubMenu(subId: any){
    setLoadingUpdate(true)
  await api.put(`/api/Menu/${idMenuEdit}`, {
    id: idMenuEdit,
    codigo:codMenuEdit,
    ordem:0,
    nome: nomeMenuEdit,
    icon:iconMenu,
        pagina: [
          {
            codigo: codPagina,
            nome: nomePagina,
            url: urlPagina,
            icon: "",
            menuId: idMenuEdit,
            subMenuId: subId
          }
        ]
  })
    .then(response => {
      console.log("Pagina criada com sucesso");
     // localStorage.setItem('@Portal/usuario/atualiza-menu','1')
      GetPaginaId(idMenuEdit);
      setLoadingUpdate(false);
    })
    .catch((error) => {
      setLoadingUpdate(false)
    });
  }

  async function GetPaginas() {
    setFilter(true);
    await api
      .get(`/api/Pagina_Base?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
    //    console.log('sub',response.data.data)
        if (response.data.data.length > 0) {
           let pagina = response.data.data.filter((p:any)=>p.url !=="")

            setPagina_Base(pagina);
            pagina_Base=pagina
          // console.log("pagina",pagina_Base)
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
  function handleShowMensage(){
   
    setShowMensage(true);
    setTimeout(function() {
            
   //   setShowMensage(false);
      
     }, 1200);
  }
  function handleShowMensageCadPermi(){
   
    setShowMensageCadPermi(true);
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
    setPermissoesOk(false);
    permissoesOk=false;
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
       
          setUsuariosget(response.data);
          usuariosget=response.data;
          console.log("usuario Id", usuariosget);
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
    
         
         

         
         // permissoesUser=response.data.data[0].userPermissoes;
         // console.log("permissoes",permissoesUser)
         // GetMontarMenu();
      //     setPermissoesUser(response.data.userPermissoes);
      //     permissoesUser=response.data.userPermissoes;
      //  console.log("permissões do usuário",permissoesUser);


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
  //=============GetPermissoes do Usuario ======================//
  async function GetPermissoes() {
    setFilter(true);
    await api
      .get(`/api/User_Permissoes/filter-UserId?pagina=1&totalpagina=999&userId=${search}`)
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
 
  //==============Criar Permissões==============================//
  //================menu=============================//
      async function AdicionarPermissoesMenu(codSub:any,codPag:any){

        setLoadingCreate(true)
    await api.post("/api/MenuPermissao",{
      userId: userIdPermit,
      codigo: codMenuPrincipal,
      nome:nomeMenuEdit
         })
         
          .then(response => {
           
            AdicionarPermissoesSubMenu(codSub,codPag)
            console.log(response.data)
            idMenuPrincipal=response.data.menu.id;
            setIdMenuPrincipal(response.data.menu.id)
            console.log("idMenu",idMenuPrincipal)
          //  GetPermissoesPorUser1();
          })
          .catch((error) => {
          
            AdicionarPermissoesSubMenu(codSub,codPag)
          });
        }
        //=================get remover pagina ao desmarcar=================//
        async function GetRemoverPorCodigo(codigo:any){
          await api.get(`/api/PaginaPermissao/codigo?pagina=1&totalpagina=10&codigo=${codigo}&idMenu=${idMenuSub}`)
          .then(response => {
          console.log('pagina por código',response.data);
          setIdPaginaExcluir(response.data.id);
          idPaginaExcluir=response.data.id;
          ExcluirPagina();
          })
          .catch((error) => {
          
           
          });
        }
        async function ExcluirPagina(){
          await api.delete(`/api/PaginaPermissao/${idPaginaExcluir}`)
          .then(response => {
          console.log('pagina excluída com sucesso');
         
          })
          .catch((error) => {
          
           
          });
        }
        
        //=============get permissoes por usuario===============//
        
        async function GetPermissoesPorUser(){
          await api.get(`/api/MenuPermissao/filter-UserId?pagina=1&totalpagina=999&userId=${userIdPermit}`)
          .then(response => {
          console.log('permissões salvar',response.data)
          
          })
          .catch((error) => {
          
           
          });
        }
        //================submenu=============================//
      async function AdicionarPermissoesSubMenu(codSub:any,codPag:any){
        await api.get(`/api/SubMenu/${codSub}`)
              .then(response => {
                setCodSubMenu(response.data.codigo);
                codSubMenu=response.data.codigo;
                setNomeMenu=response.data.nome
                nomeSubMenu=response.data.nome;
                PaginaPermissao(codPag);
              
              })
              .catch((error) => {
              
                PaginaPermissao(codPag);
              });
            }
      async function  PaginaPermissao(codPag:any){
        setLoadingCreate(true)
        await api.post("/api/SubMenuPermissao",{
          codigo: codSubMenu,
          nome:nomeSubMenu,
          menuPermissaoId:idMenuPrincipal
             })
              .then(response => {
                console.log(response.data)
                idSubMenu=response.data.menu.id;
                setIdSubMenu(response.data.menu.id);
                setIdMenuSub(response.data.menu.menuPermissaoId);
                idMenuSub=response.data.menu.menuPermissaoId;
                AdicionarPermissoesPagina(codPag)
               // GetPermissoesPorUser1();
              })
              .catch((error) => {
                AdicionarPermissoesPagina(codPag)
              });
            }
            //================submenu=============================//
      async function AdicionarPermissoesPagina(codPag:any){

        setLoadingCreate(true)
        await api.post("/api/PaginaPermissao",{
          codigo: codPag,
          nome:nomePagina,
          menuPermissaoId:idMenuSub,
          subMenuPermissaoId:idSubMenu
             })
              .then(response => {
                setLoadingCreate(false)
                GetPermissoesPorUser()
              //  GetPermissoesPorUser1();
              })
              .catch((error) => {
                setLoadingCreate(false)
              });
            }
            //===================criar permissão sem submenu=================//
            async function AdicionarPermi(codPag:any,nomePagina:any){

              setLoadingCreate(true)
              await api.post("/api/MenuPermissao",{
                userId: userIdPermit,
                codigo: codMenuPrincipal,
                nome:nomeMenuEdit
                   })
               
                .then(response => {
                  idMenuPrincipal=response.data.menu.id;
                  setIdMenuPrincipal(response.data.menu.id)
                  console.log("idMenu",idMenuPrincipal)
                  AdicionarPermiPag(codPag,nomePagina)
                 // GetPermissoesPorUser1();
                })
                .catch((error) => {
                
                  AdicionarPermiPag(codPag,nomePagina)
                });
              }


            //============================
            async function AdicionarPermiPag(codPag:any,nomePagina:any){

              setLoadingCreate(true)
              await api.post("/api/PaginaPermissao",{
                codigo: codPag,
                nome:nomePagina,
                menuPermissaoId:idMenuPrincipal,
                   })
                    .then(response => {
                    GetPermissoesPorUser()
                      setLoadingCreate(false)
                    //  GetPermissoesPorUser1();
                    })
                    .catch((error) => {
                      setLoadingCreate(false)
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
          console.log('usuario cadastrado',response.data)
          setUserIdPermit(response.data.data);
          userIdPermit=response.data.data;
          setUserGrupoId(response.data.grupo);
          userGrupoId=response.data.grupo;
          console.log('id do usuario',userIdPermit)
         // GetUsuariosAcount();
          GetUsuarios();
// handleClose ();
          handleShowMensageCadPermi();
          setAlertErroMensage(true);
          setMsgErro("Usuário criado com sucesso. Deseja concedor Permissões de acesso agora?");
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

      <Modal className={permissoesOk?'modal-cadastro-user':'modal-cadastro-user-inicial' } show={show} onHide={handleClose}>
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
        <div  className={permissoesOk?'coluna-dados-user':'coluna-dados-user-inicial'} >
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome Completo: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputlogin' 
              id='prinome'
              type="text"
              disabled={permissoesOk}
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
              disabled={permissoesOk}
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
              <input className='form-control inputlogin' 
              id='usuario'
              type="text"
              disabled={permissoesOk}
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
              disabled={permissoesOk}
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
              disabled={permissoesOk}
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

           {permissoesOk?(<>
            <select className="form-select select campo-select" 
            id='grupo-create'
            aria-label="" 
           value={String(userGrupoId)}
            disabled={permissoesOk}
                         onChange={(e) => {setGrupo(e.target.value);
                        }}
                        >
                        <option value="">---</option>
                        {/* <option value="1">ADMINISTRATIVO</option> */}
                        <option value="2">COMERCIAL</option>
                        <option value="3">REPRESENTANTE</option>
                        <option value="4">USUÁRIO</option>
                    </select> 
           </>):(<>
            <select className="form-select select campo-select" 
            id='grupo-create'
            aria-label="" 
            disabled={permissoesOk}
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
            


                     {/* <Select 
                     id='grupo-create'
                     className=" select-comp" 
                     placeholder="Digite ou selecione"
                     isDisabled={permissoesOk}
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={grupoCreate}  
                      onChange={(value: any)=>{ 
                        setGrupo(value.value); 
                        LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> */}
                   </div>
                   <div  className='bloco-input'>
            <p  className="title-input"  >Função: </p>
              <input className='form-control inputlogin' 
              id='funcao'
              type="text"
              disabled={permissoesOk}
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
                    {permissoesOk?(<>
                      <button disabled={loadingCreate} type='button' id='' className='btn btn-cadastrar btn-user' onClick={handleClose}>Finalizar</button>                  
                    </>):(<>
                      <button disabled={loadingCreate} type='button' id='' className='btn btn-cadastrar btn-user' onClick={CreateUsuario}>Cadastrar</button>                  
                    </>)}

                    </div>
            </div>
{permissoesOk?(<>
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
    overlay={<Tooltip>Adicionar</Tooltip>}
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
    {/* {permissoesUser?.map((p)=>(<>
      {p.codigo==pagina_Base.codigo?(<>
      <TiInputChecked style={{color:"#008000",fontSize:20}}/>
    </>):(<></>)}
    </>))} */}
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
</>):(<></>)}
      


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
            <h2 style={{marginTop:20}}>{usuario}</h2>
            <h2>{email}</h2>
            
            
            <button disabled={loadingCreate || grupo=='1'} id='' className='btn btn-permissao' onClick={()=>{setShowModalEditePer(true)}}>Permissões</button>
          
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
            aria-label="" 
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
           
  
                    </div> 
                   
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
       {/* ================Modal Confirmação ============================================== */}

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
       {/* ================Modal conceder permissoes e Confirmação ============================================== */}

       <Modal className='modal-confirm' show={showMensageCadPermi} onHide={handleCloseMensageCadPermi}>
        <Modal.Header  closeButton>
          <h1 className='titulo'>Status da solicitação</h1>
        </Modal.Header>
        <Modal.Body>
        {alertErroMensage && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErroMensage} />
					</div>
					)}
          <button style={{width:130}} className='btn btn-primary' onClick={()=>{handleCloseMensageCadPermi();handleClose();}}>Finalizar</button>
           <button style={{width:130, marginLeft:30}} className='btn btn-primary' onClick={()=>{PermissoesOk();handleCloseMensageCadPermi()}}>Conceder</button>
        </Modal.Body>
      
      </Modal>


        {/* ================Modal add permissoes ============================================== */}

        <Modal className='modal-edit-vendedor modal-menu' show={showEditMenu} onHide={handleCloseEditMenu}>
        <Modal.Header  closeButton>
          <h1>Lista de permissões</h1>
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

<div  className='form-cadastro-user' >

<div className='coluna-dupla coluna-dupla-menu'>
    <div  className='bloco-input bloco-menu-cad'>
    <p className="title-input"  >Menu Principal: </p>
    <h1>{nomeMenuEdit}</h1>
   
    </div>

    <div  className='bloco-input bloco-menu-cad'>

    
    </div>

    </div>
  
    
                    {menuGetID.length > 0 ? (<>
                      
                      
                      {menuGetID?.map((SubMenu)=> (<>
                        <div  className='bloco-paginas'>
       
         <div style={{width:"100%",marginBottom:20}}>
         <div className='check-grupo grupo-de-paginas'>
         <h2 style={{marginRight:8}}>{SubMenu?.nome} </h2>
              
               </div>
                    </div>
          
          {SubMenu?.pagina.map((pagina_Base)=>(<>
            <div className='check-grupo grupo-de-paginas'>
            <input
                      type="checkbox"
                      name="grupo"
                      style={{marginRight:10}}
                      id={`grupo${pagina_Base.codigo}`}
                       onChange={({ target }) => {
                        setNomePagina(pagina_Base.nome);
                        nomePagina= pagina_Base.nome;
                      //  AdicionarRemoverPag()
                        if(document.getElementById(`grupo${pagina_Base.codigo}`)?.toggleAttribute(':checked')){
                          AdicionarPermissoesMenu(pagina_Base.subMenuId,pagina_Base.codigo);
                      } else {
                        GetRemoverPorCodigo(pagina_Base.codigo)
                      }
                      
                    setSalvar(true)
                    salvar=true
                       }}
                      />
                
                   <p className='text'>{pagina_Base.nome}</p>
                   </div>
                   </>))}
                   
                   </div>

                   
                   </>   ))}
                
              
                    
                    </>):(<>
                      <div  className='bloco-paginas'>
                      
                      
                      {menuIdGet?.map((pagina_Base)=> (<>
         <div className='check-grupo grupo-de-paginas'>
         <input
                      type="checkbox"
                      name="grupo"
                      style={{marginRight:10}}
                      id={`grupo2${pagina_Base.codigo}`}
                       onChange={({ target }) => {
                        if(document.getElementById(`grupo2${pagina_Base.codigo}`)?.toggleAttribute(':checked')){
                          AdicionarPermi(pagina_Base.codigo,pagina_Base.nome);
                      } else {
                        console.log("desmarcado");
                      }
                     
                       setNomePagina(pagina_Base.nome);
                       nomePagina=pagina_Base.nome;
                    setSalvar(true)
                    salvar=true
                       }}
                      />
                
                   <p className='text'>{pagina_Base.nome}</p>

                   </div>
                  
                   </>   ))}
                   </div>
                  
                    </>)}
   
 
    <div  className='bloco-botoes-finalizar'>
    <button disabled={loadingUpdate}  id='' className='btn btn-cadastrar btn-edit-vend'onClick={handleCloseEditMenu}>Finalizar</button>

    </div>

    </div>
           </>)}
        </Modal.Body>

      </Modal>

       {/* ================Modal add permissoes edite ============================================== */}

       <Modal className='modal-edit-vendedor modal-menu' show={showModalEditePer} onHide={handleCloseModalEditePer}>
        <Modal.Header  closeButton>
          <h1>Lista de permissões</h1>
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

<div  className='form-cadastro-user' >

<div className='coluna-dupla coluna-dupla-menu'>
    <div  className='bloco-input bloco-menu-cad'>
    <p className="title-input"  >Menu Principal: </p>
    <h1>{nomeMenuEdit}</h1>
   
    </div>

    <div  className='bloco-input bloco-menu-cad'>

    
    </div>

    </div>
  
    
                    {/* {permissoesUser.length > 0 ? (<>
                      
                      
                      {permissoesUser?.map((menu)=>(<>
                        <div  className='bloco-paginas'>
                        <h2 style={{marginRight:8}}> </h2>
                   </div>
                   </>   ))}
                
              
                    
                    </>):(<>
                      <div  className='bloco-paginas'>
                      
                      
                      {menuIdGet?.map((pagina_Base)=> (<>
         <div className='check-grupo grupo-de-paginas'>
         <input
                      type="checkbox"
                      name="grupo"
                      id="grupo"
                       onChange={({ target }) => {
                        AdicionarPermi(pagina_Base.codigo);
                       
                    setSalvar(true)
                    salvar=true
                       }}
                      />
                
                   <p className='text'>{pagina_Base.nome}</p>

                   </div>
                  
                   </>   ))}
                   </div>
                  
                    </>)} */}
   
 
    <div  className='bloco-botoes-finalizar'>
    <button disabled={loadingUpdate}  id='' className='btn btn-cadastrar btn-edit-vend'onClick={handleCloseModalEditePer}>Finalizar</button>

    </div>

    </div>
           </>)}
        </Modal.Body>

      </Modal>
        {/* ================Modal Editar Permissões ============================================== */}

        <Modal className='modal-edit-vendedor' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Editar Permissões</h1>
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

        <div  className='form-cadastro-user' >

        <div className='coluna-dupla coluna-dupla-menu'>
            <div  className='bloco-input bloco-menu-cad'>
            <p className="title-input"  >Menu Principal: </p>
            <h1>{nomeMenuEdit}</h1>
           
            </div>

            <div  className='bloco-input bloco-menu-cad'>

            
            </div>

            </div>

                            {menuGetID.length > 0 ? (<>
                              
                              
                              {menuGetID?.map((SubMenu)=> (<>
                                <div  className='bloco-paginas'>
               
                 <div style={{width:"100%",marginBottom:20}}>
               
                 <h2>{SubMenu?.nome} </h2>
                       
                            </div>
                  
                  {SubMenu?.pagina.map((pagina_Base)=>(<>
                    <div className='check-grupo grupo-de-paginas'>
                  <button  name="grupo"
                           id="grupo"
                           className='btn-chek-excluir' onClick={()=>{
                            DeletePaginaId(pagina_Base.id, pagina_Base.menuId)                           
                           }}>x</button>
                        
                           <p className='text'>{pagina_Base.nome}</p>
                           </div>
                           </>))}
                           
                           </div>

                           <div  className='bloco-paginas'>
                            <div style={{width:"100%",marginBottom:20}}>
                            <h2>Adicionar Novos</h2>
                            </div>
                          
                            {pagina_BaseEdite.map((pagina_Base)=> (
            <div className='check-grupo grupo-de-paginas'>
                      <input
                      type="checkbox"
                      name="grupo"
                      id="grupo"
                      //checked={}
                       onChange={({ target }) => {
                        setCodPagina(pagina_Base.codigo);
                        codPagina=pagina_Base.codigo;
                        setNomePagina(pagina_Base.nome);
                        nomePagina=pagina_Base.nome;
                        setUrlPagina(pagina_Base.url);
                        urlPagina=pagina_Base.url;
                        // setIconPagina(pagina_Base?.icon);
                        // iconPagina=pagina_Base?.icon;
                        console.log('submenu',SubMenu.id);
                        AdicionarPaginaEditeSubMenu(SubMenu.id);
                        // AdicionarPaginaEdite();
                    //   setComercial(target.checked);
                    setSalvar(true)
                    salvar=true
                       }}
                      />
                      <p className='text'>{pagina_Base.nome}</p>

                      </div>
             ))}
                            </div>
                           </>   ))}
                        
                      
                            
                            </>):(<>
                              <div  className='bloco-paginas'>
                              <div style={{width:"100%",marginBottom:20}}>
                              <h2>Excluir existentes</h2>
                            </div>
                              
                              {menuIdGet?.map((pagina_Base)=> (<>
                 <div className='check-grupo grupo-de-paginas'>
                  <button  name="grupo"
                           id="grupo"
                           className='btn-chek-excluir' onClick={()=>{
                            DeletePaginaId(pagina_Base.id, pagina_Base.menuId)                           
                           }}>x</button>
                        
                           <p className='text'>{pagina_Base.nome}</p>

                           </div>
                          
                           </>   ))}
                           </div>
                           <div  className='bloco-paginas'>
                            <div style={{width:"100%",marginBottom:20}}>
                            <h2>Adicionar Novos</h2>
                            </div>
                          
                            {pagina_BaseEdite.map((pagina_Base)=> (
            <div className='check-grupo grupo-de-paginas'>
                      <input
                      type="checkbox"
                      name="grupo"
                      id="grupo"
                      //checked={}
                       onChange={({ target }) => {
                        setCodPagina(pagina_Base.codigo);
                        codPagina=pagina_Base.codigo;
                        setNomePagina(pagina_Base.nome);
                        nomePagina=pagina_Base.nome;
                        setUrlPagina(pagina_Base.url);
                        urlPagina=pagina_Base.url;
                        // setIconPagina(pagina_Base?.icon);
                        // iconPagina=pagina_Base?.icon;
                        AdicionarPaginaEdite();
                    //   setComercial(target.checked);
                    setSalvar(true)
                    salvar=true
                       }}
                      />
                      <p className='text'>{pagina_Base.nome}</p>

                      </div>
             ))}
                            </div>
                            </>)}
           
                         
                         
                           
                          
                 {/* </div> */}
               

            <div  className='bloco-botoes-finalizar'>
            <button disabled={loadingUpdate}  id='' className='btn btn-cadastrar btn-edit-vend'onClick={handleCloseEdit}>Finalizar</button>
        
            </div>

            </div>
           </>)}
          
        </Modal.Body>

      </Modal>

      </div>
    
      
      <Footer/>
    </>
    
  );
}
