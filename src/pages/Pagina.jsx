import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext.jsx'
import toatePaginile from '../data/pagini.json'

function PaginaInexistenta() {
  const navigate = useNavigate()
  return (
    <div className="pagina">
      <h2>Pagina nu exista</h2>
      <p>Nu am gasit aceasta pagina in documentatie.</p>
      <button onClick={() => navigate(-1)} className="btn">Inapoi</button>
    </div>
  )
}

export default function Pagina() {
  const { sectiune, paginaId } = useParams()
  const { adaugaLaIstoric, esteLogat } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [pagina, setPagina] = useState(null)
  const titluRef = useRef(null)

  const paginileSectiunie = toatePaginile.filter(p => p.sectiune === sectiune)
  const indexCurent = paginileSectiunie.findIndex(p => p.id === paginaId)

  useEffect(() => {
    setLoading(true)
    const gasita = toatePaginile.find(p => p.id === paginaId && p.sectiune === sectiune)

    const timer = setTimeout(() => {
      setPagina(gasita || null)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [paginaId, sectiune])

  useEffect(() => {
    if (pagina) {
      adaugaLaIstoric({
        titlu: pagina.titlu,
        url: '/docs/' + sectiune + '/' + paginaId
      })
    }
  }, [pagina])

  useEffect(() => {
    if (titluRef.current) {
      titluRef.current.focus()
    }
  }, [pagina])

  if (sectiune === 'privat' && !esteLogat) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/docs/' + sectiune + '/' + paginaId } }} />
  }

  if (loading) {
    return <div className="pagina"><p>Se incarca...</p></div>
  }

  if (!pagina) {
    return <PaginaInexistenta />
  }

  const paginaAnter = indexCurent > 0 ? paginileSectiunie[indexCurent - 1] : null
  const paginaUrm = indexCurent < paginileSectiunie.length - 1 ? paginileSectiunie[indexCurent + 1] : null

  return (
    <div className="pagina">
      <h1 ref={titluRef} tabIndex={-1}>{pagina.titlu}</h1>

      <div className="taguri">
        {pagina.taguri.map(tag => (
          <Link key={tag} to={'/cauta?tag=' + tag} className="tag">{tag}</Link>
        ))}
      </div>

      <div className="continut">
        <p>{pagina.continut}</p>
      </div>

      <div className="actiuni">
        <button onClick={() => navigate('/docs/' + sectiune + '/' + paginaId + '/editare')} className="btn">
          Editeaza pagina
        </button>
      </div>

      <div className="navigarePagini">
        <div>
          {paginaAnter && (
            <Link to={'/docs/' + sectiune + '/' + paginaAnter.id} className="btnNav">
              ← {paginaAnter.titlu}
            </Link>
          )}
        </div>
        <div>
          {paginaUrm && (
            <Link to={'/docs/' + sectiune + '/' + paginaUrm.id} className="btnNav">
              {paginaUrm.titlu} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
