import '../Others/ShowPasswordButton.css'
import { useContext } from 'react'
import { MyContext } from '../Context/MyContext';

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const ShowPasswordButton = () => {
     const { show, change } = useContext(MyContext);
  return (
    <div className='containerShowPasswordButton'>
       <button 
        onClick={change}>
         { show ?  <FaRegEye size={25}/> : <FaRegEyeSlash size={25}/> }
       </button>
    </div>
  )
}

export default ShowPasswordButton
