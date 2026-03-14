import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../utils/Api"
import CajaDeArena from "./CajaDeArena"

function SessionPage() {
  const { token } = useParams()
  const [valid, setValid] = useState<boolean | null>(null)

  useEffect(() => {
    const validateToken = async () => {
      const response = await fetch(`${API_URL}/sessions/${token}`)
      const data = await response.json()
      setValid(data.success)
    }
    validateToken()
  }, [token])

  if (valid === null) return <p>Cargando...</p>
  if (!valid) return <p>Este enlace ha expirado o no es válido.</p>
  return <CajaDeArena />
}

export default SessionPage