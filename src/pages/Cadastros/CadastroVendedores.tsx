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
import { iVendedores, iDadosUsuario } from '../../@types';
import { BiSearchAlt } from 'react-icons/bi';



export default function CadastroVendedores() {
  const history = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [vendedorId, setVendedorId] = useState(0);
  const [codVendedor, setCodVendedor] = useState('');
  const [nome, setNome] = useState('');
  const [ativo, setAtivo] = useState('');
  const [regiao, setRegiao] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('1');
  const [comiVenda, setComiVenda] = useState(0);
  const [comiGerencia, setComiGerencia] = useState(0);
  const [valor_hora, setValor_hora] = useState(0);
  const [formaComissao, setFormaComissao] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [gerenteId, setGerenteId] = useState('');
  const [gerente, setGerente] = useState('');
  const [parceiroId, setParceiroId] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [centroR_PadraoId, setCentroR_PadraoId] = useState('');
  const [centroR_Padrao, setCentroR_Padrao] = useState('');
  const [custoVariavel, setCustoVariavel] = useState(0);
  const [atuaComprador, setAtuaComprador] = useState(false);


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
  let [vendedores, setVendedores] = useState<iVendedores[]>([]);
  let [vendedorGetId, setVendedorGetId] = useState<iVendedores[]>([]);
 

  let [totalPaginas, setTotalPaginas] = useState(0);

   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [codSearch, setCodSearch] = useState('');
   const [searchStatus, setSearchStatus] = useState('');
   const [filter, setFilter] = useState(false);
   

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);

   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaStatus, setPesquisaStatus] = useState(false);
   const [pesquisaCod, setPesquisaCod] = useState(false);

  //=====pesquisas de insert =====================================//
  //====parceiro=================================================//
  const [pesParceiroNome, setPesParceiroNome] = useState(true);
  const [pesParceiroId, setPesParceiroId] = useState(false);
  //===== gerente ===============================================//
  const [pesGerenteNome, setPesGerenteNome] = useState(true);
  const [pesGerenteId, setPesGerenteId] = useState(false);
  //====funcionario==============================================//
  const [pesFuncionarioNome, setPesFuncionarioNome] = useState(true);
  const [pesFuncionarioId, setPesFuncionarioId] = useState(false);
  //====empresa==================================================//
  const [pesEmpresaNome, setPesEmpresaNome] = useState(true);
  const [pesEmpresaId, setPesEmpresaId] = useState(false);

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
    if(!filter){
      GetVendedores();
    }else{
      GetVendedoresFilter();
    }
    
  },[pagina]);
  function handleShowMensage(){
   
    setShowMensage(true);
    setTimeout(function() {
            
   //   setShowMensage(false);
      
     }, 1200);
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
    setNome('');
    setCodVendedor('');
    setAtivo('');
    setRegiao('');
    setTipo('1');
    setComiVenda(0);
    setComiGerencia(0);
    setValor_hora(0);
    setFormaComissao('');
    setCargaHoraria('');
    setEmpresa('');
    setGerenteId('');
    setGerente('');
    setParceiroId('');
    setParceiro('');
    setFuncionarioId('');
    setFuncionario('');
    setCentroR_PadraoId('');
    setCentroR_Padrao('');
    setCustoVariavel(0);
    setEmail('');
    setAtuaComprador(false);
  
    setShow(true);
  }
 

  async function GetVendedores() {
    setFilter(false);
    await api
    
      .get(`/api/Vendedor?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setNome(response.data.data[0].nome)
        setVendedores(response.data.data);
        vendedores=response.data.data;
        console.log("vendedor",vendedores)
        
       // vendedores=response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        // setTotalPaginas(response.data.total / qtdePagina);
     //  console.log('total de paginas',totalPaginas);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

  async function GetVendedoresFilter() {
    setFilter(true);
    await api
      .get(`/api/Vendedor/filter?pagina=${pagina}&totalpagina=999&filter=${search}`)
      .then((response) => {
       
        setVendedores(response.data.data);
        vendedores=response.data.data;
      
       console.log('usuarios pesquisa',vendedores);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
  function ShowModalEdit(){
    setShowEdit(true);
  }
 
  
    //=========== get usuarios por ID ==================================//
  async function GetVendedorId(id:any) {
    // setNome('');
    // setCodVendedor('');
    // setAtivo('');
    // setRegiao('');
    // setTipo('');
    // setComiVenda(0);
    // setComiGerencia(0);
    // setValor_hora(0);
    // setFormaComissao('');
    // setCargaHoraria('');
    // setEmpresa('');
    // setGerenteId('');
    // setGerente('');
    // setParceiroId('');
    // setParceiro('');
    // setFuncionarioId('');
    // setFuncionario('');
    // setCentroR_PadraoId('');
    // setCentroR_Padrao('');
    // setCustoVariavel(0);
    // setEmail('');
    // setAtuaComprador(false);
  
    setEdit(true);
    setShowEdit(true);
    
    await api
      .get(`/api/Vendedor/${id}`)
      .then((response) => {
          setVendedorGetId(response.data.id);
          vendedorGetId=response.data.id;
           setNome(response.data.nome);
           setCodVendedor(response.data.codVendedor);
           setAtivo(response.data.status);
           setRegiao(response.data.regiao);
           setTipo(response.data.tipo);
           setEmail(response.data.email);
           setAtuaComprador(response.data.atua_Compras);

        console.log('vendedor Id',response.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar Usuario ===============================//
  async function editeVendedor(){
    console.log('id',vendedorGetId)
    setLoadingUpdate(true)
  await api.put(`/api/Vendedor/${vendedorGetId}`, {
    id:vendedorGetId,
    codVendedor:codVendedor,
    nome: nome,
    status: ativo,
    regiao: regiao,
    comissao_Vendas:comiVenda,
    comissao_Gerencia: comiGerencia,
    vrl_hr_Comi_OS: valor_hora,
    form_Comissao: formaComissao,
    cargaHora:  cargaHoraria,
    empresa:  empresa,
    gerenteId: gerenteId,
    gerenteNome: gerente,
    parceiroId: parceiroId,
    parceiroNome: parceiro,
    funcionarioId: funcionarioId,
    funcionarioNome: funcionario,
    centroR_PadraoID: centroR_PadraoId,
    centroR_PadraoDesc: centroR_Padrao,
    custo_Variavel: custoVariavel,
    email: email,
    tipo: tipo,
    atuaCompras:atuaComprador,
  })
    .then(response => {
      handleCloseEdit()
    
      GetVendedores();
      setLoadingUpdate(false)
     
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Dados do vendedor atualizados com sucesso.");
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

       if(codVendedor==''){
         let senhaconf: any;
         senhaconf = document.getElementById("codVendedor");
         document.getElementById("codVendedor")?.focus();
         setAlertErroRegister(true);
         setMsgErro("É obrigatório informar o código do vendedor.");
       return
       }
       if(nome==''){
        let senhaconf: any;
        senhaconf = document.getElementById("nomeVendedor");
        document.getElementById("nomeVendedor")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o nome do vendedor.");
      return
      }

      
  setLoadingCreate(true)
  await api.post("/api/Vendedor",{
    codVendedor:codVendedor,
    nome: nome,
    status: 'true',
    regiao: regiao,
    comissao_Vendas:comiVenda,
    comissao_Gerencia: comiGerencia,
    vrl_hr_Comi_OS: valor_hora,
    form_Comissao: formaComissao,
    cargaHora:  cargaHoraria,
    empresa:  empresa,
    gerenteId: gerenteId,
    gerenteNome: gerente,
    parceiroId: parceiroId,
    parceiroNome: parceiro,
    funcionarioId: funcionarioId,
    funcionarioNome: funcionario,
    centroR_PadraoID: centroR_PadraoId,
    centroR_PadraoDesc: centroR_Padrao,
    custo_Variavel: custoVariavel,
    email: email,
    tipo: tipo,
    atuaCompras:atuaComprador,
       })
       
        .then(response => {
          setLoadingCreate(false)
         // GetUsuariosAcount();
          GetVendedores();
          handleClose ();
          handleShowMensage();
          setAlertErroMensage(true);
          window.scrollTo(0, 0);
          setMsgErro(`${tipo=='1'?'Vendedor':tipo=='2'?'Comprador':tipo=='3'?'Assessor':tipo=='4'?'Gerente':tipo=='5'?'Representante':tipo=='6'?'Supervisor':tipo=='8'?'Promotor':'Técnico'} criado com sucesso.`);
        })
        .catch((error) => {
         // handleClose()
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
       async function DeleteVendedor(id: any){
        setLoadingUpdate(true)
      await api.delete(`/api/Vendedor/${id}`)
        .then(response => {
          handleCloseEdit()
          GetVendedores();
          setLoadingUpdate(false)
          handleShowMensage()
          setAlertErroMensage(true);
          setMsgErro("Vendedor excluído com sucesso.");
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
  GetVendedores();
}

function PesquisaNome(){
  setSearch('');
  GetVendedores();
  setPesquisaNome(true);
  setPesquisaStatus(false);
  setPesquisaCod(false);

}
 
function PesquisaStatus(){
  setSearch('');
  GetVendedores();
  setPesquisaNome(false);
  setPesquisaStatus(true);
  setPesquisaCod(false);
}

function PesquisaCod(){
  setSearch('');
  GetVendedores();
  setPesquisaCod(true)
  setPesquisaNome(false);
  setPesquisaStatus(false);
}

//========== pesquisas de insert ============//

//=======parceiro==================//
function PesquisaParceiroNome(){
  
  setPesParceiroNome(true);
  setPesParceiroId(false);

}
function PesquisaParceiroCod(){

  setPesParceiroNome(false);
  setPesParceiroId(true);

}
//=======gerente==================//
function PesquisaGerenteNome(){
  
  setPesGerenteNome(true);
  setPesGerenteId(false);

}
function PesquisaGerenteCod(){

  setPesGerenteNome(false);
  setPesGerenteId(true);

}
//=====empresa=====================//

function PesquisaEmpresaNome(){
  
  setPesEmpresaNome(true);
  setPesEmpresaId(false);

}
function PesquisaEmpresaCod(){

  setPesEmpresaNome(false);
  setPesEmpresaId(true);

}
//=====funcionario=====================//

function PesquisaFuncionarioNome(){
  
  setPesFuncionarioNome(true);
  setPesFuncionarioId(false);

}
function PesquisaFuncionarioCod(){

  setPesFuncionarioNome(false);
  setPesFuncionarioId(true);

}
//===========================================//


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
            <h1>Vendedores</h1>
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
              <div className='logo-cadastro-vendas'></div>
          <div className='conteudo'>
          <div className='div-button-top'>
          <div className='pesBloco'>
                <div className='title-pesBloco'>
                <span style={{fontSize:14}}>Pesquisar por:</span>
                </div>
                <div className='d-flex'>
                  <input  name='pesquisa' type="radio" checked={pesquisaNome}  onChange={PesquisaNome} /><p style={{fontSize:13,marginLeft:8}} >Nome</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaCod}  onChange={PesquisaCod} /><p style={{fontSize:13,marginLeft:8}} >Código</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaStatus}  onChange={PesquisaStatus} /><p style={{fontSize:13,marginLeft:8}} >Status</p>
                  </div>
              </div>
          <OverlayTrigger
          placement={"top"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Novo Vendedor</Tooltip>}
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

                   
        
                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas btn-pesquisar'onClick={()=>{setPagina(1);GetVendedoresFilter()}}>Pesquisar<FaSearchPlus style={{marginLeft: 6}} fontSize={17}/></button>
        
                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas' onClick={LimparPesquisa}>Limpar<AiOutlineClear style={{marginLeft: 6}} fontSize={20}/></button>
                  
                    </div>
                    
          <div className="table-responsive table-scroll tabela-responsiva">
      
          <div className=' table-wrap'>
      <Table responsive className='table-global table  main-table'>
      <thead>
      <tr className="tituloTab">
          <th style={{width: 100}} className="th1 cod-grupo">Codigo</th>
          <th className="th1 Nome-completo">Nome</th>
          <th style={{textAlign:'center'}}  className="th4">Status</th>
          <th style={{textAlign:'center'}}  className="th4">Tipo</th>
          <th style={{textAlign:'center'}} className="th4 ">E-mail</th>
          {/* <th style={{textAlign:'center'}} className="th4 ">Parceiro</th> */}
          <th style={{textAlign:'center',color:"transparent"}} className="th4 ">..........</th>
          <th style={{textAlign:'center',color:"transparent"}} className="th4 ">..........</th>
          <th style={{textAlign:'center'}} className="th4 fixed-table">Ações</th>
      </tr>
      </thead>
      <tbody>
        
      {vendedores.length > 0 ? (
                        <>
      {vendedores.map((vendedores)=> (
        <tr >
          <td style={{textAlign:"center"}} className=''>{vendedores.codVendedor}</td> 
         <td className='Nome-completo'>{vendedores.nome}</td> 
         <td style={vendedores.status =='true'?{color:'#008000', textAlign:"center"}:{color:'red', textAlign:"center"}}>{vendedores.status =="true"?"Ativo":"Inativo"}</td>
         <td style={{textAlign:"center"}} >{vendedores.tipo =="1"?"Vendedor":vendedores.tipo =="2"?"Comprador":vendedores.tipo =="3"?"Acessor":vendedores.tipo =="4"?"Gerente":vendedores.tipo =="5"?"Representante":vendedores.tipo =="6"?"Supervisor":vendedores.tipo =="8"?"Promotor":"Técnico"}</td>
         <td style={vendedores.email ==null ||vendedores.email ==""?{color:'red',textAlign:'center'}:{color:'#000',textAlign:'center'}}>{vendedores.email?vendedores.email:"Não informado"}</td>
         
         {/* <td style={vendedores.parceiroNome ==null ||vendedores.parceiroNome ==""?{color:'red',textAlign:'center'}:{color:'#000',textAlign:'center'}}>{vendedores.parceiroNome?vendedores.parceiroNome:"Não informado"}</td> */}
         
          
            
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

                GetVendedorId(vendedores.id);
                console.log("id ",vendedores.id)
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
               DeleteVendedor(vendedores.id);
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
            Nenhum vendedor encontrado.
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
          <h1>Cadastro de Vendedores</h1>
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
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-codigo'>
            <p className="title-input"  >Código: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='codVendedor'
              type="text"
              //name='user' 
              value={codVendedor}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCodVendedor(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='nomeVendedor'
              type="text"
              //name='user' 
              value={nome}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setNome(e.target.value.toUpperCase());
                LimparTodos();
              }}
              />
            </div>
            
            </div>


            <div className='coluna-dupla'>

            <div className='bloco-input bloco-tipo'>
            <p className=" title-input"  >Tipo: <span style={{color:'red'}}>*</span></p>
          
              <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
            value={tipo}
                         onChange={(e) => {setTipo(e.target.value);
                        }}
                        >
                        <option value="1">VENDEDOR</option>
                        <option value="2">COMPRADOR</option>
                        <option value="3">ASSESSOR</option>
                        <option value="4">GERENTE</option>
                        <option value="5">REPRESENTANTE</option>
                        <option value="6">SUPERVISOR</option>
                        <option value="7">TÉCNICO</option>
                        <option value="8">PROMOTOR</option>
                    </select> 
               </div>
           
               <div className='check-grupo atua-comprador'>
                      {tipo !="2"?(<><input 
                      type="checkbox" name="grupo" 
                      id="grupo" 
                      checked={atuaComprador}  
                      onChange={({ target }) => {
                      setAtuaComprador(target.checked);
                      }} 
                      />
                      <p className='text'>Também é comprador</p></>):(<></>)}
                      
                      
                      </div>
                      
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-email'>
            <p className="title-input" >Email: </p>
              <input className='form-control inputlogin' 
              id='email'
              type="text"
             
              value={email}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setEmail(e.target.value.toLowerCase());
                LimparTodos();
              }}
              />
            </div>
            <div  className='bloco-input bloco-regiao'>
            <p className="title-input" >Região:  </p>
            <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
             value={regiao}
              onChange={(e) => {setRegiao(e.target.value);}}
                        >
                        <option value="0">SEM REGIÃO</option>
                        
                    </select> 
            </div> 
            </div>

           
            <div className='coluna-dupla'>

            <div  className='bloco-input bloco-buttom-vendedor'>
            
                    <button  disabled={loadingCreate} id='' className='btn btn-cadastrar-vendedor'onClick={CreateUsuario}>Cadastrar</button>
            </div>      
            
            </div>
            </div>
            </>    )}
        </Modal.Body>
      
      </Modal>
      {/* ================Modal Edit ============================================== */}

      <Modal className='modal-edit-vendedor' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Dados do Vendedor</h1>
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
              id='codVendedor'
              type="text"
              //name='user' 
              value={codVendedor}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCodVendedor(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome: <span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputlogin' 
              id='nomeVendedor'
              type="text"
              //name='user' 
              value={nome}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setNome(e.target.value.toUpperCase());
                LimparTodos();
              }}
              />
            </div>
            
            </div>


            <div className='coluna-dupla'>

            <div className='bloco-input bloco-tipo'>
            <p className=" title-input"  >Tipo: <span style={{color:'red'}}>*</span></p>
          
              <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
            value={tipo}
                         onChange={(e) => {setTipo(e.target.value);
                        }}
                        >
                        <option value="1">VENDEDOR</option>
                        <option value="2">COMPRADOR</option>
                        <option value="3">ASSESSOR</option>
                        <option value="4">GERENTE</option>
                        <option value="5">REPRESENTANTE</option>
                        <option value="6">SUPERVISOR</option>
                        <option value="7">TÉCNICO</option>
                        <option value="8">PROMOTOR</option>
                    </select> 
               </div>
           
               <div className='check-grupo atua-comprador'>
                      {tipo !="2"?(<><input 
                      type="checkbox" name="grupo" 
                      id="grupo" 
                      checked={atuaComprador}  
                      onChange={({ target }) => {
                      setAtuaComprador(target.checked);
                      }} 
                      />
                      <p className='text'>Também é comprador</p></>):(<></>)}
                      
                      
                      </div>
                      <div  className='bloco-input bloco-status-vend'>
            <p className="title-input" >Status </p>
              
              <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
            value={ativo}
            
                         onChange={(e) => {setAtivo(e.target.value);}}
                        >
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>   
            </div>
            
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-email'>
            <p className="title-input" >Email: </p>
              <input className='form-control inputlogin' 
              id='email'
              type="text"
             
              value={email}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setEmail(e.target.value.toLowerCase());
                LimparTodos();
              }}
              />
            </div>
            <div  className='bloco-input bloco-regiao'>
            <p className="title-input" >Região:  </p>
            <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
             value={regiao}
              onChange={(e) => {setRegiao(e.target.value);}}
                        >
                        <option value="0">SEM REGIÃO</option>
                        
                    </select> 
            </div> 
            </div>


            
            
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-button-edit'>
            <button disabled={loadingUpdate}  id='' className='btn btn-cadastrar btn-edit-vend'onClick={editeVendedor}>Editar</button>
            <button disabled={loadingUpdate} id='b' className='btn btn-cancelar btn-edit-vend'onClick={handleCloseEdit}>Cancelar</button>
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
