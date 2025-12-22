
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Landing/landingPage'
import SignUp from './pages/Auth/Signup'
import Login from './pages/Auth/login'
import UserDashboard from './pages/dashboard/userDashboard'
import OverView from './pages/dashboard/overview'
import Projects from './pages/dashboard/projects'
import Profile from './pages/dashboard/profile'
import Tasks from './pages/dashboard/tasks'

function App() {

  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<LandingPage/>} />
       <Route path='/signup' element={<SignUp/>} />
       <Route path='/login' element={<Login/>} />

       <Route path='/userDashboard' element={<UserDashboard/>} >
          <Route index element={<OverView/>} />
          <Route path='overview' element={<OverView/>} />
          <Route path='projects' element={<Projects/>} />
          <Route path='tasks' element={<Tasks/>} />
          <Route path='profile' element={<Profile />} />
       </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
