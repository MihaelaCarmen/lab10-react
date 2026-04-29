import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Istoric() {
  const { istoric, stergeIstoric } = useApp()

  return (
    <div className="pagina">
      <h1>Istoric navigare</h1>
      <p>Ultimele {istoric.pagini.length} pagini vizitate.</p>

      {istoric.pagini.length === 0 && (
        <p>Nu ai vizitat inca nicio pagina din documentatie.</p>
      )}

      <ul className="listaPagini">
        {istoric.pagini.map((intrare, index) => (
          <li key={index} className="itemPagina">
            <Link to={intrare.url}>{intrare.titlu}</Link>
            <span className="urlMic">{intrare.url}</span>
          </li>
        ))}
      </ul>

      {istoric.pagini.length > 0 && (
        <button onClick={stergeIstoric} className="btnPericol">Sterge istoricul</button>
      )}
    </div>
  )
}
