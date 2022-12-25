import '../styles/components-styles/Footer.scss';
import '../styles/global.scss';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";


export default function Footer() {

    return (
        <>
            <div className='content-footer'>
                <div>
                <div className="social" >
                    <a className="redes"  target="_blank" href="https://pt-br.facebook.com/grupoalynecosmeticos/">
                    <BsFacebook fontSize={25} /> </a>

                    <a className="redes"  target="_blank" href="https://www.instagram.com/grupoalynecosmeticos/">
                    <BsInstagram fontSize={25} /> </a>

                    <a className="redes"  target="_blank" href="https://www.linkedin.com/company/grupoalynecosmeticos/">
                    <BsLinkedin fontSize={25} /> </a>

                    <a className="redes"  target="_blank" href="https://www.youtube.com/channel/UCX4t2MySUE_-dIM5OV5gmYA">
                        <BsYoutube fontSize={25} /> </a>
                </div>
                </div>
            </div>
        </>

    );
}
