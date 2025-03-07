import { useState, useEffect, JSX } from 'react'
import './App.css'

function App() {
  const [remotes, setRemotes] = useState<JSX.Element[]>([])

  useEffect(() => {
    const loadRemoteComponents = async () => {
      try {
        // Cargar la configuración de los remotes
        const response = await fetch('/remotes.json')
        const { remotes: remoteConfigs } = await response.json()

        const remoteComponents = await Promise.all(
          remoteConfigs.map(async (remote: any) => {
            // Verificar si el contenedor del remote ya está cargado
            if (!window[remote.scope]) {
              // Si no está cargado, cargar el remote dinámicamente
              await loadRemoteEntry(remote.url)
            }

            // Acceder al contenedor del remote
            const container = window[remote.scope]

            // Obtener el módulo expuesto
            const Module = await container.get(remote.module)

            // Renderizar el componente
            const Component = Module().default
            return <Component key={remote.name} />
          }),
        )

        setRemotes(remoteComponents)
      } catch (error) {
        console.error('Error loading remote components:', error)
      }
    }

    loadRemoteComponents()
  }, [])

  return (
    <div>
      <div></div>
      <h1>Host</h1>
      <div className="card">{remotes}</div>
    </div>
  )
}

// Función para cargar dinámicamente un remote entry
const loadRemoteEntry = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default App
