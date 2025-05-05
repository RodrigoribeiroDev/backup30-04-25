import '../Forms/Form.css'
import {Link} from "react-router-dom"
import { useContext } from 'react';

import { GrGoogle } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { MyContext } from '../Context/MyContext';
import ShowPasswordButton from '../Others/ShowPasswordButton';



const Form = () => {

  const { show } = useContext(MyContext);

  return (
    <div>
        <form action="" className='containerForm'>

         <input type="text" 
         className='ipt'
         placeholder='Digite seu E-mail'/>

         <input type={ show ? "text" : "password"}
         className='ipt'
         placeholder='Digite sua Senha'
         />

         <ShowPasswordButton />

        
         <Link to="/recoverpassword" className='link'>Esqueceu a senha?</Link>
        
        <div className='containerBtn'>

         <Link to="/home" 
         className='link-home'>
         <input type="submit" 
         value="Entrar" 
         className='btn-enter'/>
         </Link>

         <Link to="/register"
         className='link-register'
         >
         <input type="submit" 
         value="Cadastre-se" 
         className='btn-register'/>
         </Link>
         

        <div className='icons-login'>
          <p>Ou entrar com</p>
          <a>
          <GrGoogle size={22}/>
          <FaGithub size={22}/>
          <FaFacebook size={22}/>
           </a>
        </div>
         
        </div>
        
        </form>
     
    </div>
  )
}

export default Form
