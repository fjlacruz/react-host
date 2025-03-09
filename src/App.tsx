import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { simulatedRemoteConfig } from './remoteModules'

const appTitle = import.meta.env.VITE_VAR1

console.log(simulatedRemoteConfig)

function App() {
  const [remoteRoutes, setRemoteRoutes] = useState([])

  useEffect(() => {
    const fetchConfig = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mapeamos las rutas y creamos los componentes dinámicamente
      const routesWithComponents = simulatedRemoteConfig.map((routeConfig) => ({
        ...routeConfig,
        component: lazy(eval(routeConfig.module.importPath)),
        //component: lazy(() => import('remoteApp/Button')),
      }))

      setRemoteRoutes(routesWithComponents)
    }

    fetchConfig()
  }, [])

  const generateRoutes = () => {
    return remoteRoutes.map((routeConfig) => {
      const RemoteComponent = routeConfig.component
      if (!RemoteComponent) {
        return null
      }
      return (
        <Route
          key={routeConfig.route}
          path={routeConfig.route}
          element={
            <Suspense fallback={<div>Cargando...</div>}>
              <RemoteComponent />
            </Suspense>
          }
        />
      )
    })
  }

  const generateLinks = () => {
    return remoteRoutes.map((routeConfig) => (
      <Link key={routeConfig.route} to={routeConfig.route}>
        {routeConfig.route}
      </Link>
    ))
  }

  return (
    <Router>
      <div>
        <h1>HOST</h1>
        <h1>{appTitle}</h1>
        <nav>{generateLinks()}</nav>
        <Routes>{generateRoutes()}</Routes>
      </div>
    </Router>
  )
}

export default App
