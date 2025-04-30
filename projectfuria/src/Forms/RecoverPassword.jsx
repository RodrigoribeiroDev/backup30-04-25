import { useState } from 'react'
import '../Forms/RecoverPassword.css'

const RecoverPassword = () => {

    const [ validation, setValidation ] = useState("");
    const [ message, setMessage ] = useState("")

    const validationEmail = (e) =>{
      e.preventDefault()

      if(validation === ""){
        setMessage("Preencha o campo com um e-mail válido!")
        setTimeout(()=>{
          setMessage("")
        }, 3000)
        return
      } 
      else {
        setMessage("Foi enviado um link de redefinição de senha para o e-mail!")
        setTimeout(()=>{
          setMessage("")
        }, 3000)
      }
      setValidation("")
    }

  return (
    <div className='containerRecoverPassword'>
      <form>
        <input type="text"
        className='ipt-recover'
         placeholder='Digite seu e-mail para recuperação de senha'
         value={validation}
         onChange={(e) => setValidation(e.target.value)}
         />

         <input type="submit"
         onClick={validationEmail}
         className='ipt-btn'
         />
         <p>{message}</p>
      </form>

     
      </div>
  )
}

export default RecoverPassword
