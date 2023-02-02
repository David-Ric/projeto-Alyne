import React, { useEffect, useState } from 'react';
import '../../styles/pages-styles/CadastroVendedores.scss';
import '../../styles/global.scss';
import Navbar from '../../components/Navbar';
import LogoOle from '../assets/ole-logo.png';
import PhotoUser from '../../assets/avatar1.png';
import Messeger from '../assets/messege.png';
import ChampGif from '../assets/playy.gif';
import Footer from '../../components/Footer';
import SubMenu from '../../components/SubMenu';
import { RedirectFunction } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-dark.png';
import api from '../../services/api';
import Alert from "../../components/Alert";
import SideNavBar from '../../components/Navbar/SideNavBar';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TfiNewWindow } from "react-icons/tfi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import Table from 'react-bootstrap/Table';
import { iPaginas, iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from "../../components/Paginacao";
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { iVendedores, iDadosUsuario, iPaginaBase, iDataSelect, iMenu, iSubMenu } from '../../@types';
import { BiSearchAlt } from 'react-icons/bi';
import Select from 'react-select';
import { create } from 'domain';



export default function MontarMenu() {
  const history = useNavigate();


  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);


  const [edit, setEdit] = useState(false);
  let [menuPrincipal, setMenuPrincipal] = useState<iMenu[]>([]);
  let [menuIdGet, setMenuIdGet] = useState<iPaginas[]>([]);
  let [menuPorcod, setMenuPorcod] = useState<iMenu[]>([]);
  let [pagina_Base, setPagina_Base] = useState<iPaginaBase[]>([]);
  let [pagina_BaseEdite, setPagina_BaseEdite] = useState<iPaginaBase[]>([]);

  const [idPagina, setIdPagina] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  let [menuPesquisa, setMenuPesquisa] = useState<iDataSelect[]>([]);
  let [subMenuPesquisa, setSubMenuPesquisa] = useState<iDataSelect[]>([]);
  let [paginaPesquisa, setPaginaPesquisa] = useState<iDataSelect[]>([]);

  let [subMenu, setSubMenu] = useState(false);
  let [salvar, setSalvar] = useState(false);

  let [criar, setCriar] = useState(false);


  let [totalPaginas, setTotalPaginas] = useState(0);

   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [filter, setFilter] = useState(false);
   let [editarMenu, setEditarMenu] = useState(false);


   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);

   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaStatus, setPesquisaStatus] = useState(false);
   const [pesquisaCod, setPesquisaCod] = useState(false);

//===============================================================//
let [codMenu, setCodMenu] = useState(0);
let [nomeMenu, setNomeMenu] = useState('');
let [iconMenu, setIconMenu] = useState('');
let [codSubMenu, setCodSubMenu] = useState(0);
let [nomeSubMenu, setNomeSubMenu] = useState('');
let [iconSubMenu, setIconSubMenu] = useState('');

let [nomeMenuEdit, setNomeMenuEdit] = useState('');
let [nomeSubMenuEdit, setNomeSubMenuEdit] = useState('');
let [codMenuEdit, setCodMenuEdit] = useState(0);
let [idSubMenuEdit, setIdSubMenuEdit] = useState(0);
let [idMenuEdit, setIdMenuEdit] = useState(0);
let [idMenu, setIdMenu] = useState(1);

let [codPagina, setCodPagina] = useState(0);
let [nomePagina, setNomePagina] = useState('');
let [urlPagina, setUrlPagina] = useState('');



