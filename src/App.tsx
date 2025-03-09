// File: src/App.tsx
import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { simulatedRemoteConfig } from './remoteModules'

const appTitle = import.meta.env.VITE_VAR1

function App() {
  const [remoteRoutes, setRemoteRoutes] = useState([])

  useEffect(() => {
    const fetchConfig = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Filtra las rutas con status 1 y mapea las rutas y crea los componentes dinámicamente
      const filteredRoutes = simulatedRemoteConfig.filter(
        (routeConfig) => routeConfig.status === 1,
      )

      const routesWithComponents = filteredRoutes.map((routeConfig) => ({
        ...routeConfig,
        component: lazy(eval(routeConfig.module.importPath)),
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
