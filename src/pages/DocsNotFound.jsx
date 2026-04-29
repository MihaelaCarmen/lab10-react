import { useNavigate, Link } from 'react-router-dom'

export default function DocsNotFound() {
  const navigate = useNavigate()

  return (
    <div className="pagina notFound">
      <h2>404 - Pagina docs inexistenta</h2>
      <p>Aceasta ruta nu exista in documentatie.</p>
      <p>Verifica URL-ul sau alege o pagina din sidebar.</p>
      <div className="btnGrup">
        <button onClick={() => navigate(-1)} className="btnSecundar">← Inapoi</button>
        <Link to="/docs" className="btn">Inapoi la Docs</Link>
      </div>
    </div>
  )
}
