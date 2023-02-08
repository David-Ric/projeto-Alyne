import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../styles/pages-styles/MeuPerfil.scss';
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
import SideNavBar from '../components/Navbar/SideNavBar';
import NavbarDashHeader from '../components/Navbar/NavbarDashHeader';
import { iUsuarios, iDadosUsuario, IFile } from '../@types';
import PhotoUser from '../assets/avatar1.png';
import { phoneMask } from '../Masks/Masks';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadFile from '../firebase/uploadFile';
import Perfil from '../components/UploadArquivos/Perfil';



export default function MeuPerfil() {

    const userLog: iDadosUsuario = JSON.parse(
        localStorage.getItem("@Portal/usuario") || "{}"
      );


  const history = useNavigate();
  let [user, setUser] = useState('');
  const [error, setError] = useState("");
  const [msgErro, setMsgErro] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [loading, setLoading] = useState(false);

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



  const [alertErroMensage, setAlertErroMensage] = useState(false);
  const [alertErroRegister, setAlertErroRegister] = useState(false);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMensage, setShowMensage] = useState(false);

  const [showPhoto, setShowPhoto] = useState(false);


  const [edit, setEdit] = useState(false);
  const [ativostatus, setAtivostatus] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  let [usuarios, setUsuarios] = useState<iUsuarios[]>([]);
  const [usuariosget, setUsuariosget] = useState<iUsuarios[]>([]);
  let [usuariosCount, setUsuariosCount] = useState<iUsuarios[]>([]);
  let [usuariosFilter, setUsuariosFilter] = useState<iUsuarios[]>([]);
  let [totalPaginas, setTotalPaginas] = useState(0);

   const handleClose = () => setShow(false);
   const handleCloseEdit = () => setShowEdit(false);
   const handleCloseMensage = () => setShowMensage(false);
   const handleClosePhoto = () => setShowPhoto(false);
   const [loadingCreate, setLoadingCreate] = useState(false);
   const [loadingUpdate, setLoadingUpdate] = useState(false);
   const [search, setSearch] = useState('');
   let [imageURL, setImageURL] = useState('');

   const [searchStatus, setSearchStatus] = useState('');
   const [filter, setFilter] = useState(false);
   let [idUsuario, setIdUsuario] = useState(0);

   const [image, setImagem] = useState('');

   const [file, setFile] = useState<any>();
   const handleUploadFile = (e: any) => setFile(e.target.files[0]);

   const [imgURL, setImgURL] = useState('');
   const [progress, setProgress] = useState(0);
   const[userInfo, setuserInfo] = useState('');

   const [userImageEdit, setUserImageEdit] = useState(false);
  const [imgUser, setImgUser] = useState<any>({});
  let [imgPerfil, setImgPerfil] = useState<IFile>();
  const [newImgPerfil, setNewImgPerfil] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    GetUsuarioId();
    GetUsuarioByName();
  },[]);




  function handleShowMensage(){

    setShowMensage(true);
    setTimeout(function() {

   //   setShowMensage(false);

     }, 1200);
  }

  const handleImgChange = useCallback((file: File) => {
    setUserImageEdit(false);

    let preview = URL.createObjectURL(file)

    setImgUser({
      preview,
      raw: file,
    });
    const newUploadedFiles: IFile = {
      file: file,
    //  id: uuidv4(),
    
      preview,
      progress: 0,
      uploaded: false,
      error: false,
      url: "",
    };
    imgPerfil = newUploadedFiles;

    setImgPerfil(newUploadedFiles);
    // setTestee(setImgPerfil)

    if (!userImageEdit) {
      setNewImgPerfil(true);
      // setEditar(true);
    }
    handleClosePhoto();
  }, []);

  //============ get usuario por userName ============================//
  async function GetUsuarioByName() {
    setLoading(true);
    await api
      .get(`/api/Usuario/userName?name=${userLog.username}`)
      .then((response) => {
          setImageURL(response.data[0].imagemURL);
          imageURL=response.data[0].imagemURL;
          setLoading(false);

        console.log('userimage',imageURL);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Ocorreu um erro");
      });
  }

   //=========== get usuario por ID ==================================//
   async function GetUsuarioId() {
    setLoading(true);
    const id = userLog.id;
    console.log(id)
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
      .get(`/api/Usuario/${id}`)
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
          setLoading(false);
       // console.log('usuario Id',usuariosget);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Ocorreu um erro");
      });
  }
  //============ Editar Usuario ===============================//
  async function editUser(){
    setLoading(true);
    setLoadingUpdate(true)
  await api.put(`/api/Usuario/${idUser}`, {
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
     GetUsuarioId();
     setLoading(false);
      setLoadingUpdate(false)
     // console.log('resposta', response)
      handleShowMensage()
      setAlertErroMensage(true);
      setMsgErro("Dados do usuário atualizados com sucesso.");
    })
    .catch((error) => {
      setLoading(false);
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
  function SelecionarImg(){
    document.getElementById("dropimg")?.click();


  }

   //======== salvado imagem ==================================================//

   const handleInputChange = (event:any) =>{
    setuserInfo(event.target.files[0]);

   }
   async function handleSubmit(e: any) {
    e.preventDefault();
    const data = new FormData();
    data.append("FormFile", file);
   console.log("foto",file)

    await api
      .post(`/api/Usuario/UploadImage/?name=${usuario}`, {
        file,
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }


   async function UploadImage() {

    setLoading(true);


    // new FormData();
    // formdata.append('avatar', userInfo);
    // console.log('image', formdata)
     await api.post(`/api/Usuario/UploadImage/?name=${usuario}`
     )
      .then((response) => {
     console.log(response.data)

    setLoading(false);
    })
     .catch((error) => {
      setLoading(false);
       setAlertErro(true);
     const  data  = error.response.data;
    setMsgErro(data);
     return;

     });
    }



    //==========================================================//
  return (
    <>


      <div className='content-global'>

        <div className='conteudo-cotainner'>
         <div className=''>
         <SideNavBar/>
         </div>
         <NavbarDashHeader/>
         <div className='titulo-page'>
            <h1>Meu Perfil</h1>
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
            <div style={{justifyContent:'center'}} className="containPerfil d-flex">
            <div className='logo-perfil'></div>

            <div className='conteudo-perfil'>
            <div className='conteudo-usercad'>
            <img src={imageURL} alt=""className="imagem-user-name" 
            // onClick={()=>setShowPhoto(true)}
            />
            {/* <img src={PhotoUser} alt="" width={200} /> */}
            {/* <h6 style={{fontSize: 12, marginTop: 20, textAlign:"center"}}>Clique para alterar a imagem</h6> */}
            {/* <input id='dropimg' type='file' name='uploade_file' onChange={handleInputChange}/> */}
            {/* <input id='dropimg' type="file" onChange={handleUploadFile} /> */}
            {/* <input type="file" onChange={handleUploadFile} />
            <button onClick={handleSubmit}>Enviar</button> */}
           {/* <input id='dropimg' type='file' name='image' onChange={(e:any) => {setImagem(e.target.files[0]); console.log("imagem",image)}}/> */}

          </div>
        <div className='form-cadastro-perfil' >
            <div className='coluna-dupla'>
            <div  className='bloco-input'>
            <p className="title-input"  >Primeiro Nome: </p>
              <input className='form-control inputlogin'
              id=''
              type="text"
              //name='user'
              value={primeiroNome}
              //onKeyDown={LimparErro}
              onChange={(e)=>{
                setPrimeiroNome(e.target.value);
              }}

              />
            </div>
            <div  className='bloco-input'>
            <p className="title-input" >Nome Completo: </p>
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
                setFuncao(e.target.value);
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
             maxLength={15}
              value={telefone?phoneMask(telefone):telefone}
             // onKeyDown={LimparErro}
              onChange={(e)=>{
                setTelefone(e.target.value.toLowerCase());
              }}

              />
            </div>

            </div>
            <div className='coluna-dupla'>

            {/* <div  className='bloco-input'>
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
            </div> */}
            <div className='bloco-input'>
            <p className=" title-input"  >Grupo de Acesso: <span style={{color:'red'}}>*</span></p>
            {grupo=="1"?(<>
              <select className="form-select select campo-select"
            aria-label="Escolha o número de quartos"
            value={grupo}
            disabled
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
              <select className="form-select select campo-select"
            aria-label="Escolha o número de quartos"
            value={grupo}
            disabled
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
            <button disabled={loadingUpdate} style={{marginTop: 50}} id='btn-desck' className='btn btn-cadastrar 'onClick={editUser}>Editar</button>

            </div>
                    {/* <div  className='bloco-input '>
                    <p className=" title-input"  >Acesso Personalizado: </p>
                    <div className='acesso-personalizado-perfil'>

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
                    <button disabled={loadingUpdate} type='button' id='btn-mob' className='btn btn-cadastrar' onClick={handleCloseEdit}>Editar</button>

            </div>

         </div>
         </div>
          )}
        </div>
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
      <Modal className='modal-img' show={showPhoto} onHide={handleClosePhoto}>
         <Modal.Header  closeButton>
          <h1 style={{fontSize: 25}}>Atualizar foto Perfil</h1>
        </Modal.Header> 
        <Modal.Body>
        <Perfil ref={fileRef} onChange={handleImgChange} />
        </Modal.Body>

      </Modal>

      </div>

      <Footer/>
    </>

  );
}
