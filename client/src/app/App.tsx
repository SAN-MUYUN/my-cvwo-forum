
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcomepage from './Welcome/welcomepage'
import Dashboard from './Dashboard/Dashboard'
import SignUpPage from './SignUp/SignUp'
import { MyPostPage } from './Dashboard/MyPost/MyPostPage'

function App() {
  const links = [
    {path: '/', element: <Welcomepage/>},
    {path: '/dashboard', element: <Dashboard/>},
    {path:'/signup', element: <SignUpPage/>},
    {path:'/dashboard/mypost', element:<MyPostPage/>}
  ]
  return (
    <Router>
      <Routes>
      {links.map((link) => (
          <Route key={link.path} path={link.path} element={link.element} />
        ))}
      </Routes>
    </Router>
  )
  
}

export default App
