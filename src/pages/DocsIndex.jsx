import { Link } from 'react-router-dom'
import toatePaginile from '../data/pagini.json'
import { useMemo } from 'react'

export default function DocsIndex() {
  const sectiuni = useMemo(() => {
    const lista = []
    for (let i = 0; i < toatePaginile.length; i++) {
      if (!lista.includes(toatePaginile[i].sectiune)) {
        lista.push(toatePaginile[i].sectiune)
      }
    }
    return lista
  }, [])

  return (
    <div className="pagina">
      <h1>Documentatie NovaUI</h1>
      <p>Alege o sectiune din sidebar sau de mai jos pentru a incepe.</p>

      <div className="carduri">
        {sectiuni.map(sectiune => {
          const paginile = toatePaginile.filter(p => p.sectiune === sectiune)
          return (
            <div key={sectiune} className="card">
              <h3>{sectiune.charAt(0).toUpperCase() + sectiune.slice(1)}</h3>
              <p>{paginile.length} pagini disponibile</p>
              <ul>
                {paginile.map(p => (
                  <li key={p.id}>
                    <Link to={'/docs/' + sectiune + '/' + p.id}>{p.titlu}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
