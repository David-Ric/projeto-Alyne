import React, { useEffect, useState } from 'react';
import '../../styles/pages-styles/CadastroUser.scss';
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
import { iEmpresa, iTabelaCliente, iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from "../../components/Paginacao";
import { phoneMask } from '../../Masks/Masks';
import { FaSearchPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { iDadosUsuario, iDataSelect, iProdutos,iProdutoConcorrente } from '../../@types';
import Select from 'react-select';



export default function CadastroTabelaPrecoCliente() {
  const history = useNavigate();





  const [id, setId] = useState(0);
  const [codProduto, setCodProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [codConcorrente, setCodConcorrente] = useState('');
  const [nomeConcorrente, setNomeConcorrente] = useState('');
  const [codProdutoConcorrente, setCodProdutoConcorrente] = useState('');
  const [nomeProdutoSimilar, setNomeProdutoSimilar] = useState('');
  
  
  
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [idGrupo, setIdGrupo] = useState('');
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');

  let [tabela, setTabela] = useState<iTabelaCliente[]>([]);
  const [limpando, setLimpando] = useState(false);

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
 
  let [totalPaginas, setTotalPaginas] = useState(0);

   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [searchStatus, setSearchStatus] = useState('');
   const [filter, setFilter] = useState(false);
   let [concorrentefilter, setConcorrentefilter] = useState(false);

   const [codEmpresa, setCodEmpresa] = useState('');
   const [codParceiro, setCodParceiro] = useState('');
   const [codTabelaPreco, setCodTabelaPreco] = useState('');

   const [nomeParceiro, setNomeParceiro] = useState('');
   const [nomeTabela, setNomeTabela] = useState('');
   
   


   

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);

   const [produtoPesquisa, setProdutoPesquisa] = useState<iDataSelect[]>([]);
   
   
   let [empresaSelect, setEmpresaSelect] = useState<iEmpresa[]>([]);
   const [parceiroSelect, setParceiroSelect] = useState<iDataSelect[]>([]);
   const [tabelaSelect, setTabelaSelect] = useState<iDataSelect[]>([]);


   const [pesquisaProduto, setPesquisaProduto] = useState(true);
   const [pesquisaSimilar, setPesquisaSimilar] = useState(false);
   const [pesquisaConcorrente, setPesquisaConcorrente] = useState(false);

   let [selectGrupoBanco, setSelectGrupoBanco] = useState<iDataSelect>();

  

   const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  // const handleShow = () => setShow(true);
  useEffect(() => { 
    logado()
   // GetProdutosAcount();
  },[]);

  function logado(){
   
    // if(usuariolog.token && usuariolog.status=="1"&& usuariolog.grupo=="1"){
    //   history('/admin-home'); 
    // }
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
    GetParceiros();
    GetEmpresa();
    GetTabelaPreco();
  
    if(!filter){
      GetTabela();
    }else{
      GetTabelaFilter();
    }
    
  },[pagina]);
  function handleShowMensage(){
   
    setShowMensage(true);
    setTimeout(function() {
            
   //   setShowMensage(false);
      
     }, 1200);
  }

 
  
 function LimparTodos(){
  setAlertErroRegister(false);
 }
  function handleShow(){
    setId(0);
    setCodEmpresa('');
    setCodProduto('');
    setNomeProduto('');
    setCodConcorrente('');
    setCodProdutoConcorrente('');
    setNomeConcorrente('');
    setNomeProdutoSimilar('');
    setShow(true);
  }
 
  //========get select parceiros ====================================
  async function GetParceiros() {
    setFilter(false);
    
    await api
    
      .get(`/api/Parceiros?pagina=1&totalpagina=999`)
      .then((response) => {
      //  console.log("grupo",response.data.data)
        
        if (response.data.data.length > 0) {
         let options:Array<iDataSelect>=new Array<iDataSelect>();
         response.data.data.map((parceiro:any) => {
           let rowProd: iDataSelect = {};
           rowProd.value = String(parceiro.id);
           rowProd.label = String(parceiro.id)+ " - " + parceiro.nome;
         
            options.push(rowProd);
           setParceiroSelect(options);
           console.log("parceiro",parceiroSelect)
         })
       }
    
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
  //========get select empresa ====================================
  async function GetEmpresa() {
    setFilter(false);
    
    await api
    
      .get(`/api/Empresa?pagina=1&totalpagina=999`)
      .then((response) => {
      //  console.log("grupo",response.data.data)
      setEmpresaSelect(response.data.data);
      empresaSelect=response.data.data;
      //   if (response.data.data.length > 0) {
      //    let options:Array<iDataSelect>=new Array<iDataSelect>();
      //    response.data.data.map((produtos:any) => {
      //      let rowProd: iDataSelect = {};
      //      rowProd.value = String(produtos.id);
      //      rowProd.label = produtos.descricao;
         
      //       options.push(rowProd);
      //      setEmpresaSelect(options);
      //    console.log("empresa",empresaSelect)
      //    })
      //  }
    
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
  //========get select empresa ====================================
  async function GetTabelaPreco() {
    setFilter(false);
    
    await api
    
      .get(`/api/Tabela_de_Preco?pagina=1&totalpagina=999`)
      .then((response) => {
      //  console.log("grupo",response.data.data)
        
        if (response.data.data.length > 0) {
         let options:Array<iDataSelect>=new Array<iDataSelect>();
         response.data.data.map((produtos:any) => {
           let rowProd: iDataSelect = {};
           rowProd.value = String(produtos.id);
           rowProd.label = String(produtos.id)+ " - " + produtos.descricao;
         
            options.push(rowProd);
           setTabelaSelect(options);
           console.log("tabela",tabelaSelect)
         })
       }
    
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
  //========get select produtos concorrentes====================================
  // async function GetParceiros() {
  //   setFilter(false);
    
  //   await api
    
  //     .get(`/api/Produtos_Concorrentes?pagina=1&totalpagina=999`)
  //     .then((response) => {
  //      // console.log("grupo",response.data.data)
  //      if (response.data.data.length > 0) {
  //       let optionsprod:Array<iDataSelect>=new Array<iDataSelect>();
  //       response.data.data.map((produtos:any) => {
  //         let rowProd: iDataSelect = {};
  //         rowProd.value = String(produtos.codProduto);
  //         rowProd.label = produtos.nomeProduto;
         
  //          optionsprod.push(rowProd);
  //         setProdutoPesquisa(optionsprod);
  //      //  console.log("teste",produtoPesquisa)
  //       })
  //     }
  //      if (response.data.data.length > 0) {
  //       let options:Array<iDataSelect>=new Array<iDataSelect>();
  //       response.data.data.map((concorrentes:any) => {
  //         let rowConcorrente: iDataSelect = {};
  //         rowConcorrente.value = String(concorrentes.id);
  //         rowConcorrente.label = concorrentes.nomeProdutoSimilar;
         
  //          options.push(rowConcorrente);
  //         setConcorrentePesquisa(options);
  //      //  console.log("teste",concorrentePesquisa)
  //       })
  //     }

    
  //     })
  //     .catch((error) => {
  //       console.log("Ocorreu um erro");
  //     });
     
  // }
 

  //============================================================================

  async function GetTabela() {
    setFilter(false);
    await api
    
      .get(`/api/Tabela_de_Preco_Cliente?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setTabela(response.data.data);
        tabela=response.data.data;
        console.log('get',response.data.data)
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        // setTotalPaginas(response.data.total / qtdePagina);
     //  console.log('total de paginas',totalPaginas);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

  async function GetTabelaFilter() {
    setFilter(true);
    console.log('entrou produto')
    await api
      .get(`/api/Tabela_de_Preco_Cliente?pagina=${pagina}&totalpagina=999&filter=${search}`)
      .then((response) => {
        setTabela(response.data.data);
        tabela=response.data.data;
       // setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
      //  setUsuariosFilter(response.data);
      //  usuariosFilter=response.data;
      // console.log('usuarios pesquisa',response.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

  // async function GetTabelaConcorrente() {
  //   console.log('entrou')
  //   await api
  //     .get(`/api/Tabela_de_Preco_Cliente?pagina=${pagina}&totalpagina=999&filter=${search}`)
  //     .then((response) => {
  //       setTabela(response.data.data);
  //       tabela=response.data.data;
  //      // setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
  //     //  setUsuariosFilter(response.data);
  //     //  usuariosFilter=response.data;
  //      console.log('conc pesquisa',tabela);
  //     setConcorrentefilter(false);
  //     concorrentefilter=false;
  //     })
  //     .catch((error) => {
  //       console.log("Ocorreu um erro");
  //       setConcorrentefilter(false);
  //       concorrentefilter=false;
  //     });
     
  // }
 
  
    //=========== get produto por ID ==================================//
  async function GetTabelaId(id:any) {
    setId(0);
    setCodEmpresa('');
    setCodParceiro('');
    setCodTabelaPreco('');
    setNomeParceiro('');
    setNomeTabela('');
    setCodProdutoConcorrente('');
    setNomeConcorrente('');
    setNomeProdutoSimilar('');
   
    setEdit(true);
    setShowEdit(true);
    
    await api
      .get(`/api/Tabela_de_Preco_Cliente/${id}`)
      .then((response) => {
          //setUsuariosget(response.data)
          console.log("tabela id",response.data)
          let banco: iDataSelect = { value: response.data.idGrupo, label: response.data.nomeGrupo}
          
          setCodEmpresa(response.data.codEmpresa);
          setCodParceiro(response.data.codParceiro);
          setCodTabelaPreco(response.data.codTabelaPreco);
          setNomeParceiro(response.data.codParceiro+" - "+response.data.parceiros.nome);
          setNomeTabela(response.data.codTabelaPreco+" - "+response.data.tabelaPreco.descricao);
          setSelectGrupoBanco(banco)
          setId(response.data.id);
          setCodProduto(response.data.codProduto);
          setCodConcorrente(response.data.codConcorrente);
          setNomeConcorrente(response.data.nomeConcorrente);
          setNomeProduto(response.data.nomeProduto);
          setCodProdutoConcorrente(response.data.codProdutoConcorrente);
          setNomeProdutoSimilar(response.data.nomeProdutoSimilar);

      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar produto ===============================//
  async function EditeTabela(){
    setLoadingUpdate(true)
  await api.put(`/api/Tabela_de_Preco_Cliente/${id}`, {
  id: id,
  codEmpresa:Number(codEmpresa),
  codParceiro: Number(codParceiro),
  codTabelaPreco: Number(codTabelaPreco),
  })
    .then(response => {
      handleCloseEdit()
     // GetProdutosAcount();
      GetTabela();
     // GetProdutoSimiliar();
      setLoadingUpdate(false)
     // console.log('resposta', response)
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Tabela de cliente atualizada com sucesso.");
      setLimpando(false)
    })
    .catch((error) => {

      setLimpando(false)
      setLoadingUpdate(false)
      handleCloseEdit()
      window.scrollTo(0, 0);
      handleShowMensage()
      setAlertErroMensage(true);
    const { data } = error.response;
   // setMsgErro(data.message);
   setMsgErro(error.response.data);
     
      return;
    });
  }
    //============ Criar produto ===============================//
    async function CreateTabela(){

       if(codEmpresa==''||codEmpresa==undefined){
         let senhaconf: any;
         senhaconf = document.getElementById("prinome");
         document.getElementById("prinome")?.focus();
         setAlertErroRegister(true);
         setMsgErro("É obrigatório informar a empresa.");
       return
       }

       if(codParceiro==''||codParceiro==undefined){
        let senhaconf: any;
        senhaconf = document.getElementById("prinome");
        document.getElementById("prinome")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o Parceiro.");
      return
      }
      
      if(codTabelaPreco==''||codTabelaPreco==undefined){
        let senhaconf: any;
        senhaconf = document.getElementById("prinome");
        document.getElementById("prinome")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar a tabela de preço.");
      return
      }
    
  setLoadingCreate(true)
  await api.post("/api/Tabela_de_Preco_Cliente",{
    codEmpresa:Number(codEmpresa),
    codParceiro: Number(codParceiro),
    codTabelaPreco: Number(codTabelaPreco),
       })
       
        .then(response => {
          setLoadingCreate(false)
         // GetProdutosAcount();
          GetTabela();
        //  GetProdutoSimiliar();
          handleClose ();
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro("Tabela de cliente cadastrada com sucesso.");
        })
        .catch((error) => {
          setAlertErroMensage(true);
          setLoadingCreate(false)
          window.scrollTo(0, 0);
          console.log(error.response)
          handleShowMensage()
          setAlertErroMensage(true);
          const  data  = error.response.data;
         //setMsgErro(data);
         setMsgErro(error.response.data);
        //  setIdGrupo('');
        //  setNome('');
        //  setCodigo('');
        //  setNomeGrupo('');
       
          return;
        });
      }
      //==== EXCLUIR PRODUTO ======================================
      async function DeleteTabela(id: any){
        setLoadingUpdate(true)
      await api.delete(`/api/Tabela_de_Preco_Cliente/${id}`)
        .then(response => {
          handleCloseEdit()
          GetTabela();
         // GetProdutoSimiliar();
          setLoadingUpdate(false)
          handleShowMensage()
          setAlertErroMensage(true);
          setMsgErro("Tabela excluída com sucesso.");
        })
        .catch((error) => {
          setLoadingUpdate(false)
          handleCloseEdit()
          window.scrollTo(0, 0);
          handleShowMensage()
          setAlertErroMensage(true);
         
        const { data } = error.response;
        setMsgErro(error.response.data);
         
         
          return;
        });
      }
    //==========================================================//
    function ShowModalEdit(){
      setShowEdit(true);
    }
function LimparPesquisa(){
  setSearch('');
  setConcorrentefilter(false);
  concorrentefilter=false;
  setSearchStatus('');
  setPagina(1);
  PesquisaProduto();
  setFilter(false);
  GetTabela();
  GetParceiros();
  //GetProdutoSimiliar();
}

function PesquisaProduto(){
  setSearch('');
  setConcorrentefilter(false);
  concorrentefilter=false;
  GetTabela();
  setPesquisaProduto(true);
  setPesquisaConcorrente(false);
  setPesquisaSimilar(false);
  let pesquisar: any;
  pesquisar = document.getElementById("nomePesquisa");
  document.getElementById("nomePesquisa")?.focus();

}
 
function PesquisaConcorrente(){
  setSearch('');
 
  setConcorrentefilter(true);
  concorrentefilter=true;
  GetTabela();
  setPesquisaProduto(false);
  setPesquisaConcorrente(true);
  setPesquisaSimilar(false);
  let pesquisa: any;
  pesquisa = document.getElementById("grupoPesquisa");
  document.getElementById("grupoPesquisa")?.focus();
  console.log('filtrar por',concorrentefilter)
}
function PesquisaSimilar(){
  setSearch('');
  setConcorrentefilter(false);
  concorrentefilter=false;
  GetTabela();
  setPesquisaProduto(false);
  setPesquisaConcorrente(false);
  setPesquisaSimilar(true);
  let pesquisa: any;
  pesquisa = document.getElementById("grupoPesquisa");
  document.getElementById("grupoPesquisa")?.focus();
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
            <h1>Tabela de Preço Cliente</h1>
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
              <div className='logo-cadastro-tabela-cliente'></div>
          <div className='conteudo'>
            <div style={{height:60}} className='div-button-top'>
              {/* <div className='pesBloco'>
                <div className='title-pesBloco'>
                <span style={{fontSize:14}}>Pesquisar por:</span>
                </div>
                <div className='d-flex'>
                  <input  name='pesquisa' type="radio" checked={pesquisaProduto}  onChange={PesquisaProduto} /><p style={{fontSize:13,marginLeft:8}} >Produto</p>
                   <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaConcorrente}  onChange={PesquisaConcorrente} /><p style={{fontSize:13,marginLeft:8}} >Concorrente</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaSimilar}  onChange={PesquisaSimilar} /><p style={{fontSize:13,marginLeft:8}} >Produto Similar</p>
                  </div>
              </div> */}
          <OverlayTrigger
          placement={"top"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Novo Produto</Tooltip>}
        >
      <button className='btn btn-dark btn-direito'  onClick={handleShow}>
        Novo <TfiNewWindow style={{marginLeft: 8,marginBottom:5}}/>
      </button>
      </OverlayTrigger>
      </div>
            {/* <div style={{marginTop:10, width:"100%"}} className='conteudo-botoes'>
              <div className='bloco-pesquisa-input'>
             {pesquisaProduto?(<>
              <div>
              <p className="title-input"  >Pesquisar por produto: </p>
         
                     <Select 
                     id="grupoPesquisa"  
                     className="select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum produto encontrado"}
                   //  value={search} 
                     options={produtoPesquisa}  
                      onChange={(value: any)=>{ 
                        setSearch(value.label); 
                        console.log('Select',value)          
                      }} 
                    />
            </div>
             </>):(<></>)}
             {pesquisaConcorrente?(<>
              <div>
              <p className="title-input"  >Pesquisar por concorrente: </p>
              <Select 
                     id="grupoPesquisa"  
                     className="select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum concorrente encontrado"}
                   //  value={search} 
                     options={concorrentePesq}  
                      onChange={(value: any)=>{ 
                        setSearch(value.label);
                        setConcorrentefilter(true) 
                        concorrentefilter=true
                        console.log('Select',value)          
                      }} 
                    />
            </div>
             </>):(<></>)}
              {pesquisaSimilar?(<>
                <div className=''>
            <p className="title-input"  >Pesquisar por produto similar: </p>
         
                     <Select 
                     id="grupoPesquisa"  
                     className="select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum concorrente encontrado"}
                   //  value={search} 
                     options={concorrentePesquisa}  
                      onChange={(value: any)=>{ 
                        setSearch(value.label); 
                        console.log('Select',value)          
                      }} 
                    />
                    </div>
              </>):(<></>)}
              </div>

                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas btn-pesquisar'onClick={()=>{setPagina(1);
                      if(concorrentefilter){
                        GetTabelaConcorrente();
                      }else{
                        GetTabelaFilter();
                      }
                      
                      }}>Pesquisar<FaSearchPlus style={{marginLeft: 6}} fontSize={17}/></button>
                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas' onClick={LimparPesquisa}>Limpar<AiOutlineClear style={{marginLeft: 6}} fontSize={20}/></button>
                   
                    </div> */}
          
          <div className="table-responsive table-scroll tabela-responsiva">
      <div className=' table-wrap'>
      <Table responsive className='table-global table  main-table'>
      <thead>
      <tr className="tituloTab">
        <th style={{textAlign:'center'}} className="th1 div-cod-prod">Cód Tabela </th>
          <th className="th1 Nome-complet">Tipo Empresa</th>
          <th  className="th2 div-cod-prod">Parceiro</th>
          <th className="th2 div-cod-prod">Tabela de Preço</th>
          <th style={{color:"transparent"}} className="th3">....</th>
         
          <th  className="th4">.</th>
          <th style={{textAlign:'center'}} className="th4 fixed-table">Ações</th>
      </tr>
      </thead>
      <tbody>
      {tabela.length > 0 ? (
                        <>
      {tabela.map((tabela,index)=> (
        <tr key={index}>

           <td className='div-cod-prod'  style={{textAlign:'center'}}>{tabela.id}</td>
         <td  className='Nome-complet'>{tabela.codEmpresa==1?'INDUSTRIA':'DISTRIBUIDORA'}</td> 
          <td className='div-cod-prod'  style={{textAlign:'center'}}>{tabela.parceiros.nome}</td>
          <td className='Nome-complet'>{tabela.tabelaPreco.descricao}</td> 
           
            <td style={{color: "transparent"}} >.............</td>
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
                GetTabelaId(tabela.id);
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
                DeleteTabela(tabela.id);}}
              className='btn btn-table btn-delete'>
                <RiDeleteBin5Line/>
              </button>
              </OverlayTrigger> 
              </td>
        </tr>
        ))}
        </> 
        ): (
                        
          <div style={{margin:"auto"}} className="alert alert-warning alerta-prod" role="alert">
            Nenhuma tabela de cliente encontrada.
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

      <Modal className='modal-cadastro-prod' show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <h1>Cadastrar Tabela de Cliente </h1>
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
            
            <div  className='bloco-input bloco-prod'>
            <p className="title-input"  >Tipo de Empresa:<span style={{color:'red'}}>*</span></p>
            <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
             value={codEmpresa}
              onChange={(e) => {setCodEmpresa(e.target.value); LimparTodos();}}
                        >
                          <option value=''></option>
                          {empresaSelect.map((empresa)=>
                            <option value={empresa.id}>{empresa.descricao}</option>
                            )}
                        
                        
                    </select>
            </div>
          
            </div>

            <div style={{flexDirection:"column"}} className='coluna-dupla'>
            <div  className='bloco-input'>
            <p id="grupos" className=" title-input"  >Parceiro: <span style={{color:'red'}}>*</span></p>

                     <Select 
                     id='parceiro'
                     className=" select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum concorrente encontrado"}
                   //  value={search} 
                     options={parceiroSelect}  
                      onChange={(value: any)=>{ 
                        setCodParceiro(value.value); 
                        LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> 
                  
            </div>
            <div  className='bloco-input'>
            <p id="grupos" className=" title-input"  >Tabela de Preço: <span style={{color:'red'}}>*</span></p>

                     <Select 
                     id='tabelaPreco'
                     className=" select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={tabelaSelect}  
                      onChange={(value: any)=>{ 
                        setCodTabelaPreco(value.value); 
                       LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> 
                  
            
                    <button disabled={loadingCreate} id='btn-cad-prod' className='btn btn-cadastrar'onClick={CreateTabela}>Cadastrar</button>
            </div>
                    
                    </div> 
            
                  
            </div>
            </>    )}
        </Modal.Body>
      
      </Modal>
      {/* ================Modal Edit ============================================== */}

      <Modal className='modal-cadastro-prod' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Dados da Tabela Cliente</h1>
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
            
            <div  className='bloco-input bloco-prod'>
            <p className="title-input"  >Tipo de Empresa:<span style={{color:'red'}}>*</span></p>
            <select className="form-select select campo-select" 
            aria-label="Escolha o número de quartos" 
             value={codEmpresa}
              onChange={(e) => {setCodEmpresa(e.target.value); LimparTodos();}}
                        >
                          <option value=''></option>
                          {empresaSelect.map((empresa)=>
                            <option value={empresa.id}>{empresa.descricao}</option>
                            )}
                        
                        
                    </select>
            </div>
          
            </div>

            <div style={{flexDirection:"column"}} className='coluna-dupla'>
            <div  className='bloco-input'>
            <p id="grupos" className=" title-input"  >Parceiro: <span style={{color:'red'}}>*</span></p>

                     <Select 
                     id='parceiro'
                     className=" select-comp" 
                     placeholder={nomeParceiro}
                  noOptionsMessage={() => "Nenhum concorrente encontrado"}
                   //  value={search} 
                     options={parceiroSelect}  
                      onChange={(value: any)=>{ 
                        setCodParceiro(value.value); 
                        LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> 
                  
            </div>
            <div  className='bloco-input'>
            <p id="grupos" className=" title-input"  >Tabela de Preço: <span style={{color:'red'}}>*</span></p>

                     <Select 
                     id='tabelaPreco'
                     className=" select-comp" 
                     placeholder={nomeTabela}
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={tabelaSelect}  
                      onChange={(value: any)=>{ 
                        setCodTabelaPreco(value.value); 
                       LimparTodos();
                        console.log('Select',value)          
                      }} 
                    /> 
                  
            
            </div>
                    
                    </div>
            
           
            
                    <div className='coluna-dupla'>
            <div  className='bloco-input boco-botoes-grupo'>
            <button disabled={loadingUpdate} id='btn-desc' className='btn btn-cadastrar 'onClick={EditeTabela}>Editar</button>
            <button disabled={loadingUpdate}  id='btn-desc' className='btn btn-cancelar 'onClick={handleCloseEdit}>Cancelar</button>
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
