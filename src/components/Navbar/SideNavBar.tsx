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
import { BiUserVoice } from "react-icons/bi";


export default function SideNavBar() {
	const [isExpanded, setExpendState] = useState(false);
    const [espand, setespand] = useState(false);
    const [menuExpanded, setmenuExpendState] = useState(false);
    const [menuBar, setMenuBar] = useState(false);
    const [menuFotos, setmenuFotos] = useState(false);
    const [textMenu, settextMenu] = useState(true);
    const [active, setMode] = useState(false);
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
          settextMenu(true)
        }
      else{
        settextMenu(false)
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
            <li>
              <Link to="/cadastro-usuarios">
                <span>
                  <AiOutlineUsergroupAdd id="logo1" fontSize={35}  />
                </span>
                {espand && (
                <span>Usuarios</span>
                )}
                <span className="textmobile">Usuarios</span>
              </Link>
            </li>
           
             <li>
              <Link to="">
                <span>
                  <BsFillFileEarmarkRichtextFill id="logo2" fontSize={28} />
                </span>
                {espand && (
                 <span>Comercial</span> 
                )}
                <span className="textmobile">Comercial</span>
              </Link>
            </li> 
            
            <li>
              <Link to="">
                <span>
                  <ImUsers fontSize={28} id="logo3" />
                </span>
                {espand && (
                <span>Promotor</span> 
                )}
                <span className="textmobile">Promotor</span>
              </Link>
            </li>
            <li>
              <Link to="">
                <span>
                  <BiUserVoice id="logo4" fontSize={37} />
                </span>
                {espand && (
                 <span>Representante </span> 
                )}
                <span className="textmobile">Representante</span>
              </Link>
            </li>
           
            
           
          </ul>
        </div>
				</div>
			</div>
			
            </div>
	
    );
};

