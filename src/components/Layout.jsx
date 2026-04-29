import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

export default function Layout() {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  function handleSearch(e) {
    e.preventDefault()
    const text = inputRef.current.value.trim()
    if (text) {
      navigate('/cauta?q=' + text)
      inputRef.current.value = ''
    }
  }

  return (
    <div className="appContainer">
      <header className="header">
        <div className="headerInner">
          <Link to="/" className="logo">NovaUI Docs</Link>
          <nav className="headerNav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'navLink activ' : 'navLink'}>Acasa</NavLink>
            <NavLink to="/docs" className={({ isActive }) => isActive ? 'navLink activ' : 'navLink'}>Docs</NavLink>
            <NavLink to="/despre" className={({ isActive }) => isActive ? 'navLink activ' : 'navLink'}>Despre</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'navLink activ' : 'navLink'}>Contact</NavLink>
          </nav>
          <form onSubmit={handleSearch} className="searchForm">
            <input ref={inputRef} type="text" placeholder="Cauta... (Ctrl+K)" className="searchInput" />
            <button type="submit" className="searchBtn">Cauta</button>
          </form>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>NovaUI Docs &copy; 2024 — facut cu React Router v7</p>
        <div>
          <Link to="/despre">Despre</Link>
          {' | '}
          <Link to="/contact">Contact</Link>
          {' | '}
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