//=========menu existente =======================================//
let [idMenuExistente, setIdMenuExistente] = useState(0);
let [subMenuMenu, setSubMenuMenu] = useState(0);
let [idSubMenuExiste, setIdSubMenuExiste] = useState(0);
let [subMenuExiste, setSubMenuExiste] = useState(false);
//===============================================================//

   const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  // const handleShow = () => setShow(true);
  useEffect(() => {
    logado()
   // GetUsuariosAcount();
  },[]);

  function logado(){


    // if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupo=="2" && usuariolog.admin !=true){
    //   history('/comercial-home');
    // }
    // if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupo=="3" && usuariolog.admin !=true){
    //   history('/representante-home');
    // }
    // if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupo=="4" && usuariolog.admin !=true){
    //   history('/inicial-home');
    // }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    GetMenu();
    GetPaginas();
    if(!filter){
        GetMontarMenu();
      }else{
       // GetporNome();
      }

  },[pagina]);
  function handleShowMensage(){

    setShowMensage(true);
    setTimeout(function() {

   //   setShowMensage(false);

     }, 1200);
  }
  async function GetMenu() {
    setFilter(true);
    await api
      .get(`/api/Pagina_Base?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
        if (response.data.data.length > 0) {
           let pagina = response.data.data.filter((p:any)=>p.url ==""&& p.codigo !==codMenu)
          let options:Array<iDataSelect>=new Array<iDataSelect>();
          pagina.map((pagina:any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(pagina.codigo);
            // rowGrupo.label = String(pagina.codigo)+ " - " + pagina.nome ;
            rowGrupo.label = pagina.nome ;

             options.push(rowGrupo);
            setMenuPesquisa(options);
            menuPesquisa=options
        //   console.log("Menu",menuPesquisa)

          })
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
  //===== get pagina por codigo e por menuid =================================
  async function GetPaginaMenuExistente(codPagina: any) {
   
    await api
      .get(`/api/Paginas/codigo?pagina=1&totalpagina=999&codigo=${codPagina}&idMenu=${idMenuExistente}`)
      .then((response) => {
        console.log('menu',response.data)
        if (response.data.length > 0) {
         let idPagina = response.data[0].id;
         console.log("pagina existe")
         console.log("codigo",codPagina)
         console.log("idMenu",idMenuExistente)
         console.log('id pagina', idPagina)
             DeletePaginaCodId(idPagina);
          }else{
            console.log("pagina não existe")
            console.log("codigo",codPagina)
            console.log("idMenu",idMenuExistente)
            CriarPaginaSubmenu();
          }
        
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }
  //=============deletar página por id ======================================
  async function DeletePaginaCodId(idPagina: any) {
   console.log("id pagina delete",idPagina)
     await api
       .delete(`/api/Paginas/${idPagina}`)
       .then((response) => {
     
         
          console.log("item deletado")
 
        
       })
       .catch((error) => {
         console.log("Ocorreu um erro");
       });

  }

  //==========================================================================

  function escolherMenu(){
    if(codMenu!=0){
        GetSubMenu()
        setSubMenu(true)
        subMenu=true
    }

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
           p.codigo !== menuIdGet[35]?.codigo
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
    setIdPagina(0);
    setCodigo('');
    setNome('');
    setUrl('');
    setIcon('');
    setSubMenu(false);
    subMenu=false;
    setSalvar(false);
    salvar=false;
    setShow(true);
  }
 function Finalizar(){
  setEditarMenu(false);
    editarMenu=false;
    GetMontarMenu();
    handleClose();
 }

  async function GetMontarMenu() {
    setFilter(false);

    await api

      .get(`/api/Menu?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {

        setMenuPrincipal(response.data.data);
        menuPrincipal=response.data.data;
      //  console.log("vendedor",menuPrincipal)


        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));

      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });

  }

  async function GetporNome() {
    setFilter(true);
    if(pesquisaNome){
        await api
        .get(`/api/Menu/Get-Nome?pagina=${pagina}&totalpagina=999&Nome=${search}`)
        .then((response) => {

          setMenuPrincipal(response.data.data);
          menuPrincipal=response.data.data;

       //  console.log('usuarios pesquisa',menuPrincipal);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });

    }else{
        await api
        .get(`/api/Menu/Get-Codigo?pagina=${pagina}&totalpagina=999&Codigo=${search}`)
        .then((response) => {

          setMenuPrincipal(response.data.data);
          menuPrincipal=response.data.data;

      //   console.log('usuarios pesquisa',menuPrincipal);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });

    }


  }
  async function GetporCodigo() {
    setFilter(true);


  }
  function ShowModalEdit(){
    setShowEdit(true);
  }


    //=========== get usuarios por ID ==================================//
  async function GetPaginaId(id:any) {
    setIdPagina(0);
    setCodigo('');
    setNome('');
    setUrl('');
    setIcon('');

    setEdit(true);
    setShowEdit(true);
    setLoadingUpdate(false);
    await api
      .get(`/api/Menu/${id}`)
      .then((response) => {
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
        GetPaginasEdite();
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
      localStorage.setItem('@Portal/usuario/atualiza-menu','1')
    })
    .catch((error) => {

    });
  }
  //==============Criar SubMenu===============================//
  async function CriarSubMenu(){
    setLoadingUpdate(true)
  await api.put(`/api/Menu/${idMenuExistente}`, {
    id: idMenuExistente,
   codigo:codMenu,
   ordem:0,
   nome: nomeMenu,
   icon:iconMenu,
   subMenu: [
    {
      codigo: codSubMenu,
      ordem: 0,
      nome: nomeSubMenu,
      icon: "",
      menuId: idMenuExistente
    }
  ]

  })
    .then(response => {
      console.log("Submenu criado");
      GetSubmenu();
      setSubMenuExiste(true);
      subMenuExiste=true;
      localStorage.setItem('@Portal/usuario/atualiza-menu','1')
    })
    .catch((error) => {

    });
  }
   //========adicionar páginas na edição ================================//

   async function AdicionarPaginaEdite(){
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
            menuId: idMenuEdit
          }
        ]
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

  //========criar páginas ================================//

    async function CriarPaginaSubmenu(){
      setLoadingUpdate(true)
    await api.put(`/api/Menu/${idMenuExistente}`, {
      id: idMenuExistente,
      codigo:codMenu,
      ordem:0,
      nome: nomeMenu,
      icon:iconMenu,
          pagina: [
            {
              codigo: codPagina,
              nome: nomePagina,
              url: urlPagina,
              icon: "",
              menuId: idMenuExistente
            }
          ]
    })
      .then(response => {
        console.log("Pagina criada com sucesso");
        localStorage.setItem('@Portal/usuario/atualiza-menu','1')
      

      })
      .catch((error) => {

      });
    }


  //============ Editar Pagina ===============================//
  async function editePagina(){
  //  console.log('id',idPagina)
    setLoadingUpdate(true)
  await api.put(`/api/Menu/${idPagina}`, {
    id: idPagina,
    codigo: Number(codigo),
    nome: nome,
    url: url,
    icon: icon
  })
    .then(response => {
      handleCloseEdit()
      localStorage.setItem('@Portal/usuario/atualiza-menu','1')
      GetMontarMenu();
      setLoadingUpdate(false)

      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Dados da página atualizados com sucesso.");
    })
    .catch((error) => {
      setLoadingUpdate(false)
      handleCloseEdit()
      window.scrollTo(0, 0);
      handleShowMensage()
      setAlertErroMensage(true);

    const { data } = error.response;
    setMsgErro(data.message);


      return;
    });
  }

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
           setCriar(true);
           criar=true;

        });
}
async function MudarsubMenuPost(){
  // console.log('codigo menu',codMenu)
     await api
         .get(`/api/Menu/Get-Codigo?pagina=${pagina}&totalpagina=999&Codigo=${codMenu}`)
         .then((response) => {
          console.log('sub menu',response.data);
         
           setIdMenuExistente(response.data.data[0].id);
           idMenuExistente=response.data.data[0].id;
           setIdSubMenuExiste(response.data.data[0].subMenu[0].id);
           idSubMenuExiste=response.data.data[0].subMenu[0].id;
           console.log('menu existente',idSubMenuExiste);
           EditarSubMenuPost();
         })
         .catch((error) => {
          console.log("Ocorreu um erro");
            setCriar(true);
            criar=true;
 
         });
 }
