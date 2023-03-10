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
import { iTipoNegociacao, iUsuarios } from '../../@types';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import { Tooltip } from 'react-bootstrap';
import Paginacao from "../../components/Paginacao";
import { phoneMask, cpfMask, cnpjMask,revertMask } from '../../Masks/Masks';
import { FaSearchPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { iDadosUsuario,iDataSelect, iParceiros } from '../../@types';
import Select from 'react-select';


export default function CadastroParceiros() {
  const history = useNavigate();

  
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('F');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [email, setemail] = useState('');
  const [fone, setFone] = useState('');
  const [canal, setCanal] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [tamanhoLoja, setTamanhoLoja] = useState('');
  let [codVendedor, setCodVendedor] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [uf, setUf] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [status, setStatus] = useState('');
  const [semVisita, setSemVisita] = useState(false);
  const [primeiraSem, setPrimeiraSem] = useState(false);
  const [segundaSem, setSegundaSem] = useState(false);
  const [terceiraSem, setTerceiraSem] = useState(false);
  const [quartaSem, setQuartaSem] = useState(false);
  const [quintaSem, setQuintaSem] = useState(false);
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [tipoNegociacao, setTipoNegociacao] = useState('');
  const [empresa, setEmpresa] = useState('');
  let [inputVenedor, setInputVenedor] = useState('');



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
  let [parceiros, setParceiros] = useState<iParceiros[]>([]);
  const [usuariosget, setUsuariosget] = useState<iUsuarios[]>([]);
  // let [usuariosCount, setUsuariosCount] = useState<iUsuarios[]>([]);
  // let [usuariosFilter, setUsuariosFilter] = useState<iUsuarios[]>([]);
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
   

   const [pagina, setPagina] = useState(1);
   const [qtdePagina, setQtdePagina] = useState(10);

  

   const [pesquisaNome, setPesquisaNome] = useState(true);
   const [pesquisaStatus, setPesquisaStatus] = useState(false);
   const [pesquisaCPF, setPesquisaCPF] = useState(false);

   let [selectGrupo, setSelectGrupo] = useState<iDataSelect>();
   const [promotorPesquisa, setPromotorPesquisa] = useState<iDataSelect[]>([]);

   let [negociacaoTipo, setNegociacaoTipo] = useState<iTipoNegociacao[]>([]);


   //======options dos selects ===================//
   const canalpesq = [
    { value: '1', label: 'Atacarejo' },
    { value: '2', label: 'Especializada' },
    { value: '3', label: 'Farma' },
    { value: '4', label: 'Varejo' }

  ];
  const classificacaopesq = [
    { value: '1', label: 'Diamante' },
    { value: '2', label: 'Ouro' },
    { value: '3', label: 'Prata' },
    { value: '4', label: 'Bronze' }

  ];
  const tamanhopesq = [
    { value: '1', label: 'G G' },
    { value: '2', label: 'G' },
    { value: '3', label: 'M' },
    { value: '4', label: 'P' }

  ];
  const ufpesq = [
    { value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' },
    { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' },
    { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' },
    { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' }

  ];
  const empresaPesquisa = [
    { value: '1', label: 'Ind??stria' },
    { value: '2', label: 'Distribuidora' }
  ];



   const statuspesq = [
    { value: 'true', label: 'Ativo' },
    { value: 'false', label: 'Inativo' }
  ];
   const grupos = [
     { value: '1', label: 'ADMINISTRATIVO' },
     { value: '2', label: 'COMERCIAL' },
     { value: '3', label: 'REPRESENTANTE' },
     { value: '4', label: 'USU??RIO' }
    
   ];

   const grupoCreate:iDataSelect[] = [
     { value: '2', label: 'COMERCIAL' },
     { value: '3', label: 'REPRESENTANTE' },
     { value: '4', label: 'USU??RIO' }
    
   ];
  


  async function GetPromotor() {
    setFilter(true);
    await api
    // .get(`/api/Vendedor/promotor?pagina=${pagina}&totalpagina=999&filter=`)
      .get(`/api/Vendedor?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
       
        if (response.data.data.length > 0) {
           let promotor = response.data.data.filter((p:any)=>p.tipo =="1"||p.tipo =="8" )
          let options:Array<iDataSelect>=new Array<iDataSelect>();
          // response.data.data.map((promotor:any) => {
          promotor.map((promotor:any) => {
            let rowGrupo: iDataSelect = {};
            rowGrupo.value = String(promotor.id);
            rowGrupo.label = String(promotor.codVendedor)+ " - " + promotor.nome ;
           
             options.push(rowGrupo);
            setPromotorPesquisa(options);
           console.log("teste",promotorPesquisa)
          })
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
  function ShowModalEdit(){
    setShowEdit(true);
  }

  //================================================//

   const usuariolog: iDadosUsuario = JSON.parse(
    localStorage.getItem("@Portal/usuario") || "{}"
  );

  // const handleShow = () => setShow(true);
  useEffect(() => { 
    logado()
   // GetUsuariosAcount();
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
    GetTipoNegociacao();
    GetPromotor();
    if(!filter){
      GetParceiros();
    }else{
      GetParceirosFilter();
    }
    
  },[pagina]);

  async function GetTipoNegociacao() {
    setFilter(false);
    
    await api
    
      .get(`/api/TipoNegociacao?pagina=${pagina}&totalpagina=999`)
      .then((response) => {
        setNegociacaoTipo(response.data.data);
        negociacaoTipo=response.data.data;
    
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
  setId(0);
  setNome('');
  setTipoPessoa('F');
  setNomeFantasia('');
  setCnpjCpf('');
  setemail('');
  setFone('');
  setCanal('');
  setClassificacao('');
  setTamanhoLoja('');
  setCodVendedor('');
  setEndereco('');
  setBairro('');
  setMunicipio('');
  setUf('');
  setLat('');
  setLong('');
  setStatus('');
  setEmpresa('');
  setTipoNegociacao('');
  setSemVisita(false);
  setPrimeiraSem(false);
  setSegundaSem(false);
  setTerceiraSem(false);
  setQuartaSem(false);
  setQuintaSem(false);
  setSegunda(false);
  setTerca(false);
  setQuarta(false);
  setQuinta(false);
  setSexta(false);
  setSabado(false);
  setShow(true);
  }
 

  async function GetParceiros() {
    setFilter(false);
    await api
    
      .get(`/api/Parceiro?pagina=${pagina}&totalpagina=${qtdePagina}`)
      .then((response) => {
        setParceiros(response.data.data);
     //   console.log('dados',response.data);
        parceiros=response.data.data;
        setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
        // setTotalPaginas(response.data.total / qtdePagina);
     //  console.log('total de paginas',totalPaginas);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }

  async function GetParceirosFilter() {
    setFilter(true);
    await api
      .get(`/api/Parceiro/filter?pagina=${pagina}&totalpagina=999&filter=${search}`)
      .then((response) => {
        setParceiros(response.data.data);
        parceiros=response.data.data;
       // setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
      //  setParceirosFilter(response.data);
      //  ParceirosFilter=response.data;
       console.log('Parceiros pesquisa',response.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
     
  }
 
  
    //=========== get Parceiros por ID ==================================//
  async function GetParceiroId(id:any) {
    setId(0);
  setNome('');
  setTipoPessoa('F');
  setNomeFantasia('');
  setCnpjCpf('');
  setemail('');
  setFone('');
  setCanal('');
  setClassificacao('');
  setTamanhoLoja('');
  setCodVendedor('');
  setEndereco('');
  setBairro('');
  setMunicipio('');
  setUf('');
  setLat('');
  setLong('');
  setStatus('');
  setEmpresa('');
  setTipoNegociacao('');
  setSemVisita(false);
  setPrimeiraSem(false);
  setSegundaSem(false);
  setTerceiraSem(false);
  setQuartaSem(false);
  setQuintaSem(false);
  setSegunda(false);
  setTerca(false);
  setQuarta(false);
  setQuinta(false);
  setSexta(false);
  setSabado(false);;
    setEdit(true);
    setShowEdit(true);
    
    await api
      .get(`/api/Parceiro/${id}`)
      .then((response) => {
        console.log("parceiro id",response.data)
        setId(response.data.id);
        setNome(response.data.nome);
        setTipoPessoa(response.data.tipoPessoa);
        setNomeFantasia(response.data.nomeFantasia);
        setCnpjCpf(response.data.cnpj_Cpf);
        setemail(response.data.email);
        setFone(response.data.fone);
        setCanal(response.data.canal);
        setClassificacao(response.data.classificacao);
        setTamanhoLoja(response.data.tamanhoLoja);
        setCodVendedor(response.data.codVendedor);
        setInputVenedor(response.data.vendedores.codVendedor+ '-' +response.data.vendedores.nome)
        inputVenedor=response.data.vendedores.codVendedor+ '-' +response.data.vendedores.nome
        setEndereco(response.data.endereco);
        setBairro(response.data.bairro);
        setMunicipio(response.data.municipio);
        setUf(response.data.uf);
        setLat(response.data.lat);
        setLong(response.data.long);
        setStatus(response.data.status);
        setSemVisita(response.data.semVisita);
        setPrimeiraSem(response.data.primeiraSem);
        setSegundaSem(response.data.segundaSem);
        setTerceiraSem(response.data.terceiraSem);
        setQuartaSem(response.data.quartaSem);
        setQuintaSem(response.data.quintaSem);
        setSegunda(response.data.segunda);
        setTerca(response.data.terca);
        setQuarta(response.data.quarta);
        setQuinta(response.data.quinta);
        setSexta(response.data.sexta);
        setSabado(response.data.sabado);
        setEmpresa(response.data.empresa);
        setTipoNegociacao(response.data.tipoNegociacao);


      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar Usuario ===============================//
  async function editParceiro(){
    setLoadingUpdate(true)
  await api.put(`/api/Parceiro/${id}`, {
    id: id,
    nome: nome,
    tipoPessoa: tipoPessoa,
    nomeFantasia: nomeFantasia,
    cnpj_Cpf: cnpjCpf,
    email: email,
    fone: fone,
    canal: canal,
    classificacao: classificacao,
    tamanhoLoja: tamanhoLoja,
    codVendedor: codVendedor,
    endereco: endereco,
    bairro: bairro,
    municipio: municipio,
    uf: uf,
    lat: lat,
    long: long,
    status: status,
    semVisita: semVisita,
    primeiraSem: primeiraSem,
    segundaSem:segundaSem,
    terceiraSem: terceiraSem,
    quartaSem: quartaSem,
    quintaSem: quintaSem,
    segunda: segunda,
    terca: terca,
    quarta: quarta,
    quinta: quinta,
    sexta: sexta,
    sabado: sabado,
    tipoNegociacao: tipoNegociacao,
    empresa: empresa,
  })
    .then(response => {
      handleCloseEdit()
     // GetParceirosAcount();
      GetParceiros();
      setLoadingUpdate(false)
     // console.log('resposta', response)
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Dados do parceiro atualizados com sucesso.");
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
    setMsgErro(error.response.data);
   // setMsgErro(data.message);
      //setMsgErro(
        // error.response.data.message
        //   ? error.response.data.message
        //   : "Houve um erro ao tentar editar o usu??rio. Tente novamente mais tarde."
      //);
     
      return;
    });
  }
    //============ Criar Usuario ===============================//
    async function CreateParceiro(){
console.log('codVendedor',codVendedor)
      if(nome==''){
        let senhaconf: any;
        senhaconf = document.getElementById("nome");
        document.getElementById("nome")?.focus();
        setAlertErroRegister(true);
        setMsgErro("?? obrigat??rio informar o nome do parceiro.");
      return
      }
      if(cnpjCpf==''){
        if(tipoPessoa=="J"){
          let cpf: any;
          cpf = document.getElementById("cnpj");
          document.getElementById("cnpj")?.focus();
          setAlertErroRegister(true);
          setMsgErro(`?? obrigat??rio informar o CNPJ.`);
        return
        }else{
          let cpf: any;
          cpf = document.getElementById("cpf");
          document.getElementById("cpf")?.focus();
          setAlertErroRegister(true);
          setMsgErro(`?? obrigat??rio informar o CPF.`);
        return

        }
       
      }
      if(canal==''){
        window.scrollTo(0, 0);
        let senhaconf: any;
        senhaconf = document.getElementById("canal");
        document.getElementById("canal")?.focus();
        setAlertErroRegister(true);
        setMsgErro("?? obrigat??rio informar o canal.");
      return
      }
      if(classificacao==''){
        window.scrollTo(0, 0);
        let senhaconf: any;
        senhaconf = document.getElementById("classificacao");
        document.getElementById("classificacao")?.focus();
        setAlertErroRegister(true);
        setMsgErro("?? obrigat??rio informar a classifica????o.");
      return
      }
      if(tamanhoLoja==''){
        window.scrollTo(0, 0);
        let senhaconf: any;
        senhaconf = document.getElementById("tamanhoLoja");
        document.getElementById("tamanhoLoja")?.focus();
        setAlertErroRegister(true);
        setMsgErro("?? obrigat??rio informar o tamanho da loja.");
      return
      }
       if(codVendedor==''){
        window.scrollTo(0, 0);
         let senhaconf: any;
         senhaconf = document.getElementById("promotor");
         document.getElementById("promotor")?.focus();
         setAlertErroRegister(true);
         setMsgErro("?? obrigat??rio informar o promotor.");
       return
       }
       if(tipoNegociacao==''){
        window.scrollTo(0, 0);
        let senhaconf: any;
        senhaconf = document.getElementById("promotor");
        document.getElementById("promotor")?.focus();
        setAlertErroRegister(true);
        setMsgErro("?? obrigat??rio informar o tipo de negocia????o.");
      return
      }
       

     
  setLoadingCreate(true)
  await api.post("/api/Parceiro",{
  nome: nome,
  tipoPessoa: tipoPessoa,
  nomeFantasia: nomeFantasia,
  cnpj_Cpf: cnpjCpf,
  email: email,
  fone: fone,
  canal: canal,
  classificacao: classificacao,
  tamanhoLoja: tamanhoLoja,
  codVendedor: Number(codVendedor),
  endereco: endereco,
  bairro: bairro,
  municipio: municipio,
  uf: uf,
  lat: lat,
  long: long,
  status: 'true',
  semVisita: semVisita,
  primeiraSem: primeiraSem,
  segundaSem: segundaSem,
  terceiraSem: terceiraSem,
  quartaSem: quartaSem,
  quintaSem: quintaSem,
  segunda: segunda,
  terca: terca,
  quarta: quarta,
  quinta: quinta,
  sexta: sexta,
  sabado: sabado,
  tipoNegociacao: tipoNegociacao,
  empresa: empresa,
       })
       
        .then(response => {
          setLoadingCreate(false)
         // GetParceirosAcount();
          GetParceiros();
          handleClose ();
          handleShowMensage();
          setAlertErroMensage(true);
          setMsgErro("Parceiro criado com sucesso.");
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
              "Houve um erro ao tentar criar o usu??rio. Tente novamente mais tarde."
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
  GetParceiros();
}

function PesquisaNome(){
  setSearch('');
  GetParceiros();
  setPesquisaNome(true);
  setPesquisaStatus(false);
  setPesquisaCPF(false);
  let pesquisa: any;
  let pesquisar: any;
  pesquisar = document.getElementById("nomePesquisa");
  document.getElementById("nomePesquisa")?.focus();
}
 
function PesquisaStatus(){
  setSearch('');
  GetParceiros();
  setPesquisaNome(false);
  setPesquisaStatus(true);
  setPesquisaCPF(false);
  let pesquisa: any;
  pesquisa = document.getElementById("statusPesquisa");
  document.getElementById("statusPesquisa")?.focus();
}

 
function PesquisaCPF(){
  setSearch('');
  GetParceiros();
  setPesquisaNome(false);
  setPesquisaStatus(false);
  setPesquisaCPF(true);
  let pesquisa: any;
  pesquisa = document.getElementById("cpfPesquisa");
  document.getElementById("cpfPesquisa")?.focus();
}

function ChecaFone(){
  console.log("caiu no telefone")
  if(fone.length<14){
    let senhaconf: any;
        senhaconf = document.getElementById("fone");
        document.getElementById("fone")?.focus();
        setAlertErroRegister(true);
        setMsgErro("O telefone est?? incompleto");
      
      return
  }
}
function ChecaCPF(){

  if(cnpjCpf.length<11){
    let senhaconf: any;
        senhaconf = document.getElementById("cpf");
        document.getElementById("cpf")?.focus();
        setAlertErroRegister(true);
        setMsgErro("O CPF est?? incompleto");
      
      return
  }
}
function ChecaCNPJ(){

  if(cnpjCpf.length<14){
    let senhaconf: any;
        senhaconf = document.getElementById("cnpj");
        document.getElementById("cnpj")?.focus();
        setAlertErroRegister(true);
        setMsgErro("O CNPJ est?? incompleto");
      
      return
  }
}
function SemVisitar(){
  setPrimeiraSem(false);
  setSegundaSem(false);
  setTerceiraSem(false);
  setQuartaSem(false);
  setQuintaSem(false);
  setSegunda(false);
  setTerca(false);
  setQuarta(false);
  setQuinta(false);
  setSexta(false);
  setSabado(false);
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
            <h1>Cadastro de Parceiros</h1>
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
              <div className='logo-cadastro-parceiro'></div>
          <div className='conteudo'>
            <div className='div-button-top'>
              <div className='pesBloco'>
                <div className='title-pesBloco'>
                <span style={{fontSize:14}}>Pesquisar por:</span>
                </div>
                <div className='d-flex'>
                  <input  name='pesquisa' type="radio" checked={pesquisaNome}  onChange={PesquisaNome} /><p style={{fontSize:13,marginLeft:8}} >Nome</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaCPF}  onChange={PesquisaCPF} /><p style={{fontSize:13,marginLeft:8}} >CPF / CNPJ</p>
                  <input  style={{marginLeft:20}} name='pesquisa' type="radio" checked={pesquisaStatus}  onChange={PesquisaStatus} /><p style={{fontSize:13,marginLeft:8}} >Status</p>
                  </div>
              </div>
          <OverlayTrigger
          placement={"top"}
          delay={{ show: 100, hide: 250 }}
          overlay={<Tooltip>Novo Parceiro</Tooltip>}
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
            className='form-coontrol inputlogin' 
             name=""
             value={search}
             onChange={(e)=>{ 
              setSearch(e.target.value);
              
            }}
              />
            </div>
             </>):(<></>)}
             {pesquisaCPF?(<>
              <div>
              <p className="title-input"  >Pesquisar por CPF / CNPJ: </p>
            <input  id="cpfPesquisa"  
            type="text" 
            className='form-coontrol inputlogin' 
             name=""
             value={search}
             onChange={(e)=>{ 
              setSearch(revertMask(e.target.value));
              
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
             aria-label="Escolha o n??mero de quartos" 
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
                     options={statuspesq}  
                      onChange={(value: any)=>{ 
                        setSearch(value.value); 
                        console.log('Select',value)          
                      }} 
                    />
                    </div>
              </>):(<></>)}
              </div>

                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas btn-pesquisar'onClick={()=>{setPagina(1);GetParceirosFilter()}}>Pesquisar<FaSearchPlus style={{marginLeft: 6}} fontSize={17}/></button>
                    <button style={{marginTop:30}} className='btn btn-primary btn-pesquisas' onClick={LimparPesquisa}>Limpar<AiOutlineClear style={{marginLeft: 6}} fontSize={20}/></button>
                   
                    </div>
          
          <div className="table-responsive table-scroll tabela-responsiva">
      <div className=' table-wrap'>
      <Table responsive className='table-global table  main-table'>
      <thead>
      <tr className="tituloTab">
      <th style={{textAlign:'center'}} className="th4 codpar">C??digo</th>
          <th className="th1 Nome-complet">Nome</th>
          <th style={{textAlign:'center'}} className="th2">CNPJ / CPF</th>
          <th style={{textAlign:'center'}} className="th4">Status</th>
          <th  className="th3">Endere??o</th>
          <th  className="th3">Bairro</th>
          <th  className="th3">Munic??pio</th>
          <th style={{textAlign:'center'}} className="th4">UF</th>
          <th  className="th4">.</th>
          <th style={{textAlign:'center'}} className="th4 fixed-table">A????es</th>
      </tr>
      </thead>
      <tbody>
      {parceiros.length > 0 ? (
                        <>
      {parceiros.map((parceiros,index)=> (
        <tr key={index}>
          <td style={{textAlign:'center'}}  className='codpar'>{parceiros.id}</td> 
         <td className='Nome-complet'>{parceiros.nome}</td> 
         <td style={{textAlign:'center'}}>{parceiros.tipoPessoa =="F"?cpfMask(parceiros.cnpj_Cpf):cnpjMask(parceiros.cnpj_Cpf)}</td>
           <td style={parceiros.status =='true'?{color:'#008000', textAlign:"center"}:{color:'red', textAlign:"center"}}>{parceiros.status =="true"?"Ativo":"Inativo"}</td>
           <td >{parceiros.endereco}</td>
           <td >{parceiros.bairro}</td>
           <td >{parceiros.municipio}</td>
           <td style={{textAlign:'center'}} >{parceiros.uf}</td>
            
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
                GetParceiroId(parceiros.id);
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
                        
          <div style={{margin:"auto"}} className="alert alert-warning alerta-parceiro" role="alert">
            Nenhum parceiro encontrado.
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

      <Modal className='modal-cadastro-parceiro' show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <h1>Cadastro de Parceiro</h1>
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
          <div className='div-conteudo-geral'>
            <div className='conteudo-cadastro-parceiro'>
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputparceiro' 
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
            <div  className='bloco-input blocoTipo '>
            <p className="title-input" >Pessoa: </p>
              <select name="" id="tipo"className="form-select inputparceiro campo-select"
              value={tipoPessoa}
              onChange={(e)=>{ 
                setTipoPessoa(e.target.value); 
                setCnpjCpf("");  
                LimparTodos();        
               }}
              >
                <option value="F">F??sica</option>
                <option value="J">Jur??dica</option>

              </select>
            </div> 
            </div>


            <div className='coluna-dupla'>
              {tipoPessoa=='J'?(<>
                <div  className='bloco-input'>
            <p className="title-input" >Nome Fantasia: </p>
              <input className='form-control inputparceiro' 
              id='nomeFantasia'
              type="text"
              //name='user' 
              value={nomeFantasia}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setNomeFantasia(e.target.value);
                LimparTodos();
              }}
              />
            </div>
              </>):(<></>)}
            

            
            
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            {tipoPessoa=='J'?(<>
              <p className="title-input"  >CNPJ: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputparceiro' 
              id='cnpj'
              type="text"
              //name='user'
              onBlur={ChecaCNPJ}
              maxLength={18} 
              value={cnpjCpf?cnpjMask(cnpjCpf):cnpjCpf}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCnpjCpf(revertMask(e.target.value));
                LimparTodos();
              }}
              />
            </>):(<>
              <p className="title-input"  >CPF: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputparceiro' 
              id='cpf'
              type="text"
              //name='user' 
             // value={cnpjCpf}
              value={cnpjCpf?cpfMask(cnpjCpf):cnpjCpf}
              //onKeyDown={LimparErro} 
              onBlur={ChecaCPF}
              onChange={(e)=>{ 
                setCnpjCpf(revertMask(e.target.value));
                LimparTodos();
              }}
              />
            </>)}
            
            </div>
            <div  className='bloco-input '>
            <p className="title-input"  >E-mail: </p>
              <input className='form-control inputparceiro' 
              id='email'
              type="text"
              //name='user' 
              value={email}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setemail(e.target.value.toLowerCase());
                LimparTodos();
              }}
              />
            </div> 
            <div  className='bloco-input'>
            <p className="title-input"  >Telefone: </p>
              <input className='form-control inputparceiro' 
              id='fone'
              type="text"
              //name='user' 
              onBlur={ChecaFone}
              maxLength={15}
              value={fone?phoneMask(fone):fone}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setFone(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
           
            <div className='coluna-dupla'>
            <div  className='bloco-input '>
            <p className="title-input"  >Canal: <span style={{color:'red'}}>*</span></p>

            <Select 
                     id="canal"  
                     className="inputparceiro" 
                     placeholder={canal}
                  noOptionsMessage={() => "Nenhum canal encontrado"}
                   //  value={search} 
                     options={canalpesq}  
                      onChange={(value: any)=>{ 
                        setCanal(value.label); 
                        LimparTodos();        
                      }} 
                    />

            </div> 
            <div  className='bloco-input '>
            <p className="title-input"  >Classifica????o: <span style={{color:'red'}}>*</span></p>
            <Select 
                     id="classificacao"  
                     className="inputparceiro" 
                     placeholder={classificacao}
                  noOptionsMessage={() => "Nenhuma classifica????o encontrada"}
                   //  value={search} 
                     options={classificacaopesq}  
                      onChange={(value: any)=>{ 
                        setClassificacao(value.label); 
                        LimparTodos();       
                      }} 
                    />
              {/* <input className='form-control inputparceiro' 
              id='classificacao'
              type="text"
              //name='user' 
              value={classificacao}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setClassificacao(e.target.value);
                LimparTodos();
              }}
              /> */}
            </div>
            <div  className='bloco-input '>
            <p className="title-input"  >Tamanho da loja: <span style={{color:'red'}}>*</span></p>
            <Select 
                     id="tamanhoLoja"  
                     className="inputparceiro" 
                     placeholder={tamanhoLoja}
                  noOptionsMessage={() => "Nenhuma tamanho encontrada"}
                   //  value={search} 
                     options={tamanhopesq}  
                      onChange={(value: any)=>{ 
                        setTamanhoLoja(value.label); 
                        LimparTodos();         
                      }} 
                    />
             
            </div>
            
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input bloco-endereco '>
            <p className="title-input"  >Endere??o: </p>
              <input className='form-control inputparceiro' 
              id='endereco'
              type="text"
              //name='user' 
              value={endereco}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setEndereco(e.target.value);
                LimparTodos();
              }}
              />
            </div> 
            <div  className='bloco-input bloco-bairro '>
            <p className="title-input"  >Bairro: </p>
              <input className='form-control inputparceiro' 
              id='bairro'
              type="text"
              //name='user' 
              value={bairro}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setBairro(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input  bloco-municipio '>
            <p className="title-input"  >Munic??pio: </p>
              <input className='form-control inputparceiro' 
              id='municipio'
              type="text"
              //name='user' 
              value={municipio}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setMunicipio(e.target.value);
                LimparTodos();
              }}
              />
            </div> 
            <div  className='bloco-input bloco-uf '>
            <p className="title-input"  >UF: </p>
            <Select 
                     id="uf"  
                     className="inputparceiro" 
                     placeholder={uf}
                  noOptionsMessage={() => "Nenhuma tamanho encontrada"}
                   //  value={search} 
                     options={ufpesq}  
                      onChange={(value: any)=>{ 
                        setUf(value.value); 
                        console.log('Select',value)  
                        LimparTodos();        
                      }} 
                    />
              {/* <input className='form-control inputparceiro' 
              id='uf'
              type="text"
              //name='user' 
              value={bairro}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setBairro(e.target.value);
                LimparTodos();
              }}
              /> */}
            </div>
            <div className='d-flex boco-lat-log'>
            <div  className='bloco-input bloco-lat '>
            <p className="title-input"  >Lat: </p>
              <input className='form-control inputparceiro' 
              id='lat'
              type="text"
              //name='user' 
              value={lat}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setLat(e.target.value);
                LimparTodos();
              }}
              />
              </div>
              <div  className='bloco-input bloco-lat '>
            <p className="title-input"  >Log: </p>
              <input className='form-control inputparceiro' 
              id='llo'
              type="text"
              //name='user' 
              value={long}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setLong(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
           
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-corretor'>
            <p className="title-input"  >Promotor: <span style={{color:'red'}}>*</span></p>
            <Select 
                     id="promotor"  
                     className="inputparceiro" 
                    // placeholder={promotor}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={promotorPesquisa}  
                      onChange={(value: any)=>{ 
                        setCodVendedor(value.value);
                        codVendedor=value.value; 
                        console.log('cod vendedor',codVendedor)
                        LimparTodos();         
                      }} 
                    />
            </div> 
            {/* <div  className='bloco-input tiponego '>
            <p className="title-input"  >Tipo Empresa: <span style={{color:'red'}}>*</span></p>
            {/* <Select 
                     id="promotor"  
                     className="inputparceiro " 
                     placeholder={promotor}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={empresaPesquisa}  
                      onChange={(value: any)=>{ 
                        setEmpresa(value.label); 
                        LimparTodos();         
                      }} 
                    /> 
                    <select className="form-select inputparceiro"
                      aria-label="Escolha o n??mero de quartos"
                      value={empresa}
                         onChange={(e) => {setEmpresa(e.target.value);}}
                        >
                           <option value="0"></option>
                        <option value="1">Ind??stria</option>
                        <option value="2">Distribuidora</option>
                    </select>
            </div> */}
            <div  className='bloco-input tiponego'>
            <p className="title-input"  >Tipo Negocia????o: <span style={{color:'red'}}>*</span></p>
            {/* <Select 
                     id="promotor"  
                     className="inputparceiro" 
                     placeholder={promotor}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={promotorPesquisa}  
                      onChange={(value: any)=>{ 
                        setTipoNegociacao(value.label); 
                        LimparTodos();         
                      }} 
                    /> */}
                    <select className="form-select inputparceiro"
                      aria-label="Escolha o n??mero de quartos"
                      value={tipoNegociacao}
                         onChange={(e) => {setTipoNegociacao(e.target.value);LimparTodos();}}
                        >
                           <option value="0"></option>
                           {negociacaoTipo.length > 0 ? (
                        <>
                       {negociacaoTipo.map((tipo,index)=> (
                        <option value={tipo.id}>{tipo.descricao}</option>
                       ))}</>):(<><option value="0">Nenhum Tipo encontrado</option></>)}
                    </select>
                  </div> 
                  </div>
                    </div>
                    <div className='div-visitas'>
                      <div className='bloco-visita-geral bloco-visitas'>
                        <h2>VISITAS</h2>
                        <div className='divisao'></div>
                        <div style={{marginTop:7}} className='check-grupo'>
                        <p style={{marginRight:10}} className='text'>SEM VISITA</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      checked={semVisita}  
                      onChange={({ target }) => {
                      setSemVisita(target.checked);
                      SemVisitar();
                      }}  
                      />
                      </div>
                      {/* <div className='divisa'></div> */}
                        <div className='d-flex '>
                          <div className='bloco-interno'>
                            <h2>Semana da visita</h2>
                        <div className='check-grupo'>
                        <p style={{marginRight:16}} className='text'>Primeira</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={primeiraSem}  
                      onChange={({ target }) => {
                      setPrimeiraSem(target.checked);
                      }}  
                      />
                      
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:10}} className='text'>Segunda</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={segundaSem}  
                      onChange={({ target }) => {
                      setSegundaSem(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:17}} className='text'>Terceira</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={terceiraSem}  
                      onChange={({ target }) => {
                      setTerceiraSem(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:24}} className='text'>Quarta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quartaSem}  
                      onChange={({ target }) => {
                      setQuartaSem(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:28}} className='text'>Quinta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quintaSem}  
                      onChange={({ target }) => {
                      setQuintaSem(target.checked);
                      }}  
                      />
                      </div>
                      </div>
                      <div className='bloco-interno'>
                            <h2>Dia da visita</h2>
                        <div className='check-grupo'>
                        <p style={{marginRight:16}} className='text'>Segunda</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={segunda}  
                      onChange={({ target }) => {
                      setSegunda(target.checked);
                      }}  
                      />
                      
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:47}} className='text'>Ter??a</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={terca}  
                      onChange={({ target }) => {
                      setTerca(target.checked);
                      }}  
                      />
                      </div>
                      
                      <div className='check-grupo'>
                        <p style={{marginRight:31}} className='text'>Quarta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quarta}  
                      onChange={({ target }) => {
                      setQuarta(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:35}} className='text'>Quinta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quinta}  
                      onChange={({ target }) => {
                      setQuinta(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:45}} className='text'>Sexta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={sexta}  
                      onChange={({ target }) => {
                      setSexta(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:26}} className='text'>S??bado</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={sabado}  
                      onChange={({ target }) => {
                      setSabado(target.checked);
                      }}  
                      />
                      </div>
                      </div>
                        </div>

                      </div>
                    <button disabled={loadingCreate} type='button' id='btn' className='btn btn-cadastrar' onClick={CreateParceiro}>Cadastrar</button>                  
                    </div>
                    
            </div>
            
            </div>
            </>    )}
        </Modal.Body>
      
      </Modal>
      {/* ================Modal Edit ============================================== */}

      <Modal className='modal-cadastro-parceiro' show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header  closeButton>
          <h1>Dados do Parceiro</h1>
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
        <div className='div-conteudo-geral'>
            <div className='conteudo-cadastro-parceiro'>
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input"  >Nome: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputparceiro' 
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
            <div  className='bloco-input blocoTipo '>
            <p className="title-input" >Status: </p>
              <select name="" id="tipo"className="form-select inputparceiro campo-select"
              value={status}
              onChange={(e)=>{ 
                setStatus(e.target.value); 
                         
               }}
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>

              </select>
            </div> 
            </div>


            <div className='coluna-dupla'>
              {tipoPessoa=='J'?(<>
                <div  className='bloco-input'>
            <p className="title-input" >Nome Fantasia: </p>
              <input className='form-control inputparceiro' 
              id='nomeFantasia'
              type="text"
              //name='user' 
              value={nomeFantasia}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setNomeFantasia(e.target.value);
                LimparTodos();
              }}
              />
            </div>
              </>):(<></>)}
            

            
            
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            {tipoPessoa=='J'?(<>
              <p className="title-input"  >CNPJ: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputparceiro' 
              id='cnpj'
              type="text"
              //name='user'
              onBlur={ChecaCNPJ}
              maxLength={18} 
              value={cnpjCpf?cnpjMask(cnpjCpf):cnpjCpf}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setCnpjCpf(revertMask(e.target.value));
                LimparTodos();
              }}
              />
            </>):(<>
              <p className="title-input"  >CPF: <span style={{color:'red'}}>*</span></p>
              <input className='form-control inputparceiro' 
              id='cpf'
              type="text"
              //name='user' 
             // value={cnpjCpf}
              value={cnpjCpf?cpfMask(cnpjCpf):cnpjCpf}
              //onKeyDown={LimparErro} 
              onBlur={ChecaCPF}
              onChange={(e)=>{ 
                setCnpjCpf(revertMask(e.target.value));
                LimparTodos();
              }}
              />
            </>)}
            
            </div>
            <div  className='bloco-input '>
            <p className="title-input"  >E-mail: </p>
              <input className='form-control inputparceiro' 
              id='email'
              type="text"
              //name='user' 
              value={email}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setemail(e.target.value.toLowerCase());
                LimparTodos();
              }}
              />
            </div> 
            <div  className='bloco-input'>
            <p className="title-input"  >Telefone: </p>
              <input className='form-control inputparceiro' 
              id='fone'
              type="text"
              //name='user' 
              onBlur={ChecaFone}
              maxLength={15}
              value={fone?phoneMask(fone):fone}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setFone(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
            
            <div className='coluna-dupla'>
            <div  className='bloco-input '>
            <p className="title-input"  >Canal: <span style={{color:'red'}}>*</span></p>

            <Select 
                     id="canal"  
                     className="inputparceiro" 
                     placeholder={canal}
                  noOptionsMessage={() => "Nenhum canal encontrado"}
                   //  value={search} 
                     options={canalpesq}  
                      onChange={(value: any)=>{ 
                        setCanal(value.label); 
                        LimparTodos();        
                      }} 
                    />

            </div> 
            <div  className='bloco-input '>
            <p className="title-input"  >Classifica????o: <span style={{color:'red'}}>*</span></p>
            <Select 
                     id="classificacao"  
                     className="inputparceiro" 
                     placeholder={classificacao}
                  noOptionsMessage={() => "Nenhuma classifica????o encontrada"}
                   //  value={search} 
                     options={classificacaopesq}  
                      onChange={(value: any)=>{ 
                        setClassificacao(value.label); 
                        LimparTodos();       
                      }} 
                    />
              {/* <input className='form-control inputparceiro' 
              id='classificacao'
              type="text"
              //name='user' 
              value={classificacao}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setClassificacao(e.target.value);
                LimparTodos();
              }}
              /> */}
            </div>
            <div  className='bloco-input '>
            <p className="title-input"  >Tamanho da loja: <span style={{color:'red'}}>*</span></p>
            <Select 
                     id="tamanhoLoja"  
                     className="inputparceiro" 
                     placeholder={tamanhoLoja}
                  noOptionsMessage={() => "Nenhuma tamanho encontrada"}
                   //  value={search} 
                     options={tamanhopesq}  
                      onChange={(value: any)=>{ 
                        setTamanhoLoja(value.label); 
                        LimparTodos();         
                      }} 
                    />
             
            </div>
            
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input bloco-endereco '>
            <p className="title-input"  >Endere??o: </p>
              <input className='form-control inputparceiro' 
              id='endereco'
              type="text"
              //name='user' 
              value={endereco}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setEndereco(e.target.value);
                LimparTodos();
              }}
              />
            </div> 
            <div  className='bloco-input bloco-bairro '>
            <p className="title-input"  >Bairro: </p>
              <input className='form-control inputparceiro' 
              id='bairro'
              type="text"
              //name='user' 
              value={bairro}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setBairro(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
            <div className='coluna-dupla'>
            
            <div  className='bloco-input  bloco-municipio '>
            <p className="title-input"  >Munic??pio: </p>
              <input className='form-control inputparceiro' 
              id='municipio'
              type="text"
              //name='user' 
              value={municipio}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setMunicipio(e.target.value);
                LimparTodos();
              }}
              />
            </div> 
            <div  className='bloco-input bloco-uf '>
            <p className="title-input"  >UF: </p>
            <Select 
                     id="uf"  
                     className="inputparceiro" 
                     placeholder={uf}
                  noOptionsMessage={() => "Nenhuma tamanho encontrada"}
                   //  value={search} 
                     options={ufpesq}  
                      onChange={(value: any)=>{ 
                        setUf(value.value); 
                        console.log('Select',value)  
                        LimparTodos();        
                      }} 
                    />
              {/* <input className='form-control inputparceiro' 
              id='uf'
              type="text"
              //name='user' 
              value={bairro}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setBairro(e.target.value);
                LimparTodos();
              }}
              /> */}
            </div>
            <div className='d-flex boco-lat-log'>
            <div  className='bloco-input bloco-lat '>
            <p className="title-input"  >Lat: </p>
              <input className='form-control inputparceiro' 
              id='lat'
              type="text"
              //name='user' 
              value={lat}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setLat(e.target.value);
                LimparTodos();
              }}
              />
              </div>
              <div  className='bloco-input bloco-lat '>
            <p className="title-input"  >Log: </p>
              <input className='form-control inputparceiro' 
              id='llo'
              type="text"
              //name='user' 
              value={long}
              //onKeyDown={LimparErro} 
              onChange={(e)=>{ 
                setLong(e.target.value);
                LimparTodos();
              }}
              />
            </div>
            </div>
            </div>
            <div className='coluna-dupla'>
            <div  className='bloco-input bloco-corretor'>
            <p className="title-input"  >Promotor: <span style={{color:'red'}}>*</span></p>
            <Select 
                     id="promotor"  
                     className="inputparceiro" 
                     placeholder={inputVenedor}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={promotorPesquisa}  
                      onChange={(value: any)=>{ 
                        setCodVendedor(value.value);
                        codVendedor=value.value; 
                        LimparTodos();         
                      }} 
                    />
            </div> 
            {/* <div  className='bloco-input tiponego '>
            <p className="title-input"  >Tipo Empresa: <span style={{color:'red'}}>*</span></p>
            {/* <Select 
                     id="promotor"  
                     className="inputparceiro " 
                     placeholder={promotor}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={empresaPesquisa}  
                      onChange={(value: any)=>{ 
                        setEmpresa(value.label); 
                        LimparTodos();         
                      }} 
                    /> 
                    <select className="form-select inputparceiro"
                      aria-label="Escolha o n??mero de quartos"
                      value={empresa}
                         onChange={(e) => {setEmpresa(e.target.value);}}
                        >
                           <option value="0"></option>
                        <option value="1">Ind??stria</option>
                        <option value="2">Distribuidora</option>
                    </select>
            </div> */}
            <div  className='bloco-input tiponego'>
            <p className="title-input"  >Tipo Negocia????o: <span style={{color:'red'}}>*</span></p>
            {/* <Select 
                     id="promotor"  
                     className="inputparceiro" 
                     placeholder={promotor}
                  noOptionsMessage={() => "Nenhuma promotor encontrada"}
                   //  value={search} 
                     options={promotorPesquisa}  
                      onChange={(value: any)=>{ 
                        setTipoNegociacao(value.label); 
                        LimparTodos();         
                      }} 
                    /> */}
                    <select className="form-select inputparceiro"
                      aria-label="Escolha o n??mero de quartos"
                      value={tipoNegociacao}
                         onChange={(e) => {setTipoNegociacao(e.target.value);}}
                        >
                           <option value="0"></option>
                           {negociacaoTipo.length > 0 ? (
                        <>
                       {negociacaoTipo.map((tipo,index)=> (
                        <option value={tipo.id}>{tipo.descricao}</option>
                       ))}</>):(<><option value="0">Nenhum Tipo encontrado</option></>)}
                    </select>
                  </div> 
                  </div>
                    </div>
                    <div className='div-visitas'>
                      <div className='bloco-visita-geral bloco-visitas'>
                        <h2>VISITAS</h2>
                        <div className='divisao'></div>
                        <div style={{marginTop:7}} className='check-grupo'>
                        <p style={{marginRight:10}} className='text'>SEM VISITA</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      checked={semVisita}  
                      onChange={({ target }) => {
                      setSemVisita(target.checked);
                      SemVisitar();
                      }}  
                      />
                      </div>
                      {/* <div className='divisa'></div> */}
                        <div className='d-flex '>
                          <div className='bloco-interno'>
                            <h2>Semana da visita</h2>
                        <div className='check-grupo'>
                        <p style={{marginRight:16}} className='text'>Primeira</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={primeiraSem}  
                      onChange={({ target }) => {
                      setPrimeiraSem(target.checked);
                      }}  
                      />
                      
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:10}} className='text'>Segunda</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={segundaSem}  
                      onChange={({ target }) => {
                      setSegundaSem(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:17}} className='text'>Terceira</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={terceiraSem}  
                      onChange={({ target }) => {
                      setTerceiraSem(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:24}} className='text'>Quarta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quartaSem}  
                      onChange={({ target }) => {
                      setQuartaSem(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:28}} className='text'>Quinta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quintaSem}  
                      onChange={({ target }) => {
                      setQuintaSem(target.checked);
                      }}  
                      />
                      </div>
                      </div>
                      <div className='bloco-interno'>
                            <h2>Dia da visita</h2>
                        <div className='check-grupo'>
                        <p style={{marginRight:16}} className='text'>Segunda</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={segunda}  
                      onChange={({ target }) => {
                      setSegunda(target.checked);
                      }}  
                      />
                      
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:47}} className='text'>Ter??a</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={terca}  
                      onChange={({ target }) => {
                      setTerca(target.checked);
                      }}  
                      />
                      </div>
                      
                      <div className='check-grupo'>
                        <p style={{marginRight:31}} className='text'>Quarta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quarta}  
                      onChange={({ target }) => {
                      setQuarta(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:35}} className='text'>Quinta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={quinta}  
                      onChange={({ target }) => {
                      setQuinta(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:45}} className='text'>Sexta</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={sexta}  
                      onChange={({ target }) => {
                      setSexta(target.checked);
                      }}  
                      />
                      </div>
                      <div className='check-grupo'>
                        <p style={{marginRight:26}} className='text'>S??bado</p>
                      <input 
                      type="checkbox" 
                      name="grupo" 
                      id="grupo"
                      disabled={semVisita}
                      checked={sabado}  
                      onChange={({ target }) => {
                      setSabado(target.checked);
                      }}  
                      />
                      </div>
                      </div>
                        </div>

                      </div>
                      <div className='divbotoes-edit'>
                      <button disabled={loadingUpdate } type='button' id='btn-edit-par' className='btn btn-cadastrar' onClick={editParceiro}>Editar</button>                  
                    <button disabled={loadingUpdate} style={{marginTop: 135}} id='btn-edit-par' className='btn btn-cancelar 'onClick={handleCloseEdit}>Cancelar</button>
                    </div>
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
       {/* ================Modal Cofirma????o ============================================== */}

       <Modal className='modal-confirm' show={showMensage} onHide={handleCloseMensage}>
        <Modal.Header  closeButton>
          <h1>Status da solicita????o</h1>
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
