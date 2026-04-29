import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Login() {
  const { seteazaLogat } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const de_unde = location.state?.from?.pathname || '/docs'

  function handleLogin() {
    seteazaLogat(true)
    navigate(de_unde)
  }

  return (
    <div className="pagina loginPagina">
      <h1>Acces restrictionat</h1>
      <p>Aceasta sectiune necesita autentificare.</p>
      <p>Dupa login vei fi redirectionat la: <strong>{de_unde}</strong></p>
      <button onClick={handleLogin} className="btn">Intra in cont</button>
    </div>
  )
}
