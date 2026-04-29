import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import toatePaginile from '../data/pagini.json'

export default function Editare() {
  const { sectiune, paginaId } = useParams()
  const navigate = useNavigate()

  const paginaOriginala = toatePaginile.find(p => p.id === paginaId && p.sectiune === sectiune)

  const [titlu, setTitlu] = useState('')
  const [continut, setContinut] = useState('')
  const [taguri, setTaguri] = useState('')
  const [salvat, setSalvat] = useState(false)

  useEffect(() => {
    if (paginaOriginala) {
      setTitlu(paginaOriginala.titlu)
      setContinut(paginaOriginala.continut)
      setTaguri(paginaOriginala.taguri.join(', '))
    }
  }, [paginaId])

  function handleSalvare(e) {
    e.preventDefault()
    setSalvat(true)
    setTimeout(() => {
      navigate('/docs/' + sectiune + '/' + paginaId, { replace: true })
    }, 800)
  }

  if (!paginaOriginala) {
    return (
      <div className="pagina">
        <h2>Pagina nu exista</h2>
        <button onClick={() => navigate(-1)} className="btn">Inapoi</button>
      </div>
    )
  }

  return (
    <div className="pagina">
      <h1>Editeaza: {paginaOriginala.titlu}</h1>
      {salvat && <div className="alertSucees">Salvat! Te redirectionam...</div>}

      <form onSubmit={handleSalvare} className="editForm">
        <div className="formGrup">
          <label>Titlu</label>
          <input
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            className="formInput"
          />
        </div>

        <div className="formGrup">
          <label>Continut</label>
          <textarea
            value={continut}
            onChange={(e) => setContinut(e.target.value)}
            className="formTextarea"
            rows={8}
          />
        </div>

        <div className="formGrup">
          <label>Taguri (separate prin virgula)</label>
          <input
            type="text"
            value={taguri}
            onChange={(e) => setTaguri(e.target.value)}
            className="formInput"
          />
        </div>

        <div className="formBtnGrup">
          <button type="submit" className="btn">Salveaza</button>
          <button type="button" onClick={() => navigate(-1)} className="btnSecundar">Anuleaza</button>
        </div>
      </form>
    </div>
  )
}
