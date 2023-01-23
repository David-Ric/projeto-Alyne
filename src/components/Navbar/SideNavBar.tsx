import React, { useState } from "react";
import "../../styles/Navbar/SideNavBar.scss";
import { MdArrowForwardIos } from "react-icons/md";

import "../../styles/Navbar/navbarDashDark.scss";
import { Link } from "react-router-dom";
import { AiOutlinePieChart,AiOutlineUsergroupAdd } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { BsBuilding, BsPlusSquare,BsFillFileEarmarkRichtextFill,BsCardImage } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { BsCoin } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaHospitalUser, FaLayerGroup,FaIndustry } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { RiShoppingBag3Line } from "react-icons/ri";

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { MdOutlineAppRegistration } from "react-icons/md";
import { iDadosUsuario, iMenu } from '../../@types';
import { IconProp } from "@fortawesome/fontawesome-svg-core";


export default function SideNavBar() {
	const [isExpanded, setExpendState] = useState(false);
    const [espand, setespand] = useState(false);
    const [menuExpanded, setmenuExpendState] = useState(false);
    const [menuBar, setMenuBar] = useState(false);
    const [menuFotos, setmenuFotos] = useState(false);
    const [textMenu, settextMenu] = useState(true);
    const [active, setMode] = useState(false);
    const [openTrade, setOpenTrade] = useState(false);

    const [menu, setMenu] = useState<iMenu[]>
    ([
      {id:1,menu:"Administrativo",subMenu:
      [{id:5,idMenu:1, menu:"Usuarios",link:"/cadastro-usuarios",icon:""},
      
    ]},
      {id:2,menu:"Cadastros",subMenu:[
        {id:6,idMenu:2,menu:"Parceiros",link:"/cadastro-parceiros",icon:""},
      ]},
     
    ]);
   
    

    const usuario: iDadosUsuario = JSON.parse(
      localStorage.getItem("@Portal/usuario") || "{}"
    );

    const ToggleMode = () => {
      setMode(!active);
    };
    

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
						onClick={() => {setExpendState(!isExpanded);textVisual()}}
					>
						<MdArrowForwardIos fontSize={24} color={"#7A7A7A"} />
						
					</button>
				</div>
				{/* <div className="nav-menu"> */}
					
                    <div className="sidebar-menu">
          <ul>
            {/* <li>
              <Link to="/">
                <span>
                  <AiOutlinePieChart fontSize={28} />
                </span>
                {isExpanded && (
                <span>Dashboard</span>
                )}
              </Link>
            </li> */}
            
            
            

             {usuario.grupo=="1"||usuario.admin==true?(<>
              <li>
              <Link to="/cadastro-usuarios">
                <span>
                {/* <FontAwesomeIcon icon={icon} /> */}
               <AiOutlineUsergroupAdd id="logo1" fontSize={35}  /> 
                </span>
                {espand && (
                <span>Usuários</span>
                )}
                <span className="textmobile">Usuários</span>
              </Link>
            </li>
            </>):(<></>)}
           
            {usuario.grupo=="1" ||usuario.grupo=="2" ||usuario.comercial==true?(<>
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
             </>):(<></>)}
             <div  className={openTrade?"submenu-cad menu-cadastros":"submenu-cad menu-no-cadastros"}>
              <ul>
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
              </ul>
              
              </div>  
             {usuario.grupo=="1"||usuario.admin==true?(<>
            <li>
              <Link to="">
                <span>
                  <FaIndustry fontSize={24} id="logo3" />
                </span>
                {espand && (
                <span>Trade</span> 
                )}
                <span className="textmobile">Trade</span>
              </Link>
            </li>
            </>):(<></>)}
            {usuario.grupo=="1"||usuario.admin==true?(<>
            <li>
              <Link to="">
                <span>
                  <BsCoin id="logo4" fontSize={28} />
                </span>
                {espand && (
                 <span>Vendas</span> 
                )}
                <span className="textmobile">Vendas</span>
              </Link>
            </li>
            </>):(<></>)}
             
      

      {/* {menu.map((menu,index)=> (<>
             
             <Accordion defaultActiveKey="0" flush>
               <Accordion.Item eventKey="">
                 <Accordion.Header 	onClick={() => {setExpendState(true);textVisual()}}>
                 {menu.id==1?(<> <FaIndustry fontSize={24} id="logo3" /></>):(<> <MdOutlineAppRegistration id="logo2" fontSize={28} /></>)}
                 {espand && (
                   <span>{menu.menu}</span>)}
                   
                   </Accordion.Header>
         
                 <Accordion.Body>
                 <Link style={{display:"flex"}} 
                          to={menu.subMenu[0].link}>
                       < span>
                       {menu.subMenu[0].id==5?(<><AiOutlineUsergroupAdd id="logo1" fontSize={35}  /></>):(<><FiUsers id="" fontSize={28} /></>)}
                         
                         
                       </span>
                       <span style={{marginLeft:8,marginTop:6}}>{menu.subMenu[0].menu}</span>
                     </Link>
                 </Accordion.Body>
         
               </Accordion.Item>
             </Accordion> </> ))} */}
            
           
          </ul>
        </div>
				</div>

			</div>
</div>
	
    );
};


