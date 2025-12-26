import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Dashboard/Home/Home'
import Tracking from './pages/Dashboard/Tracking/Tracking'
import HealthReport from './pages/Dashboard/HealthReport/HealthReport'

function App() {

  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/health-report" element={<HealthReport />} />
    </Routes>

  )
}

export default App
