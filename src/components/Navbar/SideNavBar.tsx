import React, { useState, useEffect } from "react";
import "../../styles/Navbar/SideNavBar.scss";
import { MdArrowForwardIos, MdMenuBook, MdOutlineAdminPanelSettings, MdOutlinePriceChange, MdTableView } from "react-icons/md";

import "../../styles/Navbar/navbarDashDark.scss";
import { Link } from "react-router-dom";
import { AiOutlinePieChart,AiOutlineUsergroupAdd } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { BsBuilding, BsPlusSquare,BsFillFileEarmarkRichtextFill,BsCardImage, BsMenuButtonWideFill } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { BsCoin } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaHospitalUser, FaLayerGroup,FaIndustry } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { RiPagesLine, RiShoppingBag3Line } from "react-icons/ri";
import { TbBusinessplan } from "react-icons/tb";
import api from '../../services/api';

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { MdOutlineAppRegistration } from "react-icons/md";
import { iDadosUsuario, iMenu, iPaginas } from '../../@types';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GrTableAdd } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


export default function SideNavBar() {
	const [isExpanded, setExpendState] = useState(false);
    const [espand, setespand] = useState(false);
    const [menuExpanded, setmenuExpendState] = useState(false);
    const [menuBar, setMenuBar] = useState(false);
    const [menuFotos, setmenuFotos] = useState(false);
    const [textMenu, settextMenu] = useState(true);
    const [active, setMode] = useState(false);
    const [openTrade, setOpenTrade] = useState(false);
    const [filter, setFilter] = useState(false);
    let [menuPrincipal, setMenuPrincipal] = useState<iMenu[]>([]);
    let [paginasMenu, setPaginasMenu] = useState<iPaginas[]>([]);
    const [pagina, setPagina] = useState(1);
    const [qtdePagina, setQtdePagina] = useState(10);
    let [totalPaginas, setTotalPaginas] = useState(0);
    const menuGet =localStorage.getItem('@Portal/usuario/atualiza-menu')
    const [icone, setIcone] = useState('fa fa-eye');

   
    

    const usuario: iDadosUsuario = JSON.parse(
      localStorage.getItem("@Portal/usuario") || "{}"
    );

    const ToggleMode = () => {
      setMode(!active);
    };
    useEffect(() => {
      window.scrollTo(0, 0);
     if(localStorage.getItem('@Portal/usuario/atualiza-menu')=='1'){
      GetMontarMenu();
     }

    });
    

    useEffect(() => {
      window.scrollTo(0, 0);
      GetMontarMenu();

    },[pagina]);

    async function GetMontarMenu() {
      setFilter(false);
      localStorage.removeItem('@Portal/usuario/atualiza-menu')
      await api
      
        .get(`/api/Menu?pagina=${pagina}&totalpagina=${qtdePagina}`)
        .then((response) => {
      
          setMenuPrincipal(response.data.data);
          menuPrincipal=response.data.data;
          console.log("menu principal",menuPrincipal)
          
       
          setTotalPaginas(Math.ceil(response.data.total / qtdePagina));
     
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
       
    }




    function MenuMob(){
        if(!menuExpanded){
            setmenuExpendState(true)
        }else{
            setmenuExpendState(false)
        }
    }

    function textVisual() {
        if(!isExpanded){
           setTimeout(function() {
            
            setespand(true)
            
           }, 300);
        }
        else{
            setespand(false)
        }
        }


        function TextMenu() {
          if(!isExpanded){
             setTimeout(function() {
              
              setespand(true)
              
             }, 300);
          }
          else{
            
          }
          }
         

    function sumirtexto(){
        if(menuBar){
          settextMenu(true);
        }
      else{
        settextMenu(false);
      }
    }
    function Trade(){
      if(openTrade){
        setOpenTrade(false);
      }else{
        setOpenTrade(true);
      }
    }
	
	return (
        <div className={menuExpanded?"menuEspand":"menuNoEspand"}>
 
		<div 
			className={
				isExpanded
					? "side-nav-container slad-nav-active"
					: "side-nav-container side-nav-container-NX slad-nav-active "
			}
		>
           
        
            <label
          id="sidebarToggleTop "
          htmlFor="sidebar-toogle"
          className="btn btn-link menu-mobiledmin"
          onClick={MenuMob}
        >{menuExpanded?(<> <IoIosClose fontSize={45} style={{color: "#fff"}} /></>)
        :(<><GoThreeBars fontSize={30} style={{color: "#000"}} /></>)}
          
        </label> 
			<div className="nav-upper">
				<div className="nav-heading">
	 
      <label onClick={sumirtexto} htmlFor="sidebar-toogle" className="arrow-bar">
          <MdArrowForwardIos fontSize={24} color={"#7A7A7A"} />
        </label>
					<button
						className={
							isExpanded ? " arrow-bar  hamburger-in" : "arrow-bar hamburger-out"
						}
						onClick={() => {setExpendState(!isExpanded);textVisual();setOpenTrade(false);}}
					>
						<MdArrowForwardIos fontSize={24} color={"#7A7A7A"} />
						
					</button>
				</div>
					
                    <div className="sidebar-menu">
          <ul>
           {/* ============inicio do menu ==================================================== */}

            <li className="menuInterativo">
          {menuPrincipal.length>0?(<>
            {menuPrincipal.map((menu,index)=> (<>
            <li style={{marginTop:30}}>
             <Accordion className={isExpanded?"menuAberto":"menuFechado"} defaultActiveKey="0" flush key={index}>
               <Accordion.Item eventKey="">
              
                 <Accordion.Header 	onClick={() => {setExpendState(true);TextMenu()}}>
                 <span className="menus-nav"><span id="icon-menu"  className={menu?.icon}/>{espand && (
                   <span className="nome-menu">{menu?.nome}</span>)}</span> 
                   </Accordion.Header>
         
                 <Accordion.Body>
                  {menu.subMenu[0]?.codigo>0?(<>
                    {menu.subMenu.map((menu,index)=> (<>
                    <Accordion className={isExpanded?"menuAberto":"menuFechado"} defaultActiveKey="0" key={index} flush>
               <Accordion.Item eventKey="">
                 
                 <Accordion.Header 	onClick={() => {setExpendState(true);TextMenu()}}>
                    
                    <span  className="menus-nav">
                    <span id="icon-sub-menu"  className={menu?.icon}/>
                    {espand && (
                   <span className="nome-menu">{menu?.nome}</span>)}
                   </span>

                  </Accordion.Header>
         
                 <Accordion.Body>
                    
                    <div>
                        {menu.pagina?.map((pagina)=>(<>
                        <Link style={{display:"flex", marginLeft:10}} 
                              to={pagina?.url}>
                          <span  className="menus-nav"><span id="icon-sub-menu"  className={pagina?.icon}/>
                          <span className={isExpanded?'visivel':'invisivel'} >{pagina?.nome}</span></span> 
                        </Link> 
                        </>))} 
                    </div>
                 
                 </Accordion.Body>
         
               </Accordion.Item>
             </Accordion> </>))}
                  </>):(<>
                  
                    {menu.pagina.map((pagina)=>(<>
                         <Link style={{display:"flex", marginLeft:10}} 
                          to={pagina?.url}>
                          <span className="menus-nav"><span id="icon-menu"  className={pagina?.icon}/>
                          <span style={{fontSize:17}} className="nome-menu">{pagina?.nome}</span></span> 
                       </Link> 
                     </>))}
                    </>)}
                      
                 
                 </Accordion.Body>
         
               </Accordion.Item>
             </Accordion> 
             </li>
             </>))} 
          </>):(<>
                <ul>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/montar-menu">
                <span>
                  <BsMenuButtonWideFill id="" fontSize={23} />
                </span>
              
                <span className={isExpanded?'visivel':'invisivel'} style={{marginLeft:12,marginTop:6}}>Montar Menu</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-de-paginas">
                <span>
                  <RiPagesLine id="" fontSize={23} />
                </span>
              
                <span className={isExpanded?'visivel':'invisivel'} style={{marginLeft:12,marginTop:6}}>Cadastro de Paginas</span>
               
              </Link>
                </li>
                </ul>
            </>)}  
            </li>
           

            {/* ======================================================================================= */}
            
            

             {usuario.grupoId==1?(<>
              {/* <li>
              <Link to="/cadastro-usuarios">
                <span>
                {/* <FontAwesomeIcon icon={icon} /> 
               <AiOutlineUsergroupAdd id="logo1" fontSize={35}  /> 
                </span>
                {espand && (
                <span>Usuários</span>
                )}
                <span className="textmobile">Usuários</span>
              </Link>
            </li> */}
            </>):(<></>)}
            
           
            {/* {usuario.grupoId==1 ||usuario.grupoId==2?(<>
             <li>
              <Link onClick={Trade} to="">
                <span>
                  <MdOutlineAppRegistration id="logo2" fontSize={28} />
                </span>
                {espand && (
                 <span>Cadastros</span> 
                )}
                <span className="textmobile">Cadastros</span>
              </Link>
            </li> 
             </>):(<></>)} */}
             {/* <div  className={openTrade?"submenu-cad menu-cadastros":"submenu-cad menu-no-cadastros"}>
              <ul>
              <li>
              <Link style={{display:"flex"}} onClick={Trade}  to="/cadastro-usuarios">
                <span>
              
               <AiOutlineUsergroupAdd id="logo1" fontSize={35}  /> 
                </span>
                <span className="textmobile">Usuários</span>
              </Link>
            </li>
                <li> 
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-parceiros">
                < span>
                  <FiUsers id="" fontSize={28} />
                </span>
                <span style={{marginLeft:8,marginTop:6}}>Parceiros</span>
              </Link>
              </li> 
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-vendedores">
                <span>
                  <FaHospitalUser id="" fontSize={28} />
                </span>
               
                <span style={{marginLeft:8,marginTop:6}}>Vendedores</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-grupos-produtos">
                <span>
                  <FaLayerGroup id="" fontSize={28} />
                </span>
                
                <span style={{marginLeft:8,marginTop:6}}>Grupos de Produtos</span>
              
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-produtos">
                <span>
                  <TiShoppingCart id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Produtos</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-concorrentes">
                <span>
                  <RiShoppingBag3Line id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Concorrentes</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/produtos-concorrentes">
                <span>
                  <TiShoppingCart id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Produto x Concorrente</span>
               
              </Link>
                </li>
                
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-tipo-negociacao">
                <span>
                  <TbBusinessplan id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Tipo de Negociação</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/tabela-de-preco">
                <span>
                  <MdOutlinePriceChange id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Tabela de Preço</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-tipo-empresa">
                <span>
                  <FaIndustry id="" fontSize={25} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Cadastro de Empresas</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/tabela-de-preco-cliente">
                <span>
                  <MdTableView id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Tabela de Preço Cliente</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/cadastro-de-paginas">
                <span>
                  <MdMenuBook id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Páginas Base</span>
               
              </Link>
                </li>
                <li>
                <Link style={{display:"flex"}} onClick={Trade} to="/montar-menu">
                <span>
                  <BsMenuButtonWideFill id="" fontSize={28} />
                </span>
              
                <span style={{marginLeft:8,marginTop:6}}>Montar Menu</span>
               
              </Link>
                </li>
              </ul>
              
              </div>   */}
             {usuario.grupoId==1?(<>
            {/* <li>
              <Link to="">
                <span>
                  <FaIndustry fontSize={24} id="logo3" />
                </span>
                {espand && (
                <span>Trade</span> 
                )}
                <span className="textmobile">Trade</span>
              </Link>
            </li> */}
            </>):(<></>)}
            {usuario.grupoId==1?(<>
            {/* <li>
              <Link to="">
                <span>
                  <BsCoin id="logo4" fontSize={28} />
                </span>
                {espand && (
                 <span>Vendas</span> 
                )}
                <span className="textmobile">Vendas</span>
              </Link>
            </li> */}
            </>):(<></>)}
             
      

       
            
           
          </ul>
        </div>
				</div>

			</div>
</div>
	
    );
};