//==========Editar submenu no post ======================================//
async function EditarSubMenuPost(){
  
  await api.put(`/api/SubMenu/${idSubMenuExiste}`, {
    id: idSubMenuExiste,
    codigo: codSubMenu,
    ordem: 0,
    nome: nomeSubMenu,
    icon: "",
    menuId: idMenuExistente
  })
    .then(response => {
      console.log("alterou o sub")
     localStorage.setItem('@Portal/usuario/atualiza-menu','1')
    })
    .catch((error) => {
      console.log("ocorreu erro")
         });
}

//===========Editar Submenu na edição ====================================//
async function EditarSubMenu(){
  
   await api.put(`/api/SubMenu/${idSubMenuEdit}`, {
     id: idSubMenuEdit,
     codigo: codSubMenu,
     ordem: 0,
     nome: nomeSubMenu,
     icon: "",
     menuId: idMenuEdit
   })
     .then(response => {
      localStorage.setItem('@Portal/usuario/atualiza-menu','1')
     })
     .catch((error) => {
       console.log("ocorreu erro")
          });
}
//===========get sub-menu========================================//
async function GetSubmenu(){
  // console.log('codigo menu',codMenu)
     await api
         .get(`/api/Menu/Get-Codigo?pagina=${pagina}&totalpagina=999&Codigo=${codMenu}`)
         .then((response) => {
          console.log('menu com submenu',response.data)
          setSubMenuMenu(response.data.data[0].subMenu[0].id);
          subMenuMenu=response.data.data[0].subMenu[0].id;
          console.log('submenu',response.data.data[0].subMenu[0].id)
         
         })
         .catch((error) => {
      
            setCriar(true);
            criar=true;

         });
 }


    //============ Criar Usuario ===============================//
    async function CreateMenu(){

           // setLoadingCreate(true)
           if(editarMenu){
              console.log("editar menu")
              EditeMenu();
           }else{
            await api.post("/api/Menu",{
              codigo:codMenu,
              ordem:0,
              nome: nomeMenu,
              icon:iconMenu
                 })

                  .then(response => {
                    console.log("menu criado")
              
                   ContinuarCreate();
                
                setEditarMenu(true);
                editarMenu=true;
                localStorage.setItem('@Portal/usuario/atualiza-menu','1')
              

                  })
                  .catch((error) => {
                    handleShowMensage()
                    setAlertErroMensage(true);
                    setMsgErro("Este menu já esta em uso!");
                    subMenu=false;
                    setSubMenu(false);
                  });
                }
        }

        //====EXCLUIR PAGINA POR ID ============================================================
        async function DeletePaginaId(id: any,IdMenu: any){
          setLoadingUpdate(true)
        await api.delete(`/api/Paginas/${id}`)
          .then(response => {
         GetPaginaId(IdMenu);
         localStorage.setItem('@Portal/usuario/atualiza-menu','1')
          })
          .catch((error) => {
          });
        }


       //==== EXCLUIR TODAS AS PAGINAS RELACIONADAS AO MENU======================================

       async function DeletePagina(id: any){
        setLoadingUpdate(true)
      await api.get(`/api/Paginas/${id}`)
        .then(response => {
          handleCloseEdit()
         // GetMontarMenu();
          setLoadingUpdate(false)
          DeleteMenu(id)
          localStorage.setItem('@Portal/usuario/atualiza-menu','1')
         // window.location.reload();
        })
        .catch((error) => {
          setLoadingUpdate(false)
          handleCloseEdit()
          window.scrollTo(0, 0);
          handleShowMensage()
          setAlertErroMensage(true);

        const { data } = error.response;
        setMsgErro(data.message);


          return;
        });
      }

       async function DeleteMenu(id: any){
        setLoadingUpdate(true)
      await api.delete(`/api/Menu/${id}`)
        .then(response => {
          handleCloseEdit()
          GetMontarMenu();
          setLoadingUpdate(false)
          handleShowMensage()
          setAlertErroMensage(true);
          setMsgErro("Menu excluído com sucesso.");
          localStorage.setItem('@Portal/usuario/atualiza-menu','1')
         // window.location.reload();
        })
        .catch((error) => {
          setLoadingUpdate(false)
          handleCloseEdit()
          window.scrollTo(0, 0);
          handleShowMensage()
          setAlertErroMensage(true);

        const { data } = error.response;
        setMsgErro(data.message);


          return;
        });
      }
    //==========================================================//
