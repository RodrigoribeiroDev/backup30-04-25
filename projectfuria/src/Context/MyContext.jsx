import { useState, useEffect, createContext } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    id: null,
    name: "",
    photo: null,
    spotify: "",
    online: false,
    city: "",
    state: ""
  });

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const change = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const updateUserOnlineStatus = (userId, status) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId ? { ...u, online: status } : u
      )
    );
  };

  useEffect(() => {
    if (user.id !== null) {
      setUsers((prevUsers) => {
        const exists = prevUsers.some((u) => u.id === user.id);
        if (!exists) {
          return [...prevUsers, user];
        }
        return prevUsers;
      });
    }
  }, [user]);

  const addMessage = (messageData) => {
    setMessages((prev) => [...prev, messageData]);
  };

  return (
    <MyContext.Provider
      value={{
        show,
        change,
        user,
        setUser,
        users,
        setUsers,
        messages,
        setMessages,
        addMessage, 
        updateUserOnlineStatus
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
