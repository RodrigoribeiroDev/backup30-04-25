import '../Forms/Register.css'
import {Link} from "react-router-dom"

import ShowPasswordButton from '../Others/ShowPasswordButton';
import { useContext, useState } from 'react';
import { MyContext } from '../Context/MyContext';

const Register = () => {

    const { show } = useContext(MyContext)
    const [ password, setPassword ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ checkbox, setCheckbox ] = useState(false);
    
    const validatePassword = (e) => {
        e.preventDefault();

        if(email === "" || name === "" || password === ""){
            setMessage("Preencha todos os campos!")
            setTimeout(() => {
                setMessage("")
            }, 3000);
            return
        }
        else if(password.length < 8) {
            setMessage("Senha deve conter no mínimo 8 dígitos!");
            setTimeout(() => {
                setMessage(""); 
            }, 3000)
            return
        } 
        else if(!checkbox){
            setMessage("Aceite os Termos para continuar!")
            setTimeout(() => {
                setMessage("")
            }, 3000);
            return
        }
         else {
             setMessage("Cadastrado com Sucesso!");
             setTimeout(() => {
             setMessage("");
             }, 3000);
        }

        setPassword("");
        setEmail("");
        setName("");
        setCheckbox(false);
    }
    
  return (
    <div>
        <form action="https://api.sheetmonkey.io/form/nbcbYxxDyZAFfsX7EzaxtN" method="post">
            <div className='containerRegister'>

                <input type="text" 
                placeholder='Digite seu nome completo'
                className='iptRegister'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <input type="email" 
                placeholder='Digite um e-mail válido'
                className='iptRegister'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input type={ show ? "text" : "password"}
                placeholder='Crie uma senha mínimo 8 dígitos'
                className='iptRegister'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <div className='btnShowPassword'>
                <ShowPasswordButton />
                </div>
               

                <div className='terms'>

                <input type="submit" 
                className='btn-send'
                onClick={validatePassword}
                />

                <div className='message'>
                {message}
                </div>
    
                <span>
                <input 
                type="checkbox" 
                onChange={(e) => setCheckbox(e.target.checked)}
                checked={checkbox}
                /> Li e aceito os <Link className='terms-link' to="/terms">Termos</Link></span> 

                </div>
                

            </div>
        </form>
    </div>
  )
}

export default Register
