import { useParams, Link, Navigate } from 'react-router-dom'
import toatePaginile from '../data/pagini.json'

export default function Sectiune() {
  const { sectiune } = useParams()

  const paginile = toatePaginile.filter(p => p.sectiune === sectiune)

  if (paginile.length === 0) {
    return <Navigate to="/docs" replace />
  }

  return (
    <div className="pagina">
      <h1>{sectiune.charAt(0).toUpperCase() + sectiune.slice(1)}</h1>
      <p>Aceasta sectiune contine {paginile.length} pagini.</p>
      <ul className="listaPagini">
        {paginile.map(pagina => (
          <li key={pagina.id} className="itemPagina">
            <Link to={'/docs/' + sectiune + '/' + pagina.id}>
              <strong>{pagina.titlu}</strong>
              <div className="taguri">
                {pagina.taguri.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
