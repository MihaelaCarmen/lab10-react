import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useEffect, useMemo } from 'react'
import toatePaginile from '../data/pagini.json'

export default function DocsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef(null)

  const sectiuni = useMemo(() => {
    const lista = []
    for (let i = 0; i < toatePaginile.length; i++) {
      const p = toatePaginile[i]
      if (!lista.includes(p.sectiune)) {
        lista.push(p.sectiune)
      }
    }
    return lista
  }, [])

  useEffect(() => {
    function handleCtrlK(e) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        navigate('/cauta')
      }
    }
    window.addEventListener('keydown', handleCtrlK)
    return () => window.removeEventListener('keydown', handleCtrlK)
  }, [navigate])

  const segmente = location.pathname.split('/').filter(s => s !== '')

  return (
    <div className="docsContainer">
      <aside className="sidebar">
        <div className="sidebarSearch">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cauta rapid..."
            className="sidebarInput"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate('/cauta?q=' + e.target.value.trim())
              }
            }}
          />
        </div>

        <nav>
          {sectiuni.map(sectiune => {
            const paginileSectiunie = toatePaginile.filter(p => p.sectiune === sectiune)
            return (
              <div key={sectiune} className="sidebarSectiune">
                <NavLink
                  to={'/docs/' + sectiune}
                  end
                  className={({ isActive }) => isActive ? 'sidebarTitluSectiune activ' : 'sidebarTitluSectiune'}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span>✓ </span>}
                      {sectiune.charAt(0).toUpperCase() + sectiune.slice(1)}
                    </>
                  )}
                </NavLink>
                <ul className="sidebarLista">
                  {paginileSectiunie.map(pagina => (
                    <li key={pagina.id}>
                      <NavLink
                        to={'/docs/' + sectiune + '/' + pagina.id}
                        className={({ isActive }) => isActive ? 'sidebarLink activ' : 'sidebarLink'}
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && <span className="check">✓ </span>}
                            {pagina.titlu}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </nav>

        <div className="sidebarExtra">
          <Link to="/cauta" className="sidebarLink">🔍 Cautare globala</Link>
          <Link to="/istoric" className="sidebarLink">📜 Istoric</Link>
        </div>
      </aside>

      <div className="docsMain">
        <div className="breadcrumb">
          {segmente.map((seg, index) => {
            const url = '/' + segmente.slice(0, index + 1).join('/')
            const esteUltimul = index === segmente.length - 1
            if (esteUltimul) {
              return <span key={url} className="breadcrumbCurent">{seg}</span>
            }
            return (
              <span key={url}>
                <Link to={url} className="breadcrumbLink">{seg}</Link>
                <span className="breadcrumbSeparator"> / </span>
              </span>
            )
          })}
        </div>

        <Outlet />
      </div>
    </div>
  )
}
