import { useState } from 'react'

export default function Contact() {
  const [trimis, setTrimis] = useState(false)
  const [mesaj, setMesaj] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (mesaj.trim()) {
      setTrimis(true)
    }
  }

  if (trimis) {
    return (
      <div className="pagina">
        <h1>Multumim!</h1>
        <p>Mesajul tau a fost trimis. Te vom contacta in curand.</p>
      </div>
    )
  }

  return (
    <div className="pagina">
      <h1>Contact</h1>
      <p>Ai o intrebare? Scrie-ne mai jos.</p>
      <form onSubmit={handleSubmit} className="contactForm">
        <input type="text" placeholder="Numele tau" className="formInput" />
        <input type="email" placeholder="Email" className="formInput" />
        <textarea
          placeholder="Mesajul tau..."
          className="formTextarea"
          value={mesaj}
          onChange={(e) => setMesaj(e.target.value)}
        />
        <button type="submit" className="btn">Trimite</button>
      </form>
    </div>
  )
}
