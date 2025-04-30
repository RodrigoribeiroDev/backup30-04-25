import { useState, createContext } from "react";

export const MyContext = createContext();


export const MyProvider = ({children}) => {

  const [ show, setShow ] = useState(false);

  const change = (e) =>{
    e.preventDefault()
    setShow(!show)
  }

    return(
        <MyContext.Provider value={{show, change }}>
            {children}
        </MyContext.Provider>
    )
}

