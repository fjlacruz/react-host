import React, { useEffect, useState } from 'react'

const appTitle = import.meta.env.VITE_VAR1

console.info(appTitle)

const remotes = [
  {
    name: 'remote_app',
    url: 'http://localhost:5001/assets/remoteEntry.js',
    scope: 'remote_app',
    module: './Button',
  },
]

function App() {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType<
    any
  > | null>(null)

  useEffect(() => {
    const loadRemote = async () => {
      try {
        const remote = remotes[0]

        // Cargar el remoteEntry.js como un módulo
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = remote.url
          script.type = 'module'
          script.onload = () => {
            console.log(`Remote ${remote.name} loaded`)
            resolve()
          }
          script.onerror = () => {
            console.error(`Failed to load remote ${remote.name}`)
            reject()
          }
          document.head.appendChild(script)
        })

        // Verificar si el scope está definido
        if (!window[remote.scope]) {
          console.error(`Scope ${remote.scope} is not defined`)
          return
        }

        // Importar el componente dinámicamente
        const module = await window[remote.scope].get(remote.module)
        const factory = module()
        const Component = factory.default

        setRemoteComponent(() => Component)
      } catch (error) {
        console.error('Error loading remote component:', error)
      }
    }

    loadRemote()
  }, [])

  return (
    <div>
      <div></div>
      <h1>HOST</h1>
      <h1>{appTitle}</h1>
      <div className="card">{RemoteComponent && <RemoteComponent />}</div>
    </div>
  )
}

export default App
