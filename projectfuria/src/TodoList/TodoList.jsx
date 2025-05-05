import { useState } from 'react'
import '../TodoList/TodoList.css'

const TodoList = () => {

  const [ itens, setItens ] = useState([]);
  const [ inputValue, setInputValue ] = useState("");

  const add = () =>{
      setItens([...itens, inputValue])
      setInputValue("")
  }
  const remove = (removeItem)=>{
    setItens((itens.filter((item) => item !== removeItem)))
  }

  return (
    <div className='containerTodoList'>

      <input type="text"
       placeholder='Adicione um interesse a seu perfil'
       onChange={(e) =>setInputValue(e.target.value)}
       value={inputValue}
       />
       <button onClick={add} className='btn-add'>+</button>
       <div>
        <ul>

          {
            itens.map((item) =>(
          <li key={item}>#{item}<button className="btn-remove" onClick={() =>remove(item)}>-</button>
              
          </li>
        ))
         }
        </ul>
       </div>
      

    </div>
  )
}

export default TodoList
