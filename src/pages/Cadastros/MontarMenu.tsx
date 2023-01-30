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
import { iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from "../../components/Paginacao";
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { iVendedores, iDadosUsuario, iPaginaBase, iDataSelect, iMenu, iSubMenu } from '../../@types';
import { BiSearchAlt } from 'react-icons/bi';
import Select from 'react-select';



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
  let [pagina_Base, setPagina_Base] = useState<iPaginaBase[]>([]);

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


  let [totalPaginas, setTotalPaginas] = useState(0);

   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [filter, setFilter] = useState(false);
   

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);

   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaStatus, setPesquisaStatus] = useState(false);
   const [pesquisaCod, setPesquisaCod] = useState(false);

//===============================================================//
let [codMenu, setCodMenu] = useState(0);
let [nomeMenu, setNomeMenu] = useState('');
let [codSubMenu, setCodSubMenu] = useState(0);
let [nomeSubMenu, setNomeSubMenu] = useState('');
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
        GetporNome();
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
           let pagina = response.data.data.filter((p:any)=>p.url =="")
          let options:Array<iDataSelect>=new Array<iDataSelect>();
          pagina.map((pagina:any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(pagina.codigo);
            // rowGrupo.label = String(pagina.codigo)+ " - " + pagina.nome ;
            rowGrupo.label = pagina.nome ;
           
             options.push(rowGrupo);
            setMenuPesquisa(options);
            menuPesquisa=options
           console.log("Menu",menuPesquisa)
           
          })
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

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
        console.log('sub',response.data.data)
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
           console.log("Menu",subMenuPesquisa)
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
        console.log('sub',response.data.data)
        if (response.data.data.length > 0) {
           let pagina = response.data.data.filter((p:any)=>p.url !=="")
          
            setPagina_Base(pagina);
            pagina_Base=pagina
           console.log("pagina",pagina_Base)
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
        console.log("vendedor",menuPrincipal)
        
     
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
        
         console.log('usuarios pesquisa',menuPrincipal);
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
        
         console.log('usuarios pesquisa',menuPrincipal);
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
    
    await api
      .get(`/api/Menu/${id}`)
      .then((response) => {
          setIdPagina(response.data.id);
           setNome(response.data.nome);
           setCodigo(String(response.data.codigo));
           setUrl(response.data.url);
           setIcon(response.data.icon);

        console.log('pagina Id',response.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar Usuario ===============================//
  async function editePagina(){
    console.log('id',idPagina)
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
    //============ Criar Usuario ===============================//
    async function CreatePagina(){

       if(codigo==''){
         let senhaconf: any;
         senhaconf = document.getElementById("codigo");
         document.getElementById("codigo")?.focus();
         setAlertErroRegister(true);
         setMsgErro("É obrigatório informar o código da página.");
       return
       }
       if(nome==''){
        let senhaconf: any;
        senhaconf = document.getElementById("nome");
        document.getElementById("nome")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o nome da página.");
      return
      }

      
  setLoadingCreate(true)
  await api.post("/api/Menu",{
    codigo: Number(codigo),
    nome: nome,
    url: url,
    icon: icon
       })
       
        .then(response => {
          setLoadingCreate(false)
       
          GetMontarMenu();
          handleClose ();
          handleShowMensage();
          setAlertErroMensage(true);
          window.scrollTo(0, 0);
          setMsgErro(`Página criads com sucesso.`);
        })
        .catch((error) => {
         
         setLoadingCreate(false)
          window.scrollTo(0, 0);
          console.log(error.response)
          handleShowMensage()
          setAlertErroMensage(true);
          const  data  = error.response.data;
         setMsgErro(data);
          return;
        });
      }
       //==== EXCLUIR GRUPO ======================================
       async function DeletePagina(id: any){
        setLoadingUpdate(true)
      await api.delete(`/api/Menu/${id}`)
        .then(response => {
          handleCloseEdit()
          GetMontarMenu();
          setLoadingUpdate(false)
          handleShowMensage()
          setAlertErroMensage(true);
          setMsgErro("página excluída com sucesso.");
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
                console.log("id ",pagina_Base.id)
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
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={menuPesquisa}  
                      onChange={(value: any)=>{ 
                        setCodMenu(value.value); 
                        codMenu=value.value;
                        setNomeMenu(value.label); 
                        nomeMenu=value.label;
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
          <h1>Dados da Página</h1>
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
      
        <div className='coluna-dupla'>
            <div  className='bloco-input bloco-codigo'>
            <p className="title-input"  >Código: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='codigo'
              type="text"
              //name='user' 
              value={codigo}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCodigo(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='nome'
              type="text"
              //name='user' 
              value={nome}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setNome(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            
            </div>

            <div className='coluna-dupla'>

<div className='bloco-input'>
<p className="title-input"  >Url: <span style={{color:'red'}}>*</span></p>
  <input className='form-coontrol inputlogin' 
  id='url'
  type="text"
  //name='user' 
  value={url}
  //onKeyDown={LimparErro} 
  onChange={(e)=>{ 
    setUrl(e.target.value);
    LimparTodos();
  }}
  />
   </div>
   <div  className='bloco-input bloco-email'>
<p className="title-input" >Icone: </p>
  <input className='form-control inputlogin' 
  id='icon'
  type="text"
 
  value={icon}
  //onKeyDown={LimparErro} 
  onChange={(e)=>{ 
    setIcon(e.target.value);
    LimparTodos();
  }}
  />
</div>
          
</div>
            
           


            
            
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-button-edit'>
            <button disabled={loadingUpdate}  id='' className='btn btn-cadastrar btn-edit-vend'onClick={editePagina}>Editar</button>
            <button disabled={loadingUpdate} id='b' className='btn btn-cancelar btn-edit-vend'onClick={handleCloseEdit}>Cancelar</button>
            </div>
                    
                    </div> 
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
