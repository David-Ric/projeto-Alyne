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
import { IItemTabelaPreco, ITabelaPreco, iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from "../../components/Paginacao";
import { phoneMask, moeda,moedaFloat } from '../../Masks/Masks';
import { FaEye, FaSearchPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { iDadosUsuario, iDataSelect, iProdutos } from '../../@types';
import Select from 'react-select';



export default function TabelaPreco() {
  const history = useNavigate();


//===== states tabela de preço ================================================
const [idTabelaPreco, setIdTabelaPreco] = useState(0);
const [codigoTabela, setCodigoTabela] = useState("");
const [codigo, setCodigo] = useState("");
const [dataInicial, setDataInicial] = useState("");
const [dataFinal, setDataFinal] = useState("");
let [idProduto, setIdProduto] = useState("");
let [idProdutoEdit, setIdProdutoEdit] = useState("");
const [preco, setPreco] = useState("");
const [descricao, setDescricao] = useState("");

//=============================================================================

  const [nome, setNome] = useState('');
  const [idGrupo, setIdGrupo] = useState('');
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState('');

 
  let [tabelaPreco, setTabelaPreco] = useState<ITabelaPreco[]>([]);

  let [itensTabela, setItensTabela] = useState<IItemTabelaPreco[]>([]);
  const [limpando, setLimpando] = useState(false);
  const [editarTabela, setEditarTabela] = useState(false);

  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);
  const [alertErroCadastroItem, setAlertErroCadastroItem] = useState(false);
  const [alertErroEditItem, setAlertErroEditItem] = useState(false);
  
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);
  const [showCadastroItem, setShowCadastroItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);


  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
 
  let [totalPaginas, setTotalPaginas] = useState(0);

   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const handleCloseCadastroItem = () => setShowCadastroItem(false);
   const handleCloseEditItem = () => setShowEditItem(false);

   const [loading, setLoading] = useState(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   const [searchStatus, setSearchStatus] = useState('');
   const [filter, setFilter] = useState(false);
   let [filterGrupo, setFiltergrupo] = useState(false);
   

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);

   const [grupoPesquisa, setGrupoPesquisa] = useState<iDataSelect[]>([]);
   const [grupoPesq, setGrupoPesq] = useState<iDataSelect[]>([]);

   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaCod, setPesquisaCod] = useState(false);
   const [pesquisaGrupo, setPesquisaGrupo] = useState(false);
   const [produtoCadastro, setProdutoCadastro] = useState<iDataSelect[]>([]);

   let [selectGrupoBanco, setSelectGrupoBanco] = useState<iDataSelect>();

   let [prodExist, setProdExist] = useState(false);


   let [idItemEdit, setIdItemEdit] = useState(0);

   const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  // const handleShow = () => setShow(true);
  useEffect(() => { 
    logado()
   // GettabelaPrecoAcount();
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
 //   GetGrupoPesquisa();
 //   GetGrupos() 
   // if(!filter){
    GetProdutos();
      GettabelaPreco();
   // }else{
     // GettabelaPrecoFilter();
   // }
    
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
  setAlertErroCadastroItem(false);
  setAlertErroEditItem(false);
 }
  function handleShow(){
    setIdTabelaPreco(0);
    setCodigo("");
    setDescricao("");
    setDataInicial("");
    setDataFinal("");
    setIdProduto("");
    setPreco("");
    setShow(true);
  }
  function handleShowCadastroItem(){
    setAlertErroMensage(false);
    setAlertErroRegister(false);
    setAlertErroCadastroItem(false);
    setAlertErroEditItem(false);
    setShowCadastroItem(true);
  }
 



  async function GetProdutos() {
    setFilter(false);
    
    await api
    
      .get(`/api/Produtos?pagina=1&totalpagina=999`)
      .then((response) => {
      //  console.log("grupo",response.data.data)
        
        if (response.data.data.length > 0) {
         let options:Array<iDataSelect>=new Array<iDataSelect>();
         response.data.data.map((produtos:any) => {
           let rowProd: iDataSelect = {};
           rowProd.value = String(produtos.id);
           rowProd.label = produtos.nome;
         
            options.push(rowProd);
           setProdutoCadastro(options);
        //  console.log("teste",produtoPesquisa)
         })
       }
    
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

  async function GettabelaPreco() {
    setFilter(false);
    await api
    
      .get(`/api/Tabela_de_Preco?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setTabelaPreco(response.data.data);
     //   console.log('dados',response.data);
        tabelaPreco=response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        // setTotalPaginas(response.data.total / qtdePagina);
     //  console.log('total de paginas',totalPaginas);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

//   async function GettabelaPrecoFilter() {
//     setFilter(true);
//     await api
//       .get(`/api/Tabela_de_Preco/filter?pagina=${pagina}&totalpagina=999&filter=${search}`)
//       .then((response) => {
//         setTabelaPreco(response.data.data);
//         tabelaPreco=response.data.data;
//        // setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
//       //  setUsuariosFilter(response.data);
//       //  usuariosFilter=response.data;
//        console.log('usuarios pesquisa',response.data);
//       })
//       .catch((error) => {
//         console.log("Ocorreu um erro");
//       });
     
//   }
function VerificaProduto(){
    console.log('tabela',itensTabela)
   
    
 }

//=============get edite item =====================================//
async function GetitensEditId(idIt: any ) {
   
    handleCloseCadastroItem();
    setEdit(true);
    setShowEditItem(true);
    
    await api
      .get(`/api/Item_Tabela_Preco/${idIt}`)
      .then((response) => {
         
       //  console.log("valor", response.data)
          setPreco(response.data.preco)
          setIdProdutoEdit(response.data.idProd);
          idProdutoEdit=response.data.idProd
          setIdItemEdit(response.data.id);
          idItemEdit=response.data.id;
        //  console.log('id',idItemEdit)
        //  console.log('codprod',idProduto)
        //  console.log('id tabela de',idTabelaPreco)
         
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
//=================================================================//

async function GetitensId() {
   
    handleCloseCadastroItem();
    setEdit(true);
    setShowEdit(true);
    
    await api
      .get(`/api/Tabela_de_Preco/${idTabelaPreco}`)
      .then((response) => {
          //setUsuariosget(response.data)
        //  console.log('itens da tabela',response.data)
          setGrupoSelecionado(response.data.nomeGrupo)
          setItensTabela(response.data.itemTabela)
          itensTabela=response.data.itemTabela
       //   console.log('item',itensTabela)
          //let banco: iDataSelect = { value: response.data.idGrupo, label: response.data.nomeGrupo}
      //  setSelectGrupoBanco(banco)
      setIdTabelaPreco(response.data.id)
      setCodigo(response.data.codigo)
      const res = response.data;
       
        if (res.dataInicial) {
          const dtInicial = res.dataInicial
            ? res.dataInicial.substring(
              0,
              (res.dataInicial + " ").indexOf("T")
            )
            : null;

            setDataInicial(dtInicial);
        }
        if (res.dataFinal) {
            const dtFinal = res.dataFinal
              ? res.dataFinal.substring(
                0,
                (res.dataInicial + " ").indexOf("T")
              )
              : null;
  
              setDataFinal(dtFinal);
          }

      setIdProduto(response.data.idProduto)
      setPreco(response.data.preco)
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  
    //=========== get tabela de preço por ID ==================================//
  async function GetTabelaPrecoId(id:any) {
    setIdTabelaPreco(0);
    setCodigo("");
    setDataInicial("");
    setDataFinal("");
    setIdProduto("");
    setPreco("");
   
    setEdit(true);
    setShowEdit(true);
    
    await api
      .get(`/api/Tabela_de_Preco/${id}`)
      .then((response) => {
          //setUsuariosget(response.data)
       //   console.log('itens da tabela',response.data)
          setGrupoSelecionado(response.data.nomeGrupo)
          setItensTabela(response.data.itemTabela)
          itensTabela=response.data.itemTabela
       //   console.log('item',itensTabela)
          //let banco: iDataSelect = { value: response.data.idGrupo, label: response.data.nomeGrupo}
      //  setSelectGrupoBanco(banco)
      setIdTabelaPreco(response.data.id)
      setDescricao(response.data.descricao)
      setCodigo(response.data.codigo)
      const res = response.data;
       
        if (res.dataInicial) {
          const dtInicial = res.dataInicial
            ? res.dataInicial.substring(
              0,
              (res.dataInicial + " ").indexOf("T")
            )
            : null;

            setDataInicial(dtInicial);
        }
        if (res.dataFinal) {
            const dtFinal = res.dataFinal
              ? res.dataFinal.substring(
                0,
                (res.dataInicial + " ").indexOf("T")
              )
              : null;
  
              setDataFinal(dtFinal);
          }

      setIdProduto(response.data.idProduto)
      setPreco(response.data.preco)
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar tabela de preço ===============================//
  async function EditeTabelaPreco(){
    setLoadingUpdate(true)
    setEditarTabela(true)
  await api.put(`/api/Tabela_de_Preco/${idTabelaPreco}`, {
        id: idTabelaPreco,
        codigo: Number(codigo),
        descricao:descricao,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
  })
    .then(response => {
     // handleCloseEdit();
     // GettabelaPrecoAcount();
      GettabelaPreco();
    //  GetGrupoPesquisa();
      setLoadingUpdate(false)
     // console.log('resposta', response)
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Tabela de preço atualizada com sucesso.");
      setLimpando(false);
      setEditarTabela(false);
    })
    .catch((error) => {

      setLimpando(false)
      setLoadingUpdate(false)
     // handleCloseEdit()
      window.scrollTo(0, 0);
      handleShowMensage()
      setEditarTabela(false);
      setAlertErroMensage(true);
    const { data } = error.response;
   // setMsgErro(data.message);
   setMsgErro(error.response.data);
     
      return;
    });
  }
  //============ Editar item ===================================================//
  async function EditarItem(){
   
    if(preco==undefined ||preco=='' ){
      let senhaconf: any;
      senhaconf = document.getElementById("precoEdit");
      document.getElementById("precoEdit")?.focus();
      setAlertErroEditItem(true);
      setMsgErro("É obrigatório informar o valor do produto.");
    return
    }
    
    
      await api.put(`/api/Item_Tabela_Preco/${idItemEdit}`, {
        id: idItemEdit,
        idTabelaPreco: idTabelaPreco,
        idProd: idProdutoEdit,
        preco: Number(parseFloat(moedaFloat(String(preco))))
    })
      .then(response => {
        setShowEditItem(false);
        GettabelaPreco();
        setLoadingUpdate(false)
        handleShowMensage()
        setAlertErroMensage(true);
        setMsgErro("Item Editado com sucesso.");
        setLimpando(false);
        setEditarTabela(false);
        GetitensId();
      })
      .catch((error) => {
        setLimpando(false)
        setLoadingUpdate(false)
        window.scrollTo(0, 0);
        handleShowMensage()
        setEditarTabela(false);
        setAlertErroMensage(true);
      const { data } = error.response;
     setMsgErro(error.response.data);
     setShowEditItem(false);
        return;
      });
     
    }
  //============ Adicionar itens tabela de preço ===============================//
  async function AddItemTabelaPreco(){
    console.log("idProd",idProduto)
  //  setLoadingUpdate(true)
   // setEditarTabela(true)
   setProdExist(true);
   prodExist=true;
   if(idProduto==undefined){
    let senhaconf: any;
    senhaconf = document.getElementById("codigo");
    document.getElementById("codigo")?.focus();
    setAlertErroCadastroItem(true);
    setMsgErro("É obrigatório informar o produto.");
  return
  }
  if(preco==undefined){
    let senhaconf: any;
    senhaconf = document.getElementById("preco");
    document.getElementById("preco")?.focus();
    setAlertErroCadastroItem(true);
    setMsgErro("É obrigatório informar o valor do produto.");
  return
  }
   itensTabela.filter((produto)=>{
    if(produto.idProd == Number(idProduto)){
       // handleShowCadastroItem()
       setAlertErroCadastroItem(true);
        setMsgErro("Produto já existente nesta tabela");
        setProdExist(false);
        prodExist=false;
    }
})
  if(prodExist){
    await api.put(`/api/Tabela_de_Preco/${idTabelaPreco}`, {
        id: idTabelaPreco,
        codigo: Number(codigo),
        descricao:descricao,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
        itemTabela: [
          {
            idTabelaPreco: idTabelaPreco,
            idProd: Number(idProduto),
            preco: Number(parseFloat(moedaFloat(String(preco))))
          }
        ]
  })
    .then(response => {
      GettabelaPreco();
      setLoadingUpdate(false)
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Item adicionado com sucesso.");
      setLimpando(false);
      setEditarTabela(false);
      GetitensId();
    })
    .catch((error) => {
      setLimpando(false)
      setLoadingUpdate(false)
      window.scrollTo(0, 0);
      handleShowMensage()
      setEditarTabela(false);
      setAlertErroMensage(true);
    const { data } = error.response;
   setMsgErro(error.response.data);
    
      return;
    });
  }
   
  }
    //============ Criar tabela de preço ===============================//
    async function CreateTabelaPreco(){

      if(codigo==''){
        let senhaconf: any;
        senhaconf = document.getElementById("codigo");
        document.getElementById("codigo")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar o código da tabela de preço.");
      return
      }

      if(dataInicial==''){
        let senhaconf: any;
        senhaconf = document.getElementById("dataInicial");
        document.getElementById("dataInicial")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar a data inicial");
      return
      }
      if(dataFinal==''){
        let senhaconf: any;
        senhaconf = document.getElementById("dataFinal");
        document.getElementById("dataFinal")?.focus();
        setAlertErroRegister(true);
        setMsgErro("É obrigatório informar a data final");
      return
      }
    
  setLoadingCreate(true)
  await api.post("/api/Tabela_de_Preco",{
        codigo: Number(codigo),
        descricao:descricao,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
       })
       
        .then(response => {
          setLoadingCreate(false)
         // GettabelaPrecoAcount();
          GettabelaPreco();
       //   GetGrupoPesquisa();
          handleClose ();
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro("Tabela de preço cadastrada com sucesso.");
        })
        .catch((error) => {
          setAlertErroMensage(true);
          setLoadingCreate(false)
          window.scrollTo(0, 0);
          console.log(error.response)
          handleShowMensage()
          setAlertErroMensage(true);
          const  data  = error.response.data;
         setMsgErro(data);
        //  setIdGrupo('');
        //  setNome('');
        //  setCodigo('');
        //  setNomeGrupo('');
       
          return;
        });
      }
      //==== EXCLUIR PRODUTO ======================================
      async function DeleteItem(id: any){
        setLoadingUpdate(true)
      await api.delete(`/api/Item_Tabela_Preco/${id}`)
        .then(response => {
       //   handleCloseEdit()
          GettabelaPreco();
          GetitensId();
      //    GetGrupoPesquisa();
          setLoadingUpdate(false)
          handleShowMensage()
          setAlertErroMensage(true);
          setMsgErro("Item excluído com sucesso.");
        })
        .catch((error) => {
          setLoadingUpdate(false)
          GetitensId();
          //handleCloseEdit()
          window.scrollTo(0, 0);
          handleShowMensage()
          setAlertErroMensage(true);
         
        const { data } = error.response;
        setMsgErro(data.message);
         
         
          return;
        });
      }
    //==========================================================//
    function ShowModalEdit(){
      setShowEdit(true);
    }
function LimparPesquisa(){
  setFiltergrupo(false);
  filterGrupo=false; 
  setSearch('');
  setSearchStatus('');
  setPagina(1);
  PesquisaNome();
  setFilter(false);
  GettabelaPreco();
}

function PesquisaNome(){
  setSearch('');
  GettabelaPreco();
  setPesquisaNome(true);
  setPesquisaGrupo(false);
  setPesquisaCod(false);
  let pesquisar: any;
  pesquisar = document.getElementById("nomePesquisa");
  document.getElementById("nomePesquisa")?.focus();
}
 
function PesquisaGrupo(){
  setSearch('');
  GettabelaPreco();
  setPesquisaNome(false);
  setPesquisaCod(false);
  setPesquisaGrupo(true);
  let pesquisa: any;
  pesquisa = document.getElementById("grupoPesquisa");
  document.getElementById("grupoPesquisa")?.focus();
}
function PesquisaCod(){
  setSearch('');
  GettabelaPreco();
  setPesquisaNome(false);
  setPesquisaGrupo(false);
  setPesquisaCod(true);
  let pesquisa: any;
  pesquisa = document.getElementById("codPesquisa");
  document.getElementById("codPesquisa")?.focus();
}
const formataData = (date:string) => {
    const dataFormate = date.split('T', 1);
    const newDate = dataFormate[0];
    const d = newDate.split('-');
    const data =  `${d[2]}.${d[1]}.${d[0]}`;
   return data
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
            <h1>TABELA DE PREÇO</h1>
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
              <div className='logo-cadastro-tabelaPreco'></div>
          <div className='conteudo'>
            <div style={{height:60}} className='div-button-top'>
              {/* <div className='pesBloco'>
                <div className='title-pesBloco'>
                <span style={{fontSize:14}}>Pesquisar por:</span>
                </div>
                <div className='d-flex'>
                  <input  name='pesquisa' type="radio" checked={pesquisaNome}  onChange={PesquisaNome} /><p style={{fontSize:13,marginLeft:8}} >Descrição</p>
                  {/* <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaCod}  onChange={PesquisaCod} /><p style={{fontSize:13,marginLeft:8}} >Código</p> 
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaGrupo}  onChange={PesquisaGrupo} /><p style={{fontSize:13,marginLeft:8}} >Grupo</p>
                  </div>
              </div> */}
          <OverlayTrigger
          placement={"top"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Nova Tabela de Preço</Tooltip>}
        >
      <button className='btn btn-dark btn-direito'  onClick={handleShow}>
        Novo <TfiNewWindow style={{marginLeft: 8,marginBottom:5}}/>
      </button>
      </OverlayTrigger>
      </div>
            {/* <div style={{marginTop:10, width:"100%"}} className='conteudo-botoes'>
              <div className='bloco-pesquisa-input'>
             {pesquisaNome?(<>
              <div>
              <p className="title-input"  >Pesquisar por Descrição: </p>
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
             {pesquisaCod?(<>
              <div>
              <p className="title-input"  >Pesquisar por código: </p>
            <input  id="codPesquisa"  
            type="text" 
            className='form-control inputcod' 
             name=""
             value={search}
             onChange={(e)=>{
              setFiltergrupo(false);
              filterGrupo=false; 
              setSearch(e.target.value);
              
            }}
              />
            </div>
             </>):(<></>)}
              {pesquisaGrupo?(<>
                <div className='div-pesquisa-status'>
            <p className="title-input"  >Pesquisar por grupo: </p>
         
                     <Select 
                     id="grupoPesquisa"  
                     className="select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum status encontrado"}
                   //  value={search} 
                     options={grupoPesquisa}  
                      onChange={(value: any)=>{ 
                        setFiltergrupo(true);
                        filterGrupo=true;
                        setSearch(value.label); 
                        console.log('Select',value)          
                      }} 
                    />
                    </div>
              </>):(<></>)}
              </div>

                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas btn-pesquisar'onClick={()=>{setPagina(1);
                      if(filterGrupo){
                        GettabelaPrecoFilterGrupo()
                      }else{
                        GettabelaPrecoFilter()
                      }
                      
                      }}>Pesquisar<FaSearchPlus style={{marginLeft: 6}} fontSize={17}/></button>
                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas' onClick={LimparPesquisa}>Limpar<AiOutlineClear style={{marginLeft: 6}} fontSize={20}/></button>
                   
                    </div> */}
          
          <div className="table-responsive table-scroll tabela-responsiva">
      <div className=' table-wrap'>
      <Table responsive className='table-global table  main-table'>
      <thead>
      <tr className="tituloTab">
        <th style={{textAlign:'center'}} className="th1 div-cod-prod">Código</th>
        <th className="">Descrição</th>
          <th style={{textAlign:'center'}} className="">Data inicial</th>
          <th style={{textAlign:'center'}} className="th2 div-cod-prod">Data final</th>
         
         
          <th style={{color: "transparent"}}   className="th4">.</th>
          <th style={{textAlign:'center'}} className="th4 fixed-table">Ações</th>
      </tr>
      </thead>
      <tbody>
      {tabelaPreco.length > 0 ? (
                        <>
      {tabelaPreco.map((tabelaPreco,index)=> (
        <tr key={index}>
          {/* <td className='div-cod-prod' style={tabelaPreco.codigo== null || tabelaPreco.codigo==""?{color:"red",textAlign:'center'}:{textAlign:'center'}} >{tabelaPreco.codigo==null || tabelaPreco.codigo==""?"0000":tabelaPreco.codigo }</td> */}
          {/* <td className='div-cod-prod'  style={{textAlign:'center'}}>{tabelaPreco.id}</td> */}
         <td style={{textAlign:'center'}} className='divi-cod-prod'>{tabelaPreco.codigo}</td> 
         <td  className=''>{tabelaPreco.descricao}</td> 
          <td className=''>{formataData(tabelaPreco.dataInicial)}</td>
          <td className=''>{formataData(tabelaPreco.dataFinal)}</td> 
           
            <td style={{color: "transparent"}} >.............</td>
            <td style={{color: "transparent"}} >.............</td>
            <td style={{textAlign:'center'}} className="fixed-table td-fixo">
            
            <OverlayTrigger
              placement={"top"}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Visualizar Tabela</Tooltip>}
            >
              <button 
              className='btn btn-table btn-edit' 
              style={{marginRight:15,marginLeft:15}}
              onClick={()=>{
                GetTabelaPrecoId(tabelaPreco.id);
                ShowModalEdit();
                }}>
                <FaEye/>
              </button>
              </OverlayTrigger>


              {/* <OverlayTrigger
              placement={"top"}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Deletar</Tooltip>}
            >
              <button onClick={()=>{
                DeleteProduto(produtos.id);}}
              className='btn btn-table btn-delete'>
                <RiDeleteBin5Line/>
              </button>
              </OverlayTrigger>  */}
              </td>
        </tr>
        ))}
        </> 
        ): (
                        
          <div style={{margin:"auto"}} className="alert alert-warning alerta-prod" role="alert">
            Nenhuma tabela de preço encontrado.
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

      <Modal className='modal-cadastro-tabela' show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <h1>Cadastro de Tabela de Preço</h1>
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
            {/* <div id='codProd' className='bloco-input'>
            <p className="title-input"  >Código:</p>
              <input className='form-coontrol inputlogin' 
              id='cod'
              type="text"
              //name='user' 
              value={codigo}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCodigo(e.target.value);
                LimparTodos();
              }}
              />
            </div> */}
            <div   className='bloco-input bloco-data bloco-codTab'>
            <p className="title-input titulo-cod-tabelaPrice"  >Código:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='codigo'
              type="Text"
              //name='user' 
              value={codigo}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCodigo(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
            <div   className='bloco-input bloco-data'>
            <p className="title-input titulo-cod-tabelaPrice"  >Descrição:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='codigo'
              type="Text"
              //name='user' 
              value={descricao}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setDescricao(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div  className='bloco-input bloco-data'>
            <p className="title-input"  >Data Inicial:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='dataInicial'
              type="date"
              //name='user' 
              value={dataInicial}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setDataInicial(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div className='bloco-input bloco-data'>
            <p className="title-input"  >Data Final:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='dataFinal'
              type="date"
              //name='user' 
              value={dataFinal}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setDataFinal(e.target.value);
                LimparTodos();
              }}
              />
                
            </div>
 
                    <button disabled={loadingCreate} id='btn-cad-prod' className='btn btn-cadastrar'onClick={CreateTabelaPreco}>Cadastrar</button>        
            </div>
            </>    )}
        </Modal.Body>
      
      </Modal>
      {/* ================Modal Edit ============================================== */}

      <Modal className='modal-cadastro-tabela-edit' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Tabela de Preço</h1>
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
        <div className='bloco-tabelaPreco'>
        <div className='coluna-dupla'>
           <div>
            <div   className='cod-desc-Tabela'>
            <p style={{marginRight:20}} className="title-input titulo-cod-tabelaPrice"  >Código:<span style={{marginLeft: 5, color:"#000"}}>{codigo}</span> </p>
            <p className="title-input titulo-cod-tabelaPrice"  >Descrição: <span style={{marginLeft: 5,color:"#000"}}>{descricao}</span></p>
            
            </div>
          
           
              <div className='coluna-dupla'>
            <div  className=' bloco-data-edit'>
            <p className="title-input"  >Data Inicial:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='dataInicial'
              type="date"
              //name='user' 
              value={dataInicial}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setDataInicial(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div className=' bloco-data-edit'>
            <p className="title-input"  >Data Final:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='dataFinal'
              type="date"
              //name='user' 
              value={dataFinal}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setDataFinal(e.target.value);
                LimparTodos();
              }}
              />
                
            </div>
            </div>
            </div>
            <div className='bloco-acoes-tabelaPreco bloco-data-edit'>
            <button disabled={loadingUpdate} id='btn' className='btn btn-editartab'onClick={EditeTabelaPreco}>Editar Tabela <HiOutlinePencilSquare style={{marginLeft: 5,marginBottom:5}} fontSize={18}/></button>
            <button style={{marginTop:8}} disabled={loadingUpdate} id='btn' className='btn btn-novotab' onClick={handleShowCadastroItem}>Novo Ítem<TfiNewWindow style={{marginLeft: 8,marginBottom:5}} fontSize={17}/></button>
            </div>
            </div>
            </div>
            <div style={{paddingTop:0}}  className='bloco-tabelaPreco'>
            <div className="table-responsive table-scroll tabela-responsiva">
      <div className=' table-wrap'>
      <Table responsive className='table-global table  main-table'>
      <thead>
      <tr className="tituloTab">
        <th style={{textAlign:'center'}} className="th1 div-cod-prod">Cod Produto</th>
          <th className="th1 Nome-completo">Descrição</th>
          <th style={{textAlign:'center'}} className="th2 div-cod-prod">Preço</th>
         
         
          <th style={{color: "transparent"}} className="th4">.</th>
          <th style={{textAlign:'center'}} className="th4 fixed-table">Ações</th>
      </tr>
      </thead>
      <tbody>
      {itensTabela.length > 0 ? (
                        <>
      {itensTabela.map((itensTabela,index)=> (
        <tr key={index}>
          {/* <td className='div-cod-prod' style={tabelaPreco.codigo== null || tabelaPreco.codigo==""?{color:"red",textAlign:'center'}:{textAlign:'center'}} >{tabelaPreco.codigo==null || tabelaPreco.codigo==""?"0000":tabelaPreco.codigo }</td> */}
          {/* <td className='div-cod-prod'  style={{textAlign:'center'}}>{tabelaPreco.id}</td> */}
         <td style={{textAlign:'center'}} className='divi-cod-prod'>{itensTabela.idProd}</td> 
          <td className=''>{itensTabela.produtos.nome}</td>
          <td style={{textAlign:'center'}}className=''>{moeda(itensTabela.preco)}</td> 
           
            <td style={{color: "transparent"}} >.............</td>
            <td style={{color: "transparent"}} >.............</td>
            <td style={{textAlign:'center'}} className="fixed-table td-fixo">
            
            <OverlayTrigger
              placement={"top"}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Editar Item</Tooltip>}
            >
              <button 
              className='btn btn-table btn-edit' 
              style={{marginRight:15,marginLeft:15}}
              onClick={()=>{
               
                GetitensEditId(itensTabela.id);
                }}>
                 <HiOutlinePencilSquare/>
              </button>
              </OverlayTrigger>


               <OverlayTrigger
              placement={"top"}
              delay={{ show: 100, hide: 250 }}
              overlay={<Tooltip>Deletar</Tooltip>}
            >
              <button 
              onClick={()=>{
                DeleteItem(itensTabela.id);}}
              className='btn btn-table btn-delete'>
                <RiDeleteBin5Line/>
              </button>
              </OverlayTrigger>  
              </td>
        </tr>
        ))}
        </> 
        ): (
                        
          <div style={{margin:"auto"}} className="alert alert-warning alerta-item" role="alert">
            Nenhuma ítem encontrado.
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
      {/* ================Modal Editar Item ============================================== */}

      <Modal className='modal-confirm' show={showEditItem} onHide={handleCloseEditItem}>
        <Modal.Header  closeButton>
          <h1>Status da solicitação</h1>
        </Modal.Header>
        <Modal.Body>
        {alertErroEditItem && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErroEditItem} />
					</div>
					)}
                  <div   className='bloco-input bloco-item '>
            <p className="title-input titulo-cod-tabelaPrice"  >Preço do Produto:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='precoEdit'
              type="Text"
              //name='user' 
              value={moeda(preco)}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setPreco(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div className='botoes-item-tabela'>
          <button className='btn btn-cadastrar btn-itens' onClick={EditarItem}>Salvar</button>
          <button className='btn  btn-cancelar btn-itens' onClick={handleCloseEditItem}>Cancelar</button>
          </div>
        </Modal.Body>
      
      </Modal>
       {/* ================Modal adicionar item ============================================== */}

       <Modal className='modal-confirm modal-item' show={showCadastroItem} onHide={handleCloseCadastroItem}>
        <Modal.Header  closeButton>
          <h1>Adicionar Ítem</h1>
        </Modal.Header>
        <Modal.Body>
        {alertErroCadastroItem && (
					<div className="mt-3 mb-0">
						<Alert msg={msgErro} setAlertErro={setAlertErroCadastroItem} />
					</div>
					)}
                    <div className='bloco-input bloco-item'>
                    <p  className="title-input titulo-item"  >Selecione o produto:<span style={{color:'red'}}>*</span></p>
                     <Select 
                     id="idProduto"  
                     className="select-comp" 
                     placeholder="Digite ou selecione"
                  noOptionsMessage={() => "Nenhum produto encontrado"}
                     options={produtoCadastro}  
                      onChange={(value: any)=>{ 
                        setIdProduto(value.value);
                        idProduto=value.value;
                        LimparTodos();
                      }} 
                    />
                    </div>
                    <div   className='bloco-input bloco-item '>
            <p className="title-input titulo-cod-tabelaPrice"  >Preço do Produto:<span style={{color:'red'}}>*</span></p>
              <input className='form-coontrol inputdataTab' 
              id='preco'
              type="Text"
              //name='user' 
              value={moeda(preco)}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setPreco(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            <div className='botoes-item-tabela'>
          <button className='btn btn-cadastrar btn-itens' onClick={AddItemTabelaPreco}>Salvar</button>
          <button className='btn  btn-cancelar btn-itens' onClick={handleCloseCadastroItem}>Cancelar</button>
          </div>
        </Modal.Body>
      
      </Modal>

      </div>
    
      
      <Footer/>
    </>
    
  );
}
