import '../pages/Navbar.css'
import {Link} from 'react-router-dom'

import { FaAngleDoubleRight } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='containerNavbar'>
      <img src="/furiaNavbar.png" alt="Furia esports"/>
     <Link to="/" className='link-home'><FaAngleDoubleRight size={12}/> Página inicial</Link>
      
    </div>
  )
}

export default Navbar
