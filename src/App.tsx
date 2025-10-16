import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginView from "./components/view/LoginView"
import ForgotPasswordView from "./components/view/ForgotPasswordView"
import OtpView from "./components/view/OtpView"
import ChangePasswordView from "./components/view/ChangePasswordView"
import { PasswordSuccessView } from "./components/view/PasswordSuccessView"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/otp-view" element={<OtpView />} />
        <Route path="/change-password" element={<ChangePasswordView />} />
        <Route path="/password-success" element={<PasswordSuccessView onDoneClick={function (): void {
          throw new Error("Function not implemented.")
        } } message={""} />} />
      </Routes>
    </Router>
  )
}

export default App