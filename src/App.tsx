import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginView from "./components/view/LoginView"
import ForgotPasswordView from "./components/view/ForgotPasswordView"
import OtpView from "./components/view/OtpView"
import "./App.css"

function App() {
  const email = "user@iprima.edu"

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/otp" element={<OtpView email={email} />} /> {}
      </Routes>
    </Router>
  )
}

export default App