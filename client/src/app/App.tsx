
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcomepage from './Welcome/welcomepage'
import Dashboard from './Dashboard/Dashboard'
import SignUpPage from './SignUp/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcomepage />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signUp' element = {<SignUpPage/>}/>
      </Routes>
    </Router>
  )
  
}

export default App
