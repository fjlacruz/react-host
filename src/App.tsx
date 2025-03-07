import { useState, useEffect, lazy, Suspense } from 'react'
import { getRemoteComponents } from './services/remoteService'

const appTitle = import.meta.env.VITE_APP_TITLE

function App() {
  const [remoteComponents, setRemoteComponents] = useState<Record<
    string,
    any
  > | null>(null)
  const [loadedComponents, setLoadedComponents] = useState<Record<
    string,
    React.ComponentType<any>
  > | null>(null)

  useEffect(() => {
    getRemoteComponents().then((components) => {
      setRemoteComponents(components)
    })
  }, [])

  useEffect(() => {
    if (remoteComponents) {
      const loadComponents = async () => {
        const loaded: Record<string, React.ComponentType<any>> = {}
        for (const [name, remoteModule] of Object.entries(remoteComponents)) {
          const remoteComponent = lazy(() =>
            import(/* @vite-ignore */ remoteModule),
          )
          loaded[name] = remoteComponent
        }
        setLoadedComponents(loaded)
      }
      loadComponents()
    }
  }, [remoteComponents])

  return (
    <div>
      <div></div>
      <h1>HOST</h1>
      <h1>{appTitle}</h1>
      <div className="card">
        {loadedComponents &&
          Object.entries(loadedComponents).map(([name, Component]) => (
            <Suspense key={name} fallback={<div>Loading {name}...</div>}>
              <Component />
            </Suspense>
          ))}
      </div>
    </div>
  )
}

export default App
