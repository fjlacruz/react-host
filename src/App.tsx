import React, { useEffect, useState } from 'react'

const loadRemoteComponent = async (
  remoteUrl: string,
  scope: string,
  module: string,
) => {
  await __webpack_init_sharing__('default')
  const container = window[scope]
  await container.init(__webpack_share_scopes__.default)
  const factory = await container.get(module)
  return factory()
}

const App = () => {
  const [remoteComponents, setRemoteComponents] = useState<any[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}remotes.json`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log('Contenido de remotes.json:', data) // 🔹 Debug

        if (!data.remotes || !Array.isArray(data.remotes)) {
          console.error('⚠️ Formato incorrecto en remotes.json', data)
          return
        }

        const components = await Promise.all(
          data.remotes.map(async (remote) => {
            try {
              console.log(
                `🔹 Cargando módulo remoto: ${remote.module} desde ${remote.url}`,
              )
              const Component = await loadRemoteComponent(
                remote.url,
                remote.scope,
                remote.module,
              )
              return { key: remote.scope, Component: Component.default }
            } catch (error) {
              console.error(`❌ Error cargando ${remote.scope}:`, error)
              return null
            }
          }),
        )

        setRemoteComponents(components.filter(Boolean))
      })
      .catch((error) =>
        console.error('❌ Error al cargar remotes.json:', error),
      )
  }, [])

  return (
    <div>
      <h1>Host App</h1>
      {remoteComponents.length > 0 ? (
        remoteComponents.map(({ key, Component }) => (
          <div key={key}>
            <h2>Componente de {key}</h2>
            <Component />
          </div>
        ))
      ) : (
        <p>Cargando componentes remotos...</p>
      )}
    </div>
  )
}

export default App
