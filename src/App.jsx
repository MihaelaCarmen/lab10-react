import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import DocsLayout from './components/DocsLayout.jsx'
import Acasa from './pages/Acasa.jsx'
import Despre from './pages/Despre.jsx'
import Contact from './pages/Contact.jsx'
import DocsIndex from './pages/DocsIndex.jsx'
import Sectiune from './pages/Sectiune.jsx'
import Pagina from './pages/Pagina.jsx'
import Editare from './pages/Editare.jsx'
import Cauta from './pages/Cauta.jsx'
import Istoric from './pages/Istoric.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import DocsNotFound from './pages/DocsNotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Acasa />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/docs" element={<DocsLayout />}>
        <Route index element={<DocsIndex />} />
        <Route path=":sectiune" element={<Sectiune />} />
        <Route path=":sectiune/:paginaId" element={<Pagina />} />
        <Route path=":sectiune/:paginaId/editare" element={<Editare />} />
        <Route path="*" element={<DocsNotFound />} />
      </Route>

      <Route path="/cauta" element={<Cauta />} />
      <Route path="/istoric" element={<Istoric />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
