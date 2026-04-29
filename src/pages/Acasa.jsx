import { Link } from 'react-router-dom'

export default function Acasa() {
  return (
    <div className="pagina">
      <h1>Bun venit la NovaUI Docs</h1>
      <p>NovaUI este o librarie de componente React simpla si usor de folosit. Gasesti here documentatia completa.</p>
      <div className="carduri">
        <div className="card">
          <h3>🚀 Inceput rapid</h3>
          <p>Instaleaza si configureaza NovaUI in cateva minute.</p>
          <Link to="/docs/inceput" className="btn">Incepe</Link>
        </div>
        <div className="card">
          <h3>🧩 Componente</h3>
          <p>Toate componentele disponibile cu exemple.</p>
          <Link to="/docs/componente" className="btn">Vezi</Link>
        </div>
        <div className="card">
          <h3>🪝 Hooks</h3>
          <p>Hookuri custom pentru logica repetitiva.</p>
          <Link to="/docs/hooks" className="btn">Exploreaza</Link>
        </div>
      </div>
    </div>
  )
}