function LimparPesquisa(){
  setSearch('');
  PesquisaNome()
  setPagina(1);
  setFilter(false);
  GetMontarMenu();
}

function PesquisaNome(){
  setSearch('');
  GetMontarMenu();
  setPesquisaNome(true);
  setPesquisaStatus(false);
  setPesquisaCod(false);

}



function PesquisaCod(){
  setSearch('');
  GetMontarMenu();
  setPesquisaCod(true)
  setPesquisaNome(false);
  setPesquisaStatus(false);
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
            <h1>Montar Menu</h1>
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
              <div className='logo-cadastro-menu'></div>
          <div className='conteudo'>
          <div className='div-button-top'>
          <div className='pesBloco'>
                <div className='title-pesBloco'>
                <span style={{fontSize:14}}>Pesquisar por:</span>
                </div>
                <div className='d-flex'>
                  <input  name='pesquisa' type="radio" checked={pesquisaNome}  onChange={PesquisaNome} /><p style={{fontSize:13,marginLeft:8}} >Nome</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaCod}  onChange={PesquisaCod} /><p style={{fontSize:13,marginLeft:8}} >Código</p>
                  </div>
              </div>
          <OverlayTrigger
          placement={"top"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Novo Menu</Tooltip>}
        >
      <button  className='btn btn-dark btn-direito'  onClick={handleShow}>
        Novo <TfiNewWindow style={{marginLeft: 8,marginBottom:5}}/>
      </button>
      </OverlayTrigger>
      </div>
            <div style={{marginTop:10, width:"100%"}} className='conteudo-botoes'>
            <div className='bloco-pesquisa-input'>
            {pesquisaCod?(<>
              <div className='codPesquisa'>
              <p className="title-input"  >Código: </p>
            <input  id="input-cod"
            type="text"
            className='form-coontrol input-cod-Pesquisa '
             name=""
             value={search}
             onChange={(e)=>{
              setSearch(e.target.value);

            }}
              />
            </div>
            </>):(<></>)}

            {pesquisaNome?(<>
              <div>
              <p className="title-input"  >Nome: </p>
            <input  id="nomePesquisa"
            type="text"
            className='form-coontrol inputlogin'
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
            <p className="title-input"  >Status: </p>
            <select
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
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
            </div>
            </>):(<></>)}
            </div>



                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas btn-pesquisar'onClick={()=>{setPagina(1);GetporNome()}}>Pesquisar<FaSearchPlus style={{marginLeft: 6}} fontSize={17}/></button>

                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas' onClick={LimparPesquisa}>Limpar<AiOutlineClear style={{marginLeft: 6}} fontSize={20}/></button>

                    </div>

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
               ShowModalEdit();
                }}>
                <HiOutlinePencilSquare/>
              </button>
              </OverlayTrigger>


              <OverlayTrigger
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
              </OverlayTrigger>
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

      <Modal className='modal-cadastro-vendedor' show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <h1>Montar Menu</h1>
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
        <div  className='form-cadastro-user' >

        <div className='coluna-dupla coluna-dupla-menu'>
            <div  className='bloco-input bloco-menu-cad'>
            <p className="title-input"  >Menu Principal: <span style={{color:'red'}}>*</span></p>
            <Select
                     id="promotor"
                     className="inputparceiro"
                     placeholder='Digite ou selecione'
                  noOptionsMessage={() => "Nenhuma menu encontrado"}
                   //  value={search}
                     options={menuPesquisa}
                      onChange={(value: any)=>{
                        setCodMenu(value.value);
                        codMenu=value.value;
                        setNomeMenu(value.label);
                        nomeMenu=value.label;
                        CreateMenu();
                        escolherMenu();
                        LimparTodos();
                      }}
                    />
            </div>
            {subMenu?(<>
            <div  className='bloco-input bloco-menu-cad'>

            <p className="title-input"  >SubMenu: </p>
            <Select
                     id="promotor"
                     className="inputparceiro"
                     placeholder='Digite ou selecione'
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search}
                     options={subMenuPesquisa}
                      onChange={(value: any)=>{
                        setCodSubMenu(value.value);
                        codSubMenu=value.value;
                        setNomeSubMenu(value.label);
                        nomeSubMenu=value.label;
                        if(subMenuExiste){
                         // EditarSubMenuPost();
                         MudarsubMenuPost()
                        }else{
                          CriarSubMenu();
                        }
                        LimparTodos();
                      }}
                    />
            </div>
            </>):(<></>)}

            </div>
            {subMenu?(<>
            <div  className='bloco-paginas'>

      {pagina_Base.map((pagina_Base)=> (
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
                        GetPaginaMenuExistente(pagina_Base.codigo);
                       // CriarPaginaSubmenu()
                    //   setComercial(target.checked);
                    setSalvar(true)
                    salvar=true
                       }}
                      />
                      <p className='text'>{pagina_Base.nome}</p>

                      </div>
             ))}
            </div>
            </>):(<></>)}

             <div  className='bloco-input bloco-buttom-vendedor'>

                    <button  disabled={loadingCreate||salvar==false} id='' className='btn btn-cadastrar-vendedor btn-cad-menu'onClick={Finalizar}>Finalizar</button>
         </div>


            </div>
            </>    )}
        </Modal.Body>

      </Modal>
      {/* ================Modal Edit ============================================== */}

      <Modal className='modal-edit-vendedor' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Dados do Menu</h1>
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
            {/* <Select
                     id="promotor"
                     className="inputparceiro"
                     placeholder={nomeMenuEdit}
                  noOptionsMessage={() => "Nenhuma menu encontrado"}
                   //  value={search}
                     options={menuPesquisa}
                      onChange={(value: any)=>{
                        setCodMenu(value.value);
                        codMenu=value.value;
                        setNomeMenu(value.label);
                        nomeMenu=value.label;
                        CreateMenu();
                        escolherMenu();
                        LimparTodos();
                      }}
                    /> */}
            </div>

            <div  className='bloco-input bloco-menu-cad'>

            <p className="title-input"  >SubMenu: </p>
            <Select
                     id="promotor"
                     className="inputparceiro"
                     placeholder={nomeSubMenuEdit}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search}
                     options={subMenuPesquisa}
                      onChange={(value: any)=>{
                        setCodSubMenu(value.value);
                        codSubMenu=value.value;
                        setNomeSubMenu(value.label);
                        nomeSubMenu=value.label;
                        EditarSubMenu();
                        // CriarSubMenu();
                        LimparTodos();
                      }}
                    />
            </div>

            </div>
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





{/* 
            <div className='coluna-dupla'> */}
            <div  className='bloco-botoes-finalizar'>
            <button disabled={loadingUpdate}  id='' className='btn btn-cadastrar btn-edit-vend'onClick={handleCloseEdit}>Finalizar</button>
            {/* <button disabled={loadingUpdate} id='b' className='btn btn-cancelar btn-edit-vend'onClick={handleCloseEdit}>Cancelar</button> */}
            </div>

                    {/* </div> */}
            </div>
           </>)}
        </Modal.Body>

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
