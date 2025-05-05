import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MyProvider } from './Context/MyContext';

import Form from './Forms/Form.jsx'
import Terms from './Others/Terms.jsx';
import Register from './Forms/Register.jsx'
import './index.css'
import App from './App.jsx'
import RecoverPassword from './Forms/RecoverPassword.jsx';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import EditProfile from './Profile/EditProfile.jsx';
import UserSummary from './Profile/UserSummary.jsx';
import TodoList from './TodoList/TodoList.jsx';

const router = createBrowserRouter([
 { 
  path: "/",
  element: <App />,
  children:[
    { path: "", element: <Form />},
    { path: "/register", element: <Register />},
    { path: "/terms", element: <Terms />},
    { path: "/recoverpassword", element: <RecoverPassword />},
    { path: "/home", element: <Home />},
    { path: "/chat", element: <Chat />},
    { path: "/editprofile", element: <EditProfile />},
    { path: "/usersummary", element: <UserSummary />},
    { path: "/todolist", element: <TodoList />},

  ]}
])
createRoot(document.getElementById('root')).render(
  <MyProvider> 
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </MyProvider>
)
