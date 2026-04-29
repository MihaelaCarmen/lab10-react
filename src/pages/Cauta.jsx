import { useSearchParams, Link } from 'react-router-dom'
import { useMemo, useRef, useEffect } from 'react'
import toatePaginile from '../data/pagini.json'

const toateSectiunile = [...new Set(toatePaginile.map(p => p.sectiune))]
const toateTagurile = [...new Set(toatePaginile.flatMap(p => p.taguri))]

export default function Cauta() {
  const [searchParams, setSearchParams] = useSearchParams()
  const inputRef = useRef(null)

  const q = searchParams.get('q') || ''
  const sectiuneFiltru = searchParams.get('sectiune') || ''
  const taguriActive = searchParams.getAll('tag')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const rezultate = useMemo(() => {
    let lista = [...toatePaginile]

    if (q.trim()) {
      lista = lista.filter(p =>
        p.titlu.toLowerCase().includes(q.toLowerCase()) ||
        p.continut.toLowerCase().includes(q.toLowerCase())
      )
    }

    if (sectiuneFiltru) {
      lista = lista.filter(p => p.sectiune === sectiuneFiltru)
    }

    if (taguriActive.length > 0) {
      lista = lista.filter(p =>
        taguriActive.every(tag => p.taguri.includes(tag))
      )
    }

    return lista
  }, [q, sectiuneFiltru, taguriActive.join(',')])

  function handleTextInput(e) {
    const noii = new URLSearchParams(searchParams)
    if (e.target.value) {
      noii.set('q', e.target.value)
    } else {
      noii.delete('q')
    }
    setSearchParams(noii)
  }

  function handleSectiune(e) {
    const noii = new URLSearchParams(searchParams)
    if (e.target.value) {
      noii.set('sectiune', e.target.value)
    } else {
      noii.delete('sectiune')
    }
    setSearchParams(noii)
  }

  function adaugaTag(tag) {
    const noii = new URLSearchParams(searchParams)
    if (!taguriActive.includes(tag)) {
      noii.append('tag', tag)
    }
    setSearchParams(noii)
  }

  function stergeTag(tag) {
    const noii = new URLSearchParams(searchParams)
    const taguriFiltrate = taguriActive.filter(t => t !== tag)
    noii.delete('tag')
    for (let i = 0; i < taguriFiltrate.length; i++) {
      noii.append('tag', taguriFiltrate[i])
    }
    setSearchParams(noii)
  }

  function reseteazaFiltre() {
    setSearchParams({})
  }

  return (
    <div className="pagina cautarePagina">
      <h1>Cautare globala</h1>

      <div className="filtre">
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={handleTextInput}
          placeholder="Cauta in toata documentatia..."
          className="searchInputMare"
        />

        <select value={sectiuneFiltru} onChange={handleSectiune} className="selectFiltru">
          <option value="">Toate sectiunile</option>
          {toateSectiunile.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button onClick={reseteazaFiltre} className="btnSecundar">Reseteaza filtrele</button>
      </div>

      <div className="taguriFiltre">
        <span>Filtre tag:</span>
        {taguriActive.map(tag => (
          <span key={tag} className="tagActiv">
            {tag} <button onClick={() => stergeTag(tag)} className="xBtn">×</button>
          </span>
        ))}
      </div>

      <div className="taguriDisponibile">
        <span>Adauga tag:</span>
        {toateTagurile.filter(t => !taguriActive.includes(t)).map(tag => (
          <button key={tag} onClick={() => adaugaTag(tag)} className="tagBtn">{tag}</button>
        ))}
      </div>

      <div className="rezultateCauta">
        <p>{rezultate.length} rezultate gasite</p>
        {rezultate.map(p => (
          <div key={p.id} className="rezultatItem">
            <Link to={'/docs/' + p.sectiune + '/' + p.id}>
              <strong>{p.titlu}</strong>
            </Link>
            <span className="sectiuneBadge">{p.sectiune}</span>
            <p className="rezultatPreview">{p.continut.substring(0, 120)}...</p>
            <div className="taguri">
              {p.taguri.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
        {rezultate.length === 0 && (
          <p className="nuAuFostGasite">Nu am gasit nimic pentru cautarea ta.</p>
        )}
      </div>
    </div>
  )
}
