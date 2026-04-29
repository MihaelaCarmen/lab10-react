import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="pagina notFound">
      <h1>404</h1>
      <h2>Pagina nu a fost gasita</h2>
      <p>Ne pare rau, adresa pe care ai accesat-o nu exista.</p>
      <div className="btnGrup">
        <button onClick={() => navigate(-1)} className="btnSecundar">← Inapoi</button>
        <Link to="/" className="btn">Acasa</Link>
      </div>
    </div>
  )
}
