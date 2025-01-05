
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcomepage from './Welcome/welcomepage'
import HomePage from './home/home'
import SignUpPage from './SignUp/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcomepage />}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/signUp' element = {<SignUpPage/>}/>
      </Routes>
    </Router>
  )
  
}

export default App
