import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import {Toaster} from "react-hot-toast"
import HomeOut from './pages/home/HomeOut'
import HomeIn from './pages/home/HomeIn'
import ProtectedRoute from './routes/ProtectedRoute'
import SignUp from './pages/signup/SignUp'
import SignIn from './pages/signin/SignIn'
import ChangePassword from './pages/changepassword/ChangePassword'
import ResetEmailSend from './pages/resetpassword/ResetEmailSend'
import ResetPassword from './pages/resetpassword/ResetPassword'


function App() {


  const router = createBrowserRouter([
    {
      path:'/',
      element:<HomeOut/>,
    },
    {
      path:'/home',
      element:<ProtectedRoute/>,
      children:[
        {
          path:'',
          element: <HomeIn/>,

        },
        {
          path:'changepassword',
          element: <ChangePassword/>,

        },
      ]
    },
  
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/signin',
    element: <SignIn/>,
  },
  {
    path: '/resetemailsend',
    element: <ResetEmailSend/>
  },
  {
    path: '/resetpassword/:id/:token',
    element: <ResetPassword/>,
  },
  
  ])

  return (
   <div>

    <RouterProvider router={router}/>
    <Toaster/>
   </div>
   
  )
}

export default App
