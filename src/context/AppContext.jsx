import { createContext, useContext, useReducer, useState } from 'react'

const AppContext = createContext(null)

function istoricReducer(state, action) {
  if (action.type === 'ADAUGA') {
    const paginiNoi = [action.pagina, ...state.pagini.filter(p => p.url !== action.pagina.url)]
    return { pagini: paginiNoi.slice(0, 10) }
  }
  if (action.type === 'STERGE') {
    return { pagini: [] }
  }
  return state
}

export function AppProvider({ children }) {
  const [esteLogat, setEsteLogat] = useState(false)
  const [istoric, dispatch] = useReducer(istoricReducer, { pagini: [] })

  function adaugaLaIstoric(pagina) {
    dispatch({ type: 'ADAUGA', pagina })
  }

  function stergeIstoric() {
    dispatch({ type: 'STERGE' })
  }

  function seteazaLogat(val) {
    setEsteLogat(val)
  }

  return (
    <AppContext.Provider value={{ esteLogat, seteazaLogat, istoric, adaugaLaIstoric, stergeIstoric }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
