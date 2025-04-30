import '../pages/Footer.css'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='containerFooter'>
          <div>
        <ul className='iconsFooter'>
            <li><FaSquareFacebook size={30}/></li>
            <li><FaInstagram size={30}/></li>
            <li><FaYoutube size={30}/></li>
            <li><FaXTwitter size={30}/></li>
        </ul>
        
    </div>
        <div>
        <ul>
        <li><h4>Institucional</h4></li>
        <li><h5>Sobre Nós</h5></li>
        <li><h5>Nossos Departamentos</h5></li>
        <li><h5>Privacidade e Segurança</h5></li>
        <li><h5>Termos e Condições</h5></li>
     </ul>
        </div>
     <div>
     <ul>
        <li><h4>Central de Ajuda</h4></li>
        <li><h5>Fale Conosco</h5></li>
        <li><h5>Formas de Pagamento</h5></li>
        <li><h5>FAQ</h5></li>
        <li><h5>Telefone</h5></li>
     </ul>
     </div>

    <p>&copy; 2025 Furia Esports. Todos os direitos reservados.</p>
    </div>
  )
}

export default Footer
