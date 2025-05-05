import Chat from "./Chat"
import '../pages/CSS/Home.css'
import UserSummary from "../Profile/UserSummary"
import SearchUsers from "../Others/SearchUsers"
import TodoList from "../TodoList/TodoList"
import {Link} from 'react-router-dom'


import { FaAngleDoubleRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="containerHome">
       <Link to="/editprofile" 
         className='link-profile'><FaAngleDoubleRight size={12}/> Editar perfil</Link>
      <SearchUsers />
      <Chat />
      <UserSummary />
      <TodoList />
    </div>
  )
}

export default Home
